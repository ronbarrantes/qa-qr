# ICQA Quality Portals

A Chrome extension for ICQA associates at Walmart fulfillment centers to quickly
generate accountability statements for floor associate errors.

---

## The problem it solves

When an ICQA associate catches an error on the floor, they need to document it in
a standardized written statement — a **Quality Portal (QP)**. The existing template
was hard to read, hard to update, and not portable across machines.

This extension replaces it with a fast, form-driven tool that generates the
correct statement text from a configurable markdown template file. Fill in the
fields, hit Generate, copy the text, done.

---

## How to install

This is an unpacked Chrome extension — it is not published to the Chrome Web Store.

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select this folder
5. The **QP** icon will appear in your toolbar

To update after pulling new changes, go back to `chrome://extensions` and hit the
reload button on the extension card.

---

## How to use it

1. Click the **QP** icon in the Chrome toolbar
2. Select a **category tab** (e.g. Picking, Packing)
3. Select a **Quality Portal** from the list
4. Fill in the auto-generated form fields
5. Hit **Generate**
6. Hit **Copy** and paste the text wherever it needs to go

---

## How to edit templates

Templates are written in a simple markdown format. There are two ways to edit them:

### In the extension
Open the extension → Settings (⚙️) → **Edit Templates**

The editor shows your full template file with a live preview of the parsed
structure on the right. Hit **Save** when done.

### Outside the extension
1. In the editor, hit **Download .md** to get your current templates as a file
2. Edit the file in any text editor (Notepad, VS Code, whatever)
3. Back in the editor, hit **Upload .md** to load your changes
4. Hit **Save**

### Sharing templates with teammates
The markdown file is plain text — paste it directly into a Teams message or
attach it as a file. Teammates can upload it in their own editor. If a template
becomes standard it can be added to the codebase so everyone gets it by default.

For the full template format spec and instructions on adding new templates,
see [`ADDING_TEMPLATES.md`](./ADDING_TEMPLATES.md).

---

## Tech stack

| Thing | What |
|---|---|
| Platform | Chrome Extension (Manifest V3) |
| Logic | Vanilla JS — no framework, no bundler |
| Storage | `chrome.storage.local` with `localStorage` fallback |
| Styling | CSS custom properties, 4 built-in themes |
| Templates | Markdown parsed at runtime — no build step needed |
| Dependencies | None |

---

## Project structure

```
qa-qp/
├── manifest.json        Chrome extension config
├── popup.html           Main extension UI
├── popup.js             UI logic
├── logic.js             Pure template parsing functions + default templates
├── editor.html          Template editor page
├── editor.js            Editor logic
├── styles.css           Base styles + component classes
├── designs.css          Theme overrides (default, walmart, glass, neon)
├── icons/
│   ├── generate.html    Open in Chrome to regenerate icon PNGs — no tools needed
│   ├── icon.svg         Source icon
│   └── icon*.png        Generated icons at 16/32/48/128px
├── ADDING_TEMPLATES.md  Agent/contributor reference for adding templates
└── README.md            This file
```

---

## Credits

Built by Ron Barrantes. Template content contributed by ICQA associates at the
Phoenix Walmart fulfillment center.
