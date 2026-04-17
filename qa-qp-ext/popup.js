/* ═══════════════════════════════════════════════════════════════════
   Quality Portals — popup.js
   3-column single-screen: rail (categories) | templates | workspace
   All state persisted per-template so tab-switching is instant.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  const {
    DEFAULT_TEMPLATES,
    parseTemplateBlob,
    extractTokens,
    prettifyToken,
    generateOutput,
  } = window.QPLogic;

  // ─── Storage keys ──────────────────────────────────────────────────────────
  const KEY_TEMPLATES  = "qa-qp-templates-v1";
  const KEY_FORM_STATE = "qa-qp-form-state-v1";
  const KEY_SETTINGS   = "qa-qp-settings-v1";

  const DEFAULT_SETTINGS = {
    design: "clean",
    themeMode: "system",
  };

  const VALID_DESIGNS = ["clean", "midnight", "walmart"];

  // ─── Storage abstraction (chrome.storage.local → localStorage fallback) ───
  const store = (() => {
    if (window.chrome?.storage?.local) {
      const local = chrome.storage.local;
      const call = (method, arg) =>
        new Promise((resolve, reject) => {
          try {
            local[method](arg, (result) => {
              const err = chrome.runtime?.lastError;
              err ? reject(new Error(err.message || String(err))) : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });

      return {
        async get(key) { return (await call("get", key))?.[key]; },
        async set(key, value) { await call("set", { [key]: value }); },
        async remove(key) { await call("remove", key); },
      };
    }

    return {
      async get(key) {
        const raw = localStorage.getItem(key);
        if (!raw) return undefined;
        try { return JSON.parse(raw); } catch { return undefined; }
      },
      async set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
      async remove(key) { localStorage.removeItem(key); },
    };
  })();

  // ─── State ─────────────────────────────────────────────────────────────────
  let categories    = [];
  let activeCatIdx  = 0;
  let activeTplIdx  = -1;
  let resultText    = "";

  // Per-template field cache: "catIdx:tplIdx:fieldName" → value
  const fieldCache = {};

  // ─── DOM refs ──────────────────────────────────────────────────────────────
  const catListEl   = document.getElementById("cat-list");
  const tplHeading  = document.getElementById("tpl-heading");
  const tplListEl   = document.getElementById("tpl-list");
  const wsEmpty     = document.getElementById("ws-empty");
  const wsContent   = document.getElementById("ws-content");
  const crumbCatEl  = document.getElementById("crumb-cat");
  const crumbTplEl  = document.getElementById("crumb-tpl");
  const wsFieldsEl  = document.getElementById("ws-fields");
  const wsResultEl  = document.getElementById("ws-result");
  const wsResultTxt = document.getElementById("ws-result-text");
  const wsStatusEl  = document.getElementById("ws-status");
  const genBtn      = document.getElementById("gen-btn");
  const copyBtn     = document.getElementById("copy-btn");
  const clearBtn    = document.getElementById("clear-btn");
  const settingsBtn         = document.getElementById("settings-btn");
  const settingsPanel       = document.getElementById("settings-panel");
  const closeSettingsBtn    = document.getElementById("close-settings");
  const settingsSaveBtn     = document.getElementById("settings-save");
  const settingsDiscardBtn  = document.getElementById("settings-discard");
  const openEditorBtn       = document.getElementById("open-editor-btn");
  const themeModeSelect     = document.getElementById("theme-mode");
  const designCards         = Array.from(document.querySelectorAll(".design-card"));

  let settings        = { ...DEFAULT_SETTINGS };
  let pendingSettings = { ...DEFAULT_SETTINGS };
  let themeMediaQuery = null;

  // ─── Helpers ───────────────────────────────────────────────────────────────
  function ck(catIdx, tplIdx, field) {
    return `${catIdx}:${tplIdx}:${field}`;
  }

  function getActiveTpl() {
    return categories[activeCatIdx]?.templates[activeTplIdx] ?? null;
  }

  function saveFieldsToCache() {
    wsFieldsEl.querySelectorAll("input[name]").forEach((input) => {
      fieldCache[ck(activeCatIdx, activeTplIdx, input.name)] = input.value;
    });
  }

  // ─── Persistence ──────────────────────────────────────────────────────────
  function collectState() {
    const vals = {};
    wsFieldsEl.querySelectorAll("input[name]").forEach((i) => {
      vals[i.name] = i.value;
    });
    const tpl = getActiveTpl();
    return {
      categoryIdx: activeCatIdx,
      templateIdx: activeTplIdx,
      templateName: tpl?.name ?? null,
      fieldValues: vals,
      resultText,
    };
  }

  async function saveState() {
    await store.set(KEY_FORM_STATE, collectState());
  }

  async function clearState() {
    await store.remove(KEY_FORM_STATE);
  }

  function setStatus(msg, tone = "") {
    wsStatusEl.textContent = msg;
    wsStatusEl.className = "ws-status" + (tone ? ` ${tone}` : "");
  }

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
    else delete document.documentElement.dataset.theme;
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

  function syncSettingsUI() {
    themeModeSelect.value = pendingSettings.themeMode;
    designCards.forEach((card) => {
      card.setAttribute("aria-pressed", String(card.dataset.design === pendingSettings.design));
    });
  }

  function openSettings() {
    pendingSettings = { ...settings };
    syncSettingsUI();
    settingsPanel.classList.remove("hidden");
  }

  function closeSettings() {
    settingsPanel.classList.add("hidden");
  }

  function discardSettings() {
    pendingSettings = { ...settings };
    applyTheme(settings.themeMode);
    applyDesign(settings.design);
    syncSettingsUI();
    closeSettings();
  }

  async function saveSettings() {
    settings = sanitizeSettings(pendingSettings);
    await store.set(KEY_SETTINGS, settings);
    applyTheme(settings.themeMode);
    applyDesign(settings.design);
    closeSettings();
  }

  function openEditor() {
    const url = chrome.runtime?.getURL?.("editor.html") ?? "editor.html";
    window.open(url, "_blank");
  }

  // ─── Render: categories (left rail) ────────────────────────────────────────
  function renderCategories() {
    catListEl.replaceChildren();

    categories.forEach((cat, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rail-item" + (idx === activeCatIdx ? " active" : "");
      btn.textContent = cat.name;
      btn.title = cat.name;
      btn.addEventListener("click", () => {
        saveFieldsToCache();
        activeCatIdx = idx;
        activeTplIdx = -1;
        resultText = "";
        renderCategories();
        renderTemplates();
        renderWorkspace();
        saveState();
      });
      catListEl.appendChild(btn);
    });
  }

  // ─── Render: template list (middle panel) ──────────────────────────────────
  function renderTemplates() {
    const cat = categories[activeCatIdx];
    tplHeading.textContent = cat ? cat.name : "Templates";
    tplListEl.replaceChildren();
    if (!cat) return;

    cat.templates.forEach((tpl, idx) => {
      const li = document.createElement("li");
      li.className = "tpl-item" + (idx === activeTplIdx ? " active" : "");
      li.textContent = tpl.name;
      li.addEventListener("click", () => {
        if (idx === activeTplIdx) return;
        saveFieldsToCache();
        activeTplIdx = idx;
        resultText = "";
        renderTemplates();
        renderWorkspace();
        saveState();
      });
      tplListEl.appendChild(li);
    });
  }

  // ─── Render: workspace (right panel) ───────────────────────────────────────
  function renderWorkspace(restoredValues = null) {
    const tpl = getActiveTpl();

    if (!tpl) {
      wsEmpty.classList.remove("hidden");
      wsContent.classList.add("hidden");
      return;
    }

    wsEmpty.classList.add("hidden");
    wsContent.classList.remove("hidden");

    // Breadcrumb
    crumbCatEl.textContent = categories[activeCatIdx].name;
    crumbTplEl.textContent = tpl.name;

    // Fields
    wsFieldsEl.replaceChildren();
    const tokens = extractTokens(tpl.body);

    tokens.forEach((token) => {
      const group = document.createElement("div");
      group.className = "field-group";

      const label = document.createElement("label");
      label.textContent = prettifyToken(token);
      label.setAttribute("for", `f-${token}`);

      const input = document.createElement("input");
      input.type = "text";
      input.id = `f-${token}`;
      input.name = token;
      input.placeholder = prettifyToken(token);
      input.autocomplete = "off";

      // Restore: explicit values first, then cache
      if (restoredValues && token in restoredValues) {
        input.value = restoredValues[token];
      } else {
        const cached = fieldCache[ck(activeCatIdx, activeTplIdx, token)];
        if (cached !== undefined) input.value = cached;
      }

      input.addEventListener("input", () => {
        fieldCache[ck(activeCatIdx, activeTplIdx, token)] = input.value;
        saveState();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") doGenerate();
      });

      group.append(label, input);
      wsFieldsEl.appendChild(group);
    });

    // Result
    if (resultText) {
      wsResultEl.classList.remove("hidden");
      wsResultTxt.textContent = resultText;
      copyBtn.disabled = false;
    } else {
      wsResultEl.classList.add("hidden");
      wsResultTxt.textContent = "";
      copyBtn.disabled = true;
    }

    setStatus("");
  }

  // ─── Actions ───────────────────────────────────────────────────────────────
  function doGenerate() {
    const tpl = getActiveTpl();
    if (!tpl) return;

    const vals = {};
    wsFieldsEl.querySelectorAll("input[name]").forEach((i) => {
      vals[i.name] = i.value.trim();
    });

    resultText = generateOutput(tpl.body, vals);
    wsResultEl.classList.remove("hidden");
    wsResultTxt.textContent = resultText;
    copyBtn.disabled = false;
    setStatus("Generated!", "success");
    saveState();
  }

  async function doCopy() {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
      setStatus("Copied to clipboard!", "success");
    } catch {
      setStatus("Couldn't auto-copy — select text and Ctrl+C.", "error");
    }
  }

  function doClear() {
    Object.keys(fieldCache).forEach((k) => delete fieldCache[k]);
    resultText = "";
    activeTplIdx = -1;
    renderTemplates();
    renderWorkspace();
    clearState();
    setStatus("");
  }

  // ─── Event listeners ──────────────────────────────────────────────────────
  genBtn.addEventListener("click", doGenerate);
  copyBtn.addEventListener("click", doCopy);
  clearBtn.addEventListener("click", doClear);

  settingsBtn?.addEventListener("click", openSettings);
  closeSettingsBtn?.addEventListener("click", discardSettings);
  settingsDiscardBtn?.addEventListener("click", discardSettings);
  settingsSaveBtn?.addEventListener("click", saveSettings);
  openEditorBtn?.addEventListener("click", openEditor);

  themeModeSelect?.addEventListener("change", () => {
    pendingSettings.themeMode = themeModeSelect.value;
    applyTheme(pendingSettings.themeMode);
  });

  designCards.forEach((card) => {
    card.addEventListener("click", () => {
      pendingSettings.design = card.dataset.design;
      syncSettingsUI();
      applyDesign(pendingSettings.design);
    });
  });

  // ─── Init ──────────────────────────────────────────────────────────────────
  async function init() {
    const [savedTemplates, savedState, savedSettings] = await Promise.all([
      store.get(KEY_TEMPLATES),
      store.get(KEY_FORM_STATE),
      store.get(KEY_SETTINGS),
    ]);

    const blob =
      typeof savedTemplates === "string" && savedTemplates.trim() ? savedTemplates : DEFAULT_TEMPLATES;
    categories = parseTemplateBlob(blob);

    settings = sanitizeSettings(savedSettings);
    pendingSettings = { ...settings };
    applyTheme(settings.themeMode);
    applyDesign(settings.design);
    syncSettingsUI();

    // Restore persisted state
    const state = savedState;
    if (state && typeof state === "object") {
      if (
        typeof state.categoryIdx === "number" &&
        state.categoryIdx < categories.length
      ) {
        activeCatIdx = state.categoryIdx;
      }

      if (typeof state.templateIdx === "number" && activeCatIdx >= 0) {
        const cat = categories[activeCatIdx];
        if (cat && state.templateIdx < cat.templates.length) {
          activeTplIdx = state.templateIdx;
        }
      }

      resultText = state.resultText || "";

      renderCategories();
      renderTemplates();
      renderWorkspace(state.fieldValues || null);

      // Seed field cache from restored values
      if (state.fieldValues) {
        Object.entries(state.fieldValues).forEach(([k, v]) => {
          fieldCache[ck(activeCatIdx, activeTplIdx, k)] = v;
        });
      }
    } else {
      renderCategories();
      renderTemplates();
      renderWorkspace();
    }
  }

  init().catch((err) => {
    console.error("Failed to initialize popup:", err);
    wsEmpty.classList.remove("hidden");
    wsContent.classList.add("hidden");
  });
})();
