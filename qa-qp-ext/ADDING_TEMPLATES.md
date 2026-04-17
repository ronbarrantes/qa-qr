# Adding QP Templates — Agent Reference

This doc tells you everything you need to add new Quality Portal (QP) templates
to this Chrome extension. Read this instead of digging through the code.

---

## What this project is

An internal Chrome extension for ICQA associates at a Walmart fulfillment center.
It lets them fill out a form and generate a pre-written accountability statement
(called a "Quality Portal" or "QP") to document errors made by floor associates.

The user picks a category tab → picks a QP → fills in auto-generated form fields →
hits Generate → copies the resulting text.

---

## Where templates live

**File:** `logic.js`
**Constant:** `DEFAULT_TEMPLATES` — a single template literal string at the top of the factory function.

That string is the only thing you need to edit to add or change templates.
Do not touch any other part of `logic.js` unless asked.

---

## The format

```
# Category Name

## QP Template Name
Body text with {{tokenName}} placeholders wherever a field should appear.
More body text on the next line if needed.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Another QP Template Name
Body text with {{anotherToken}} here.
Qty in Error: {{qtyInError}} - {{associateId}}

---

# Another Category

## Template In New Category
Body text.
Qty in Error: {{qtyInError}} - {{associateId}}
```

### Rules

| Element | What it does |
|---|---|
| `# Heading` | Creates a new category (renders as a tab in the UI) |
| `## Heading` | Creates a new QP template inside the current category |
| `{{tokenName}}` | Becomes a form field. The token name becomes the field label |
| `---` | Optional visual separator between templates. Ignored by the parser |
| Everything else | Plain body text, rendered as-is in the output |

- `#` and `##` headings MUST be at the start of a line
- Do NOT use `#` or `##` inside a template body — it will break the parser
- Do NOT use `{` or `}` for anything other than tokens

---

## Token naming

Token names can be camelCase, snake_case, or even `{{plain words with spaces}}`.
The app normalizes spaces to underscores automatically, so all three of these
produce the same form field labeled "Associate Id":

```
{{associateId}}
{{associate_id}}
{{associate id}}
```

Use whatever reads naturally in context. There is no global token registry —
each template is self-contained. The same token name in two different templates
has no relationship between them.

### Common tokens already in use (for reference, not required)

