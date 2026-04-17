const logic = window.QPLogic;
if (!logic) throw new Error("QPLogic not loaded");

const { DEFAULT_TEMPLATES, parseTemplateBlob, extractTokens, prettifyToken } = logic;

// ─── Storage keys ─────────────────────────────────────────────────────────────
const KEY_TEMPLATES = "qa-qp-templates-v1";
const KEY_SETTINGS  = "qa-qp-settings-v1";

const DEFAULT_SETTINGS = {
  design: "clean",
  themeMode: "system",
};

const VALID_DESIGNS = ["clean", "midnight", "walmart"];
let themeMediaQuery     = null;
let savedTemplatesState = null; // snapshot of the last-saved blob

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const templateBlobEl  = document.getElementById("template-blob");
const editorStatusEl  = document.getElementById("editor-status");
const previewEl       = document.getElementById("preview-content");
const saveBtn         = document.getElementById("save-btn");
const resetBtn        = document.getElementById("reset-btn");
const downloadBtn     = document.getElementById("download-btn");
const uploadBtn       = document.getElementById("upload-btn");
const uploadFileEl    = document.getElementById("upload-file");
const closeEditorBtn  = document.getElementById("close-editor-btn");

// ─── Storage abstraction (same pattern across the whole project) ──────────────
function getStorage() {
  if (window.chrome?.storage?.local) {
    const local = window.chrome.storage.local;
    const callLocal = (method, arg) =>
      new Promise((resolve, reject) => {
        try {
          local[method](arg, (result) => {
            const err = window.chrome?.runtime?.lastError;
            if (err) {
              reject(new Error(err.message || String(err)));
              return;
            }
            resolve(result);
          });
        } catch (err) {
          reject(err);
        }
      });

    return {
      async get(key) {
        const result = await callLocal("get", key);
        return result?.[key];
      },
      async set(key, value) {
        await callLocal("set", { [key]: value });
      },
      async remove(key) {
        await callLocal("remove", key);
      },
    };
  }
  return {
    async get(key) {
      const raw = window.localStorage.getItem(key);
      if (!raw) return undefined;
      try { return JSON.parse(raw); } catch { return undefined; }
    },
    async set(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    async remove(key) {
      window.localStorage.removeItem(key);
    },
  };
}

const storage = getStorage();

// ─── Status helper ───────────────────────────────────────────────────────────
function setStatus(message, tone = "") {
  editorStatusEl.textContent = message;
  editorStatusEl.className   = "field-status" + (tone ? ` ${tone}` : "");
}

// ─── Live preview ─────────────────────────────────────────────────────────────
function renderPreview(blob) {
  const categories = parseTemplateBlob(blob);
  previewEl.replaceChildren();

  if (categories.length === 0) {
    const p = document.createElement("p");
    p.className   = "helper";
    p.textContent = "No valid templates found yet. Add a # Category and ## Template Name.";
    previewEl.appendChild(p);
    return;
  }

  categories.forEach((cat) => {
    const catEl = document.createElement("div");
    catEl.className = "preview-category";

    const catTitle = document.createElement("p");
    catTitle.className   = "preview-cat-name";
    catTitle.textContent = `📁 ${cat.name}`;
    catEl.appendChild(catTitle);

    cat.templates.forEach((tpl) => {
      const tplEl = document.createElement("div");
      tplEl.className = "preview-template";

      const tplName = document.createElement("p");
      tplName.className   = "preview-tpl-name";
      tplName.textContent = `  • ${tpl.name}`;
      tplEl.appendChild(tplName);

      const tokens = extractTokens(tpl.body);
      if (tokens.length > 0) {
        const tokenList = document.createElement("p");
        tokenList.className   = "preview-tokens";
        tokenList.textContent = `    Fields: ${tokens.map(prettifyToken).join(", ")}`;
        tplEl.appendChild(tokenList);
      }

      catEl.appendChild(tplEl);
    });

    previewEl.appendChild(catEl);
  });
}

// ─── Save ─────────────────────────────────────────────────────────────────────
async function saveTemplates() {
  const blob = templateBlobEl.value;

  const categories = parseTemplateBlob(blob);
  if (categories.length === 0) {
    setStatus("Nothing to save — add at least one # Category and ## Template.", "error");
    return;
  }

  await storage.set(KEY_TEMPLATES, blob);
  savedTemplatesState = blob;
  setStatus(
    `Saved! ${categories.length} ${categories.length === 1 ? "category" : "categories"}, ` +
    `${categories.reduce((n, c) => n + c.templates.length, 0)} templates.`,
    "success"
  );
}

// ─── Download ─────────────────────────────────────────────────────────────────
function downloadTemplates() {
  const blob = new Blob([templateBlobEl.value], { type: "text/markdown;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = "qp-templates.md";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Downloaded qp-templates.md.", "success");
}

// ─── Upload ───────────────────────────────────────────────────────────────────
function openUploadPicker() {
  try {
    uploadFileEl.showPicker?.();
  } catch {
    uploadFileEl.click();
  }
}

async function handleUpload(file) {
  if (!file) return;
  setStatus(`Reading ${file.name}...`);
  try {
    const text       = await file.text();
    const categories = parseTemplateBlob(text);
    if (categories.length === 0) {
      setStatus("No valid templates found in that file. Check the # / ## heading structure.", "error");
      return;
    }
    templateBlobEl.value = text;
    renderPreview(text);
    setStatus(
      `Loaded ${file.name} — ${categories.length} ${categories.length === 1 ? "category" : "categories"} found. Hit Save to apply.`,
      "success"
    );
  } catch (err) {
    setStatus(`Failed to read file: ${err?.message ?? "unknown error"}`, "error");
  }
}

// ─── Reset to last save ───────────────────────────────────────────────────────
function resetToLastSave() {
  const confirmed = window.confirm(
    "Discard unsaved changes and revert to your last save?"
  );
  if (!confirmed) return;
  const blob = savedTemplatesState ?? DEFAULT_TEMPLATES;
  templateBlobEl.value = blob;
  renderPreview(blob);
  setStatus("Reverted to last save.", "success");
}

// ─── Shared UI settings (inherit from popup settings) ────────────────────────
function sanitizeSettings(raw) {
  const normalized = { ...DEFAULT_SETTINGS, ...(raw && typeof raw === "object" ? raw : {}) };
  if (!VALID_DESIGNS.includes(normalized.design)) normalized.design = DEFAULT_SETTINGS.design;
  if (!["system", "dark", "light"].includes(normalized.themeMode)) {
    normalized.themeMode = DEFAULT_SETTINGS.themeMode;
  }
  return normalized;
}

function setThemeAttr(val) {
  if (val) document.documentElement.dataset.theme = val;
  else document.documentElement.removeAttribute("data-theme");
}

function onSystemThemeChange(event) {
  setThemeAttr(event.matches ? "light" : null);
}

function applyTheme(mode) {
  themeMediaQuery?.removeEventListener("change", onSystemThemeChange);
  themeMediaQuery = null;

  if (mode === "system") {
    themeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    themeMediaQuery.addEventListener("change", onSystemThemeChange);
    setThemeAttr(themeMediaQuery.matches ? "light" : null);
    return;
  }

  setThemeAttr(mode === "light" ? "light" : null);
}

function applyDesign(design) {
  document.documentElement.dataset.design = VALID_DESIGNS.includes(design)
    ? design
    : DEFAULT_SETTINGS.design;
}

async function applySavedUiSettings() {
  const savedSettings = await storage.get(KEY_SETTINGS);
  const settings = sanitizeSettings(savedSettings);
  applyTheme(settings.themeMode);
  applyDesign(settings.design);
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function makeIcon(pathD) {
  const ns  = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.style.display = "block";
  const path = document.createElementNS(ns, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", pathD);
  svg.appendChild(path);
  return svg;
}

function applyStaticIcons() {
  closeEditorBtn?.replaceChildren(makeIcon("M18 6L6 18M6 6l12 12"));
}

// ─── Event listeners ──────────────────────────────────────────────────────────
saveBtn?.addEventListener("click", saveTemplates);
resetBtn?.addEventListener("click", resetToLastSave);
downloadBtn?.addEventListener("click", downloadTemplates);
uploadBtn?.addEventListener("click", openUploadPicker);
closeEditorBtn?.addEventListener("click", () => window.close());

uploadFileEl?.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  await handleUpload(file);
  e.target.value = ""; // reset so same file can be re-uploaded
});

// Live preview on every keystroke
templateBlobEl?.addEventListener("input", () => {
  renderPreview(templateBlobEl.value);
  setStatus(""); // clear old status when editing
});

// Ctrl+S / Cmd+S to save
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    saveTemplates();
  }
});

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  await applySavedUiSettings();
  applyStaticIcons();

  const saved        = await storage.get(KEY_TEMPLATES);
  const blob          = typeof saved === "string" && saved.trim() ? saved : DEFAULT_TEMPLATES;
  savedTemplatesState = blob;
  templateBlobEl.value = blob;
  renderPreview(blob);
}

init();