| Token | Typical label | Used for |
|---|---|---|
| `{{location}}` | Location | Picking errors |
| `{{itemNumber}}` | Item Number | Most templates |
| `{{description}}` | Description | Most templates |
| `{{qtyInError}}` | Qty In Error | Most templates |
| `{{associateId}}` | Associate Id | Most templates |
| `{{pickTicket}}` | Pick Ticket | Packing errors |
| `{{cartNumber}}` | Cart Number | Packing errors |
| `{{caseQty}}` | Case Qty | Decanting errors |
| `{{instructedQty}}` | Instructed Qty | Over/under pick |
| `{{overPickQty}}` | Over Pick Qty | Over pick errors |
| `{{overShipQty}}` | Over Ship Qty | Over ship errors |
| `{{shippedUpc}}` | Shipped Upc | Wrong item shipped |
| `{{directedUpc}}` | Directed Upc | Wrong item shipped |
| `{{lpn}}` | Lpn | Pallet receiving errors |
| `{{receiverId}}` | Receiver Id | Pallet receiving errors |
| `{{innerPackQty}}` | Inner Pack Qty | Under received decanting |
| `{{enteredExpDate}}` | Entered Exp Date | Wrong expiration date |
| `{{actualExpDate}}` | Actual Exp Date | Wrong expiration date |
| `{{expirationDate}}` | Expiration Date | Expiring soon |
| `{{item1Qty}}` | Item1 Qty | Mixed received pallet |
| `{{item1Number}}` | Item1 Number | Mixed received pallet |
| `{{item1Description}}` | Item1 Description | Mixed received pallet |
| `{{item2Qty}}` | Item2 Qty | Mixed received pallet |
| `{{item2Number}}` | Item2 Number | Mixed received pallet |
| `{{item2Description}}` | Item2 Description | Mixed received pallet |
| `{{driverId}}` | Driver Id | Pallet put away errors |
| `{{systematicLocation}}` | Systematic Location | Wrong location mismatch |
| `{{physicalLocation}}` | Physical Location | Wrong location mismatch |
| `{{pairedLpn}}` | Paired Lpn | Only 1 LPN put away |
| `{{originalLocation}}` | Original Location | Only 1 LPN put away, allocation error |
| `{{destinationLocation}}` | Destination Location | Only 1 LPN put away, allocation error |
| `{{foundLocation}}` | Found Location | Invalid/non-existent location |
| `{{tote}}` | Tote | Tote receiving errors |
| `{{size1Qty}}` | Size1 Qty | Mixed items – clothing |
| `{{size1}}` | Size1 | Mixed items – clothing |
| `{{size2Qty}}` | Size2 Qty | Mixed items – clothing |
| `{{size2}}` | Size2 | Mixed items – clothing |
| `{{receivedAsSize}}` | Received As Size | Mixed items – clothing |
| `{{item3Number}}` | Item3 Number | Over 5 SKUs in tote |
| `{{item3Description}}` | Item3 Description | Over 5 SKUs in tote |
| `{{item4Number}}` | Item4 Number | Over 5 SKUs in tote |
| `{{item4Description}}` | Item4 Description | Over 5 SKUs in tote |
| `{{item5Number}}` | Item5 Number | Over 5 SKUs in tote |
| `{{item5Description}}` | Item5 Description | Over 5 SKUs in tote |
| `{{stockerId}}` | Stocker Id | Tote put away errors |
| `{{verifiedAsSize}}` | Verified As Size | Mixed items – clothing (put away) |

You can introduce new tokens freely. Just use them in the body and the form
field will appear automatically.

---

## Existing categories

| Category | # of templates |
|---|---|
| `# Picking` | 14 |
| `# Packing` | 5 |
| `# Pallet Receiving` | 12 |
| `# Pallet Put Away` | 14 |
| `# Tote Receiving` | 19 |
| `# Tote Put Away` | 16 |

More categories will be added over time (QA Holds, Inbound/Outbound, etc.).

---

## How to add a new template to an existing category

Find the right `# Category` section in `DEFAULT_TEMPLATES` inside `logic.js`.
Append a new block after the last template in that section, before the next `#`:

```
---

## Your New Template Name
{{location}} | Item No. {{itemNumber}} ({{description}})
Your accountability statement text here with {{anyToken}} inline.
Qty in Error: {{qtyInError}} - {{associateId}}
```

---

## How to add a new category

Append after the last existing category block, before the closing backtick of
`DEFAULT_TEMPLATES`:

```
---

# New Category Name

## First Template In Category
Body text with {{tokens}}.
Qty in Error: {{qtyInError}} - {{associateId}}
```

---

## Body text style guide

Templates follow the style of the existing ones. When in doubt:

- First line: location/ticket header (varies by category — match the pattern already used)
- Middle lines: one or two sentences describing exactly what the associate did wrong
- Last line: `Qty in Error: {{qtyInError}} - {{associateId}}`
  - Picking templates use a hyphen `-`
  - Packing templates use an en dash `–`  ← keep this distinction
- Language is neutral, factual, and professional — no editorializing
- Do not add `NOTE:` lines unless the original source material includes one

---

## What NOT to do

- Do not rename or remove existing templates without being explicitly asked
- Do not change the structure of `logic.js` beyond `DEFAULT_TEMPLATES`
- Do not add markdown formatting (bold, italic, lists) inside template bodies —
  output is plain text only
- Do not invent new categories unless asked — append to existing ones
- Do not reformat or reorder existing templates unless asked
