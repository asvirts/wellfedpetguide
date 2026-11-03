import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const out = join(process.cwd(), "public/images");
mkdirSync(out, { recursive: true });

const pages = [
  {
    slug: "home",
    bg: "#163729",
    panel: "#f6f2e8",
    ink: "#f6f2e8",
    darkInk: "#1c1915",
    accent: "#d8b268",
    secondary: "#87a896",
    clay: "#9e4a36",
    title: "Dog food and litter box guides",
    kicker: "WellFed Pet Guide · Research Monograph",
    plate: "PLATE I — CANINE NUTRITION & FELINE HABITAT",
  },
  {
    slug: "dog-food-for-diarrhea",
    bg: "#e6efe9",
    panel: "#fbf8f2",
    ink: "#1c1915",
    darkInk: "#1c1915",
    accent: "#1b4332",
    secondary: "#c87d4b",
    clay: "#7a3e2e",
    title: "What to feed when the stool is loose",
    kicker: "Canine Digestion · Problem Guide",
    plate: "FIG. 1.1 — ENTERIC REST, HYDRATION & BLAND RATION",
  },
  {
    slug: "dog-food-brands-to-avoid",
    bg: "#f2ece0",
    panel: "#fbf8f2",
    ink: "#1c1915",
    darkInk: "#1c1915",
    accent: "#1e2d3d",
    secondary: "#8c3b2b",
    clay: "#7a3e2e",
    title: "Read the label before the slogan",
    kicker: "Canine Nutrition · Label Audit",
    plate: "FIG. 2.1 — AAFCO ADEQUACY & BAG SPECIMEN AUDIT",
  },
  {
    slug: "dog-not-eating",
    bg: "#f6ede2",
    panel: "#fbf8f2",
    ink: "#1c1915",
    darkInk: "#1c1915",
    accent: "#7a3e2e",
    secondary: "#1b4332",
    clay: "#7a3e2e",
    title: "A skipped meal needs a reason",
    kicker: "Canine Appetite · Problem Guide",
    plate: "FIG. 3.1 — APPETITE TIMELINE & PALATABILITY TRIAGE",
  },
  {
    slug: "dog-food-for-picky-eaters",
    bg: "#e4efe8",
    panel: "#fbf8f2",
    ink: "#1c1915",
    darkInk: "#1c1915",
    accent: "#1b4332",
    secondary: "#9a6232",
    clay: "#9a6232",
    title: "One complete food, then stop",
    kicker: "Canine Appetite · Format Guide",
    plate: "FIG. 6.1 — COMPLETE DIET, ONE CHANGE, 10% EXTRAS",
  },
  {
    slug: "cat-pooping-outside-litter-box",
    bg: "#eee7da",
    panel: "#fbf8f2",
    ink: "#1c1915",
    darkInk: "#1c1915",
    accent: "#2f4032",
    secondary: "#7a3e2e",
    clay: "#7a3e2e",
    title: "The box is a housing problem",
    kicker: "Feline Habitat · Problem Guide",
    plate: "FIG. 4.1 — N+1 FLOORPLAN & LOW-ENTRY BASIN SPEC",
  },
  {
    slug: "cat-peeing-outside-litter-box",
    bg: "#e6eef2",
    panel: "#fbf8f2",
    ink: "#1c1915",
    darkInk: "#1c1915",
    accent: "#193648",
    secondary: "#9e3a2b",
    clay: "#9e3a2b",
    title: "Urine outside the box is medical first",
    kicker: "Feline Urinary · Urgent Triage",
    plate: "FIG. 5.1 — OBSTRUCTION TRIAGE & SUBSTRATE RESET",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function heroArtwork(page) {
  switch (page.slug) {
    case "home":
      return `
        <!-- Left Specimen Card: Open Field Monograph -->
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="470" height="450" rx="6" fill="#f6f2e8" stroke="#d8b268" stroke-width="2"/>
          <rect x="14" y="14" width="442" height="422" fill="none" stroke="#d9d0c0" stroke-width="1"/>
          <line x1="235" y1="14" x2="235" y2="436" stroke="#d9d0c0" stroke-width="1.5" stroke-dasharray="4 4"/>
          <!-- Left page of open book -->
          <text x="36" y="52" font-family="Georgia, serif" font-size="13" letter-spacing="2" fill="#7a3e2e">SEC. I — CANINE DIET</text>
          <line x1="36" y1="66" x2="208" y2="66" stroke="#163729" stroke-width="2"/>
          <!-- Botanical grain & pumpkin motif -->
          <circle cx="122" cy="155" r="54" fill="#e6efe9" stroke="#163729" stroke-width="2"/>
          <path d="M92 162 C92 135, 152 135, 152 162 C152 180, 92 180, 92 162 Z" fill="#d8b268" stroke="#163729" stroke-width="2"/>
          <path d="M122 126 C110 138, 110 172, 122 182 C134 172, 134 138, 122 126 Z" fill="#c87d4b" opacity="0.85"/>
          <path d="M122 115 L122 127" stroke="#163729" stroke-width="2.5"/>
          <!-- Ruled notes -->
          <rect x="36" y="236" width="140" height="8" fill="#163729"/>
          <rect x="36" y="256" width="168" height="5" fill="#87a896"/>
          <rect x="36" y="270" width="152" height="5" fill="#87a896"/>
          <rect x="36" y="284" width="160" height="5" fill="#87a896"/>
          <rect x="36" y="316" width="82" height="24" rx="3" fill="#163729"/>
          <text x="77" y="332" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#f6f2e8">AAFCO</text>
          <rect x="126" y="316" width="82" height="24" rx="3" fill="#e6efe9" stroke="#163729" stroke-width="1.5"/>
          <text x="167" y="332" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#163729">WSAVA</text>
          <text x="36" y="380" font-family="Georgia, serif" font-size="13" fill="#3d3832">Verified clinical citations</text>
          <text x="36" y="400" font-family="Georgia, serif" font-size="13" fill="#7a3e2e">No synthetic star scores</text>

          <!-- Right page of open book -->
          <text x="262" y="52" font-family="Georgia, serif" font-size="13" letter-spacing="2" fill="#163729">SEC. II — FELINE BOX</text>
          <line x1="262" y1="66" x2="434" y2="66" stroke="#7a3e2e" stroke-width="2"/>
          <!-- Architectural N+1 diagram -->
          <rect x="268" y="96" width="160" height="110" rx="4" fill="#efe8dc" stroke="#163729" stroke-width="2"/>
          <rect x="284" y="114" width="58" height="40" rx="3" fill="#fbf8f2" stroke="#163729" stroke-width="2"/>
          <rect x="354" y="114" width="58" height="40" rx="3" fill="#fbf8f2" stroke="#7a3e2e" stroke-width="2"/>
          <text x="313" y="139" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#163729">Box 1</text>
          <text x="383" y="139" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#7a3e2e">N + 1</text>
          <text x="348" y="186" text-anchor="middle" font-family="sans-serif" font-size="11" letter-spacing="1" fill="#3d3832">OPEN SIGHTLINES · UNSCENTED</text>
          <!-- Ruled notes -->
          <rect x="262" y="236" width="148" height="8" fill="#7a3e2e"/>
          <rect x="262" y="256" width="168" height="5" fill="#b5a895"/>
          <rect x="262" y="270" width="144" height="5" fill="#b5a895"/>
          <rect x="262" y="284" width="160" height="5" fill="#b5a895"/>
          <rect x="262" y="316" width="170" height="90" rx="4" fill="#f7efe4" stroke="#7a3e2e" stroke-width="1.5"/>
          <text x="278" y="344" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1" fill="#7a3e2e">MEDICAL FIRST RULE</text>
          <text x="278" y="366" font-family="Georgia, serif" font-size="13" fill="#1c1915">Rule out obstruction &amp;</text>
          <text x="278" y="386" font-family="Georgia, serif" font-size="13" fill="#1c1915">pain before buying gear.</text>
        </g>

        <!-- Right Specimen: Stoneware Bowl & Botanical Study -->
        <g transform="translate(610, 92)">
          <rect x="0" y="0" width="502" height="450" rx="6" fill="#1f4937" stroke="#d8b268" stroke-width="2"/>
          <!-- Decorative grid lines -->
          <line x1="40" y1="60" x2="462" y2="60" stroke="#87a896" stroke-width="0.75" opacity="0.4"/>
          <line x1="40" y1="380" x2="462" y2="380" stroke="#87a896" stroke-width="0.75" opacity="0.4"/>
          <!-- Large circular botanical medallion -->
          <circle cx="251" cy="215" r="132" fill="#163729" stroke="#d8b268" stroke-width="2"/>
          <circle cx="251" cy="215" r="122" fill="none" stroke="#87a896" stroke-width="1" stroke-dasharray="6 4"/>
          <!-- Warm steam waves -->
          <path d="M210 155 C202 135, 222 125, 214 105" fill="none" stroke="#d8b268" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M251 145 C243 125, 263 115, 255 95" fill="none" stroke="#d8b268" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M292 155 C284 135, 304 125, 296 105" fill="none" stroke="#d8b268" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Ration mound inside bowl -->
          <path d="M168 212 Q251 162 334 212 Z" fill="#c87d4b"/>
          <circle cx="220" cy="198" r="6" fill="#f6f2e8" opacity="0.85"/>
          <circle cx="252" cy="190" r="6" fill="#f6f2e8" opacity="0.85"/>
          <circle cx="282" cy="199" r="6" fill="#f6f2e8" opacity="0.85"/>
          <!-- Stoneware feeding bowl -->
          <path d="M146 210 L356 210 L332 286 C328 298, 314 304, 298 304 L204 304 C188 304, 174 298, 170 286 Z" fill="#f6f2e8" stroke="#d8b268" stroke-width="3"/>
          <line x1="158" y1="234" x2="344" y2="234" stroke="#163729" stroke-width="3"/>
          <rect x="216" y="252" width="70" height="22" rx="3" fill="#163729"/>
          <text x="251" y="267" text-anchor="middle" font-family="Georgia, serif" font-size="11" letter-spacing="2" fill="#d8b268">WELLFED</text>
          <!-- Caption inside right panel -->
          <text x="251" y="416" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#f6f2e8">Evidence-Led Guides for Dogs &amp; Cats</text>
          <text x="251" y="436" text-anchor="middle" font-family="sans-serif" font-size="11" letter-spacing="2" fill="#d8b268">AVMA · AAFCO · FDA · WSAVA · CORNELL · MERCK</text>
        </g>
      `;

    case "dog-food-for-diarrhea":
      return `
        <!-- Left: Stoneware Bland Diet Bowl & Hydration Study -->
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="490" height="450" rx="6" fill="#fbf8f2" stroke="#1b4332" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#1b4332">SPECIMEN A — BLAND GI RATION</text>
          <line x1="36" y1="60" x2="454" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>
          <!-- Bowl illustration -->
          <circle cx="245" cy="220" r="120" fill="#e6efe9" stroke="#1b4332" stroke-width="2"/>
          <!-- Gentle steam -->
          <path d="M205 150 C198 132, 216 122, 208 104" fill="none" stroke="#c87d4b" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M245 142 C238 124, 256 114, 248 96" fill="none" stroke="#c87d4b" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M285 150 C278 132, 296 122, 288 104" fill="none" stroke="#c87d4b" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Rice & pumpkin mound -->
          <path d="M160 220 Q245 162 330 220 Z" fill="#f4ecd8" stroke="#1b4332" stroke-width="2"/>
          <path d="M210 218 Q245 182 280 218 Z" fill="#c87d4b"/>
          <!-- Bowl body -->
          <path d="M142 218 L348 218 L324 292 C318 304, 304 310, 288 310 L202 310 C186 310, 172 304, 166 292 Z" fill="#1b4332"/>
          <line x1="154" y1="242" x2="336" y2="242" stroke="#d8b268" stroke-width="2.5"/>
          <!-- Labels -->
          <rect x="36" y="366" width="130" height="52" rx="4" fill="#e6efe9" stroke="#1b4332" stroke-width="1.5"/>
          <text x="101" y="388" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1b4332">LOW FAT</text>
          <text x="101" y="406" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#3d3832">Lean protein + starch</text>

          <rect x="180" y="366" width="130" height="52" rx="4" fill="#f7efe4" stroke="#c87d4b" stroke-width="1.5"/>
          <text x="245" y="388" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#7a3e2e">SOLUBLE FIBER</text>
          <text x="245" y="406" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#3d3832">Plain pumpkin / psyllium</text>

          <rect x="324" y="366" width="130" height="52" rx="4" fill="#e6efe9" stroke="#1b4332" stroke-width="1.5"/>
          <text x="389" y="388" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1b4332">HYDRATION</text>
          <text x="389" y="406" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#3d3832">Free water + moisture</text>
        </g>

        <!-- Right: 24-48h Triage & Gradual Re-Introduction Ledger -->
        <g transform="translate(606, 92)">
          <rect x="0" y="0" width="506" height="450" rx="6" fill="#fbf8f2" stroke="#1b4332" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#7a3e2e">SPECIMEN B — CLINICAL TRIAGE WINDOW</text>
          <line x1="36" y1="60" x2="470" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <!-- Triage rows -->
          <rect x="36" y="84" width="434" height="76" rx="4" fill="#f7efe4" stroke="#7a3e2e" stroke-width="1.5"/>
          <circle cx="74" cy="122" r="20" fill="#7a3e2e"/>
          <text x="74" y="128" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#fbf8f2">!</text>
          <text x="110" y="112" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#7a3e2e">CALL CLINIC FIRST IF PRESENT</text>
          <text x="110" y="134" font-family="Georgia, serif" font-size="15" fill="#1c1915">Puppies, blood/tarry stool, repeated vomiting, lethargy</text>

          <rect x="36" y="178" width="434" height="76" rx="4" fill="#e6efe9" stroke="#1b4332" stroke-width="1.5"/>
          <circle cx="74" cy="216" r="20" fill="#1b4332"/>
          <text x="74" y="222" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#fbf8f2">1</text>
          <text x="110" y="206" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#1b4332">SMALL FREQUENT PORTIONS (24–48 HRS)</text>
          <text x="110" y="228" font-family="Georgia, serif" font-size="15" fill="#1c1915">3–4 small meals/day; vet GI diet or boiled chicken &amp; rice</text>

          <rect x="36" y="272" width="434" height="76" rx="4" fill="#fbf8f2" stroke="#1b4332" stroke-width="1.5"/>
          <circle cx="74" cy="310" r="20" fill="#c87d4b"/>
          <text x="74" y="316" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#fbf8f2">2</text>
          <text x="110" y="300" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#7a3e2e">5-DAY STEPWISE TRANSITION BACK</text>
          <text x="110" y="322" font-family="Georgia, serif" font-size="15" fill="#1c1915">75/25 → 50/50 → 25/75 → 100% balanced maintenance diet</text>

          <rect x="36" y="370" width="434" height="48" rx="4" fill="#1b4332"/>
          <text x="253" y="399" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1.5" fill="#f6f2e8">HOME BOILED MEALS LACK CALCIUM &amp; MICRONUTRIENTS LONG-TERM</text>
        </g>
      `;

    case "dog-food-brands-to-avoid":
      return `
        <!-- Left: Annotated Bag Specimen -->
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="480" height="450" rx="6" fill="#fbf8f2" stroke="#1e2d3d" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#1e2d3d">SPECIMEN A — THE BACK-OF-BAG PANEL</text>
          <line x1="36" y1="60" x2="444" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <!-- Dog food bag illustration -->
          <rect x="110" y="84" width="260" height="330" rx="8" fill="#efe8dc" stroke="#1e2d3d" stroke-width="3"/>
          <path d="M110 112 L370 112" stroke="#1e2d3d" stroke-width="2"/>
          <rect x="134" y="132" width="212" height="58" rx="4" fill="#fbf8f2" stroke="#1b4332" stroke-width="2"/>
          <text x="240" y="154" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1" fill="#1b4332">1. AAFCO ADEQUACY STATEMENT</text>
          <text x="240" y="174" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#1c1915">Complete &amp; Balanced · Life Stage</text>

          <rect x="134" y="204" width="212" height="58" rx="4" fill="#fbf8f2" stroke="#1e2d3d" stroke-width="2"/>
          <text x="240" y="226" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1" fill="#1e2d3d">2. GUARANTEED ANALYSIS</text>
          <text x="240" y="246" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#1c1915">Convert to Dry Matter to compare</text>

          <rect x="134" y="276" width="212" height="58" rx="4" fill="#f7efe4" stroke="#8c3b2b" stroke-width="2"/>
          <text x="240" y="298" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1" fill="#8c3b2b">3. MANUFACTURER IMPRINT</text>
          <text x="240" y="318" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#1c1915">"Manufactured by" vs "Distributed by"</text>

          <rect x="134" y="348" width="212" height="44" rx="4" fill="#1e2d3d"/>
          <text x="240" y="375" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1.5" fill="#f6f2e8">LOT CODE &amp; BEST-BY STAMP</text>
        </g>

        <!-- Right: 4 Red Flags Checklist -->
        <g transform="translate(596, 92)">
          <rect x="0" y="0" width="516" height="450" rx="6" fill="#fbf8f2" stroke="#1e2d3d" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#8c3b2b">SPECIMEN B — FOUR LABEL RED FLAGS</text>
          <line x1="36" y1="60" x2="480" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <g transform="translate(36, 82)">
            <rect width="444" height="72" rx="4" fill="#f7efe4" stroke="#8c3b2b" stroke-width="1.5"/>
            <text x="20" y="28" font-family="sans-serif" font-size="12" font-weight="bold" fill="#8c3b2b">01 · INTERMITTENT OR SUPPLEMENTAL ONLY</text>
            <text x="20" y="52" font-family="Georgia, serif" font-size="14" fill="#1c1915">Not formulated as a complete daily maintenance diet.</text>
          </g>
          <g transform="translate(36, 168)">
            <rect width="444" height="72" rx="4" fill="#fbf8f2" stroke="#1e2d3d" stroke-width="1.5"/>
            <text x="20" y="28" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e2d3d">02 · PULSE-HEAVY TOP INGREDIENTS (FDA DCM NOTE)</text>
            <text x="20" y="52" font-family="Georgia, serif" font-size="14" fill="#1c1915">Peas, lentils, chickpeas, or potatoes stacked in top 5 items.</text>
          </g>
          <g transform="translate(36, 254)">
            <rect width="444" height="72" rx="4" fill="#fbf8f2" stroke="#1e2d3d" stroke-width="1.5"/>
            <text x="20" y="28" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e2d3d">03 · OPAQUE FORMULATION &amp; PLANT OWNERSHIP</text>
            <text x="20" y="52" font-family="Georgia, serif" font-size="14" fill="#1c1915">Cannot answer WSAVA questions on nutritionist or quality control.</text>
          </g>
          <g transform="translate(36, 340)">
            <rect width="444" height="72" rx="4" fill="#f7efe4" stroke="#8c3b2b" stroke-width="1.5"/>
            <text x="20" y="28" font-family="sans-serif" font-size="12" font-weight="bold" fill="#8c3b2b">04 · UNTESTED RAW OR PATHOGEN EXPOSURE</text>
            <text x="20" y="52" font-family="Georgia, serif" font-size="14" fill="#1c1915">Salmonella &amp; Listeria risks to pets and household members.</text>
          </g>
        </g>
      `;

    case "dog-not-eating":
      return `
        <!-- Left: Bowl & Warming / Aroma Study -->
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="480" height="450" rx="6" fill="#fbf8f2" stroke="#7a3e2e" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#7a3e2e">SPECIMEN A — PALATABILITY &amp; AROMA RESET</text>
          <line x1="36" y1="60" x2="444" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <circle cx="240" cy="215" r="118" fill="#f6ede2" stroke="#7a3e2e" stroke-width="2"/>
          <!-- Temperature badge -->
          <rect x="185" y="108" width="110" height="28" rx="14" fill="#7a3e2e"/>
          <text x="240" y="126" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fbf8f2">WARM TO ~38°C</text>
          <!-- Aroma waves -->
          <path d="M196 178 C190 160, 208 152, 200 138" fill="none" stroke="#7a3e2e" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M240 172 C234 154, 252 146, 244 132" fill="none" stroke="#7a3e2e" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M284 178 C278 160, 296 152, 288 138" fill="none" stroke="#7a3e2e" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Bowl -->
          <path d="M144 218 L336 218 L314 288 C308 300, 294 306, 278 306 L202 306 C186 306, 172 300, 166 288 Z" fill="#1b4332"/>
          <line x1="156" y1="242" x2="324" y2="242" stroke="#d8b268" stroke-width="2.5"/>

          <rect x="36" y="356" width="408" height="62" rx="4" fill="#e6efe9" stroke="#1b4332" stroke-width="1.5"/>
          <text x="240" y="382" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1b4332">THE 10% TREAT &amp; TOPPER CEILING</text>
          <text x="240" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#1c1915">Warm water or plain unsalted broth (no onion/garlic); keep extras &lt;10%</text>
        </g>

        <!-- Right: Appetite Diagnostic Matrix -->
        <g transform="translate(596, 92)">
          <rect x="0" y="0" width="516" height="450" rx="6" fill="#fbf8f2" stroke="#7a3e2e" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#1b4332">SPECIMEN B — THREE-LAYER DIAGNOSTIC</text>
          <line x1="36" y1="60" x2="480" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <g transform="translate(36, 84)">
            <rect width="444" height="96" rx="4" fill="#f7efe4" stroke="#7a3e2e" stroke-width="1.5"/>
            <text x="22" y="30" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#7a3e2e">LAYER 1 · THE DOG (MEDICAL &amp; ORAL PAIN)</text>
            <text x="22" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Nausea, broken tooth, fever, kidney/liver illness, or pain bending</text>
            <text x="22" y="76" font-family="Georgia, serif" font-size="14" fill="#7a3e2e">→ Call vet within 24–48h (sooner for puppies or vomiting)</text>
          </g>
          <g transform="translate(36, 198)">
            <rect width="444" height="96" rx="4" fill="#fbf8f2" stroke="#1b4332" stroke-width="1.5"/>
            <text x="22" y="30" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#1b4332">LAYER 2 · THE BOWL (FOOD SPOILAGE &amp; LOT SHIFT)</text>
            <text x="22" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Oxidized fats at the bottom of an open bag, storage mites, or new</text>
            <text x="22" y="76" font-family="Georgia, serif" font-size="14" fill="#1b4332">→ Keep kibble in original bag inside an airtight bin</text>
          </g>
          <g transform="translate(36, 312)">
            <rect width="444" height="96" rx="4" fill="#e6efe9" stroke="#1b4332" stroke-width="1.5"/>
            <text x="22" y="30" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#1b4332">LAYER 3 · THE ROOM (ROUTINE &amp; SCHEDULE)</text>
            <text x="22" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Offer meal in a quiet spot for 15–20 minutes, then pick up the bowl</text>
            <text x="22" y="76" font-family="Georgia, serif" font-size="14" fill="#1b4332">→ Avoid hand-feeding high-fat table scraps that cause pancreatitis</text>
          </g>
        </g>
      `;

    case "cat-pooping-outside-litter-box":
      return `
        <!-- Left: Architectural Floorplan of N+1 Setup -->
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="490" height="450" rx="6" fill="#fbf8f2" stroke="#2f4032" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#2f4032">SPECIMEN A — HOUSEHOLD BOX ARCHITECTURE</text>
          <line x1="36" y1="60" x2="454" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <!-- Architectural blueprint box -->
          <rect x="44" y="84" width="402" height="256" rx="4" fill="#eee7da" stroke="#2f4032" stroke-width="2"/>
          <line x1="245" y1="84" x2="245" y2="260" stroke="#2f4032" stroke-width="2"/>
          <text x="144" y="112" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1" fill="#2f4032">ZONE A · QUIET LIVING AREA</text>
          <text x="345" y="112" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1" fill="#7a3e2e">ZONE B · SEPARATE HALL/ROOM</text>

          <!-- Tray 1 -->
          <rect x="78" y="136" width="132" height="86" rx="6" fill="#fbf8f2" stroke="#2f4032" stroke-width="2.5"/>
          <rect x="90" y="148" width="108" height="62" rx="3" fill="#e6efe9"/>
          <text x="144" y="184" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#2f4032">Open Box 1</text>

          <!-- Tray 2 -->
          <rect x="278" y="136" width="132" height="86" rx="6" fill="#fbf8f2" stroke="#7a3e2e" stroke-width="2.5"/>
          <rect x="290" y="148" width="108" height="62" rx="3" fill="#f7efe4"/>
          <text x="344" y="184" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#7a3e2e">Open Box 2 (N+1)</text>

          <text x="245" y="316" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2f4032">TWO SIGHTLINES · AWAY FROM FOOD BOWLS &amp; APPLIANCES</text>

          <rect x="44" y="358" width="402" height="60" rx="4" fill="#2f4032"/>
          <text x="245" y="384" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1.5" fill="#f6f2e8">TRAY DIMENSION RULE: ≥ 1.5× CAT LENGTH (NOSE TO TAIL BASE)</text>
          <text x="245" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#d8b268">Uncovered · Low entry cut-out for senior/arthritic cats</text>
        </g>

        <!-- Right: Stool & Behavior Triage -->
        <g transform="translate(606, 92)">
          <rect x="0" y="0" width="506" height="450" rx="6" fill="#fbf8f2" stroke="#2f4032" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#7a3e2e">SPECIMEN B — MEDICAL VS. AVERSION CHECK</text>
          <line x1="36" y1="60" x2="470" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <g transform="translate(36, 84)">
            <rect width="434" height="104" rx="4" fill="#f7efe4" stroke="#7a3e2e" stroke-width="1.5"/>
            <text x="20" y="30" font-family="sans-serif" font-size="12" font-weight="bold" fill="#7a3e2e">01 · CONSTIPATION, COLITIS OR ARTHRITIC PAIN</text>
            <text x="20" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Dry pebble stool, mucus/blood, or stiff hips climbing high rims</text>
            <text x="20" y="78" font-family="Georgia, serif" font-size="14" fill="#7a3e2e">teaches the cat to associate the tray itself with pain.</text>
          </g>
          <g transform="translate(36, 204)">
            <rect width="434" height="104" rx="4" fill="#e6efe9" stroke="#2f4032" stroke-width="1.5"/>
            <text x="20" y="30" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2f4032">02 · SUBSTRATE CAFETERIA TEST</text>
            <text x="20" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Place two uncovered boxes side by side with 2–3 inches of fine,</text>
            <text x="20" y="78" font-family="Georgia, serif" font-size="14" fill="#2f4032">unscented clumping litter vs. the current litter; let the cat vote.</text>
          </g>
          <g transform="translate(36, 324)">
            <rect width="434" height="94" rx="4" fill="#fbf8f2" stroke="#2f4032" stroke-width="1.5"/>
            <text x="20" y="30" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2f4032">03 · SCOOP DAILY &amp; CLEAN SPOTS WITH ENZYMES</text>
            <text x="20" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Remove odor cues with enzymatic cleaner (never ammonia) and</text>
            <text x="20" y="76" font-family="Georgia, serif" font-size="14" fill="#1c1915">skip plastic liners, hoods, and scented deodorizer powders.</text>
          </g>
        </g>
      `;

    case "cat-peeing-outside-litter-box":
      return `
        <!-- Left: Emergency Urinary Blockage Screen -->
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="490" height="450" rx="6" fill="#fbf8f2" stroke="#193648" stroke-width="2.5"/>
          <rect x="0" y="0" width="490" height="58" rx="4" fill="#9e3a2b"/>
          <text x="245" y="36" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" letter-spacing="2" fill="#fbf8f2">URGENT TRIAGE — RULE OUT URETHRAL BLOCKAGE FIRST</text>

          <g transform="translate(36, 82)">
            <rect width="418" height="142" rx="6" fill="#f7efe4" stroke="#9e3a2b" stroke-width="2"/>
            <circle cx="52" cy="71" r="26" fill="#9e3a2b"/>
            <text x="52" y="80" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="bold" fill="#fbf8f2">!</text>
            <text x="96" y="40" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#9e3a2b">SAME-DAY EMERGENCY CLINIC SIGNS</text>
            <text x="96" y="66" font-family="Georgia, serif" font-size="15" fill="#1c1915">• Repeated trips to squat with no urine or only drops</text>
            <text x="96" y="92" font-family="Georgia, serif" font-size="15" fill="#1c1915">• Vocalizing in the box, licking genitals, pink urine</text>
            <text x="96" y="118" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#9e3a2b">• Male cats are at high risk of fatal obstruction</text>
          </g>

          <g transform="translate(36, 244)">
            <rect width="418" height="172" rx="6" fill="#e6eef2" stroke="#193648" stroke-width="2"/>
            <text x="24" y="34" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="#193648">SQUATTING (ELIMINATION) VS. STANDING (SPRAYING)</text>
            <line x1="24" y1="48" x2="394" y2="48" stroke="#193648" stroke-width="1" opacity="0.3"/>
            <text x="24" y="76" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#193648">Squatting on horizontal surfaces (rugs, bathmats, beds):</text>
            <text x="24" y="98" font-family="Georgia, serif" font-size="14" fill="#1c1915">Usually bladder inflammation (FIC), crystals, UTI, or litter aversion.</text>
            <text x="24" y="128" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#193648">Standing upright (vertical walls, doors, curtains):</text>
            <text x="24" y="150" font-family="Georgia, serif" font-size="14" fill="#1c1915">Urine marking driven by territorial conflict or outdoor cats.</text>
          </g>
        </g>

        <!-- Right: Hydration, Urinalysis & Box Reset -->
        <g transform="translate(606, 92)">
          <rect x="0" y="0" width="506" height="450" rx="6" fill="#fbf8f2" stroke="#193648" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#193648">SPECIMEN B — CLINIC + HOUSEHOLD PROTOCOL</text>
          <line x1="36" y1="60" x2="470" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>

          <g transform="translate(36, 84)">
            <rect width="434" height="98" rx="4" fill="#fbf8f2" stroke="#193648" stroke-width="1.5"/>
            <text x="22" y="30" font-family="sans-serif" font-size="12" font-weight="bold" fill="#193648">STEP 1 · URINALYSIS &amp; MOISTURE INTAKE</text>
            <text x="22" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Check specific gravity, sediment &amp; pH. Dilute urine with wet food</text>
            <text x="22" y="76" font-family="Georgia, serif" font-size="14" fill="#193648">and wide water bowls placed away from the litter area.</text>
          </g>
          <g transform="translate(36, 200)">
            <rect width="434" height="98" rx="4" fill="#e6eef2" stroke="#193648" stroke-width="1.5"/>
            <text x="22" y="30" font-family="sans-serif" font-size="12" font-weight="bold" fill="#193648">STEP 2 · UNCOVERED N+1 BOXES &amp; UNSCENTED LITTER</text>
            <text x="22" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Add a fresh, open box in a quiet room with 2–3 in. fine unscented</text>
            <text x="22" y="76" font-family="Georgia, serif" font-size="14" fill="#193648">clumping clay so a cat recovering from cystitis has a clean slate.</text>
          </g>
          <g transform="translate(36, 316)">
            <rect width="434" height="98" rx="4" fill="#fbf8f2" stroke="#193648" stroke-width="1.5"/>
            <text x="22" y="30" font-family="sans-serif" font-size="12" font-weight="bold" fill="#193648">STEP 3 · ENZYMATIC SATURATION OF ACCIDENT SPOTS</text>
            <text x="22" y="54" font-family="Georgia, serif" font-size="14" fill="#1c1915">Soak carpet/padding with enzymatic cleaner, let air-dry, and block</text>
            <text x="22" y="76" font-family="Georgia, serif" font-size="14" fill="#193648">access while the spot cures so scent does not pull the cat back.</text>
          </g>
        </g>
      `;

    case "dog-food-for-picky-eaters":
      return `
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="480" height="450" rx="6" fill="#fbf8f2" stroke="#1b4332" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#1b4332">SPECIMEN A — THE DAY'S CALORIES</text>
          <line x1="36" y1="60" x2="444" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>
          <rect x="56" y="110" width="368" height="36" rx="4" fill="#1b4332"/>
          <text x="240" y="134" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbf8f2">90% COMPLETE DIET</text>
          <rect x="56" y="154" width="368" height="28" rx="4" fill="#9a6232"/>
          <text x="240" y="173" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fbf8f2">10% TREATS, TOPPERS, BROTH</text>
          <path d="M150 250 L330 250 L312 310 C306 322, 292 328, 276 328 L204 328 C188 328, 174 322, 168 310 Z" fill="#1b4332"/>
          <line x1="162" y1="274" x2="318" y2="274" stroke="#d8b268" stroke-width="2.5"/>
          <text x="240" y="380" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#1c1915">Warm the current food first.</text>
          <text x="240" y="406" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="#1b4332">A new protein is the last change.</text>
        </g>
        <g transform="translate(596, 92)">
          <rect x="0" y="0" width="516" height="450" rx="6" fill="#fbf8f2" stroke="#1b4332" stroke-width="2.5"/>
          <text x="36" y="46" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#9a6232">SPECIMEN B — ONE FORMAT AT A TIME</text>
          <line x1="36" y1="60" x2="480" y2="60" stroke="#d9d0c0" stroke-width="1.5"/>
          <g transform="translate(36, 88)">
            <rect width="444" height="90" rx="4" fill="#e4efe8" stroke="#1b4332" stroke-width="1.5"/>
            <text x="22" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1b4332">WET — SMELL AND TEXTURE</text>
            <text x="22" y="58" font-family="Georgia, serif" font-size="15" fill="#1c1915">A complete can, or a small top-dress.</text>
            <text x="22" y="78" font-family="Georgia, serif" font-size="14" fill="#1b4332">Count it. Do not hide a second diet.</text>
          </g>
          <g transform="translate(36, 194)">
            <rect width="444" height="90" rx="4" fill="#fbf8f2" stroke="#9a6232" stroke-width="1.5"/>
            <text x="22" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9a6232">DRY — ONLY IF THE DOG WORKS</text>
            <text x="22" y="58" font-family="Georgia, serif" font-size="15" fill="#1c1915">Performance kibble is calorie-dense.</text>
            <text x="22" y="78" font-family="Georgia, serif" font-size="14" fill="#9a6232">A full couch dog does not need it.</text>
          </g>
          <g transform="translate(36, 300)">
            <rect width="444" height="90" rx="4" fill="#f7efe4" stroke="#1b4332" stroke-width="1.5"/>
            <text x="22" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1b4332">FRESH — ONE RECIPE, THEN JUDGE</text>
            <text x="22" y="58" font-family="Georgia, serif" font-size="15" fill="#1c1915">Read the adequacy statement first.</text>
            <text x="22" y="78" font-family="Georgia, serif" font-size="14" fill="#1b4332">TODO until the current formula is checked.</text>
          </g>
        </g>
      `;

    default:
      return "";
  }
}

function heroSvg(page, width, height) {
  const frameStroke = page.slug === "home" ? "#d8b268" : page.accent;
  const captionColor = page.slug === "home" ? "#d8b268" : page.accent;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="${page.bg}"/>
  <!-- Outer Monograph Frame -->
  <rect x="28" y="24" width="1144" height="627" rx="4" fill="none" stroke="${frameStroke}" stroke-width="2.5"/>
  <rect x="36" y="32" width="1128" height="611" rx="2" fill="none" stroke="${frameStroke}" stroke-width="1" opacity="0.5"/>
  <!-- Top Plate Header Bar -->
  <text x="64" y="66" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2.5" fill="${captionColor}">${escapeXml(page.plate)}</text>
  <text x="1136" y="66" text-anchor="end" font-family="Georgia, serif" font-size="13" fill="${captionColor}">WELLFED PET GUIDE · ED. ANDREW VIRTS</text>
  <line x1="64" y1="76" x2="1136" y2="76" stroke="${frameStroke}" stroke-width="1" opacity="0.45"/>

  ${heroArtwork(page)}

  <!-- Bottom Plate Footer -->
  <line x1="64" y1="600" x2="1136" y2="600" stroke="${frameStroke}" stroke-width="1" opacity="0.45"/>
  <text x="64" y="624" font-family="Georgia, serif" font-size="13" fill="${captionColor}">Sourced from veterinary colleges, AAFCO, AVMA, FDA, WSAVA &amp; Merck Veterinary Manual</text>
  <text x="1136" y="624" text-anchor="end" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="2" fill="${captionColor}">NOT VETERINARY ADVICE</text>
</svg>`;
}

const detailConfigs = {
  "dog-food-for-diarrhea": {
    header: "PROTOCOL SCHEMATIC — ACUTE CANINE DIARRHEA & DIETARY RECOVERY",
    steps: [
      {
        num: "PHASE 01",
        title: "Triage Red Flags First",
        subtitle: "Before any home diet trial",
        bullets: [
          "Puppy, senior, or chronic disease",
          "Blood or black tarry stool (melena)",
          "Repeated vomiting or cannot hold water",
          "Lethargy, fever, pain, or toxin risk",
        ],
        footer: "If any apply → Call clinic today",
      },
      {
        num: "PHASE 02",
        title: "24–48h Bland Ration",
        subtitle: "Small, frequent low-fat meals",
        bullets: [
          "3–4 small meals spaced across the day",
          "Vet GI diet or plain boiled chicken & rice",
          "No butter, skin, oils, or rich chews",
          "Optional plain canned pumpkin (1 tsp–1 tbsp)",
        ],
        footer: "Keep fresh water available at all times",
      },
      {
        num: "PHASE 03",
        title: "5-Day Stepwise Return",
        subtitle: "Once stool firms to normal shape",
        bullets: [
          "Day 1–2: 75% bland + 25% regular food",
          "Day 3: 50% bland + 50% regular food",
          "Day 4: 25% bland + 75% regular food",
          "Day 5: 100% complete & balanced diet",
        ],
        footer: "Not improving after 48h → Vet fecal exam",
      },
    ],
  },
  "dog-food-brands-to-avoid": {
    header: "AUDIT PROTOCOL — HOW TO INSPECT ANY DOG FOOD BAG IN 3 STEPS",
    steps: [
      {
        num: "CHECK 01",
        title: "AAFCO Adequacy Statement",
        subtitle: "Locate near the ingredient panel",
        bullets: [
          "Confirm 'complete and balanced' wording",
          "Match life stage (Growth vs Adult Maintenance)",
          "Check Large Breed puppy threshold (70+ lb)",
          "Avoid 'intermittent or supplemental' for daily use",
        ],
        footer: "Required on state-regulated pet food labels",
      },
      {
        num: "CHECK 02",
        title: "Manufacturer & Formulation",
        subtitle: "Who formulates & makes the bag",
        bullets: [
          "'Manufactured by' = in-house plant",
          "'Distributed by' = third-party co-packer",
          "Can the brand name its nutritionist (PhD/DACVIM)?",
          "Look for lot code, date stamp & phone number",
        ],
        footer: "Based on WSAVA Global Nutrition Guidelines",
      },
      {
        num: "CHECK 03",
        title: "Ingredient & Safety Signals",
        subtitle: "Compare dry-matter & recall history",
        bullets: [
          "Watch multiple legumes/pulses stacked at top",
          "Convert wet vs dry to Dry Matter (DM) basis",
          "Search FDA Recalls & Withdrawals database",
          "Account for raw pathogen risk in the home",
        ],
        footer: "Verify current bag formula before buying",
      },
    ],
  },
  "dog-not-eating": {
    header: "DECISION PROTOCOL — WHEN A DOG WALKS AWAY FROM THE BOWL",
    steps: [
      {
        num: "STEP 01",
        title: "Medical & Dental Screen",
        subtitle: "Separate sickness from preference",
        bullets: [
          "Check energy, gums, hydration & breathing",
          "Look for drooling, pawing at mouth, or bad odor",
          "Watch if dog begs for treats or refuses all food",
          "Puppies & toy breeds risk low blood sugar fast",
        ],
        footer: "Total refusal >24–48h requires a veterinarian",
      },
      {
        num: "STEP 02",
        title: "Inspect the Food & Bowl",
        subtitle: "Rule out rancid fat or batch shifts",
        bullets: [
          "Smell the bag for stale paint/putty rancidity",
          "Check best-by date and store in original bag",
          "Wash stainless or ceramic bowls in hot soapy water",
          "Check if neck/shoulder pain hurts at floor level",
        ],
        footer: "Never dump loose kibble into unwashed plastic",
      },
      {
        num: "STEP 03",
        title: "Safe Kitchen Reset",
        subtitle: "Restore routine without pancreatitis",
        bullets: [
          "Warm meal with splash of hot water (~38°C)",
          "Use plain unsalted broth (zero onion or garlic)",
          "Put bowl down 15–20 mins, then pick it up",
          "Keep toppers & treats under 10% of daily calories",
        ],
        footer: "Avoid high-fat bacon/grease table scraps",
      },
    ],
  },
  "dog-food-for-picky-eaters": {
    header: "FEEDING PROTOCOL — A HEALTHY DOG WHO NEGOTIATES DINNER",
    steps: [
      {
        num: "STEP 01",
        title: "Separate Illness First",
        subtitle: "Choosy is not the same as sick",
        bullets: [
          "Puppy, weight loss, or vomiting: call",
          "Dropping food can be a painful mouth",
          "One skipped meal in a bright adult",
          "Prescription diets stay with the clinic",
        ],
        footer: "Shop only after the dog is well",
      },
      {
        num: "STEP 02",
        title: "Cap the Extras",
        subtitle: "Treats and toppers at 10%",
        bullets: [
          "Diary of every calorie for 3–5 days",
          "Own kibble can be the training treat",
          "No onion or garlic in the broth",
          "A topper the dog sorts out is the meal",
        ],
        footer: "AAHA and VCA use the 10% ceiling",
      },
      {
        num: "STEP 03",
        title: "Change One Format",
        subtitle: "Smell, then wet, then fresh",
        bullets: [
          "Warm the current complete food first",
          "One wet food, life stage matched",
          "Performance kibble is for working dogs",
          "Skip grain-free as the default upgrade",
        ],
        footer: "Names below stay TODO until verified",
      },
    ],
  },
  "cat-pooping-outside-litter-box": {
    header: "DIAGNOSTIC PROTOCOL — FELINE DEFECATION OUTSIDE THE LITTER TRAY",
    steps: [
      {
        num: "STEP 01",
        title: "Examine Stool & Mobility",
        subtitle: "Pain in the box drives avoidance",
        bullets: [
          "Hard, dry segments = constipation pain",
          "Frequent soft stool/mucus = colitis or parasites",
          "Senior hesitation = hip/spine osteoarthritis",
          "Anal gland discomfort or pelted long fur",
        ],
        footer: "Treat underlying pain or cat will reject new boxes",
      },
      {
        num: "STEP 02",
        title: "Apply the N+1 Floorplan",
        subtitle: "Eliminate resource guarding & traps",
        bullets: [
          "1 box per cat + 1 extra in separate rooms",
          "At least one box on every floor of the home",
          "Open sightlines with two escape routes",
          "Place away from food bowls & noisy appliances",
        ],
        footer: "Two boxes side-by-side count as one location",
      },
      {
        num: "STEP 03",
        title: "Upgrade Tray & Substrate",
        subtitle: "Match feline behavioral preferences",
        bullets: [
          "Uncovered tray ≥ 1.5× cat nose-to-tail length",
          "Low-entry cut-out (3–4 in) for older cats",
          "2–3 inches of fine, unscented clumping litter",
          "Scoop daily; clean accidents with enzyme spray",
        ],
        footer: "Skip scented powders, liners, and tight hoods",
      },
    ],
  },
  "cat-peeing-outside-litter-box": {
    header: "CLINICAL & HOUSEHOLD PROTOCOL — FELINE PERIURIA (URINE OUTSIDE BOX)",
    steps: [
      {
        num: "STEP 01",
        title: "Emergency & Vet Workup",
        subtitle: "Medical causes lead in cats",
        bullets: [
          "Straining with no urine = immediate ER visit",
          "Vet urinalysis (specific gravity, crystals, WBCs)",
          "Feline Idiopathic Cystitis (FIC) & stress pain",
          "Senior cats: screen kidney function & diabetes",
        ],
        footer: "Never punish a cat for urinary accidents",
      },
      {
        num: "STEP 02",
        title: "Boost Moisture & Reset Box",
        subtitle: "Dilute urine & remove box aversions",
        bullets: [
          "Increase canned wet food & water stations",
          "Provide N+1 large, uncovered low-sided boxes",
          "Use 2–3 in. unscented fine clumping litter",
          "Scoop 1–2× daily; wash tray with mild unscented soap",
        ],
        footer: "Wait until box use is stable before automated gear",
      },
      {
        num: "STEP 03",
        title: "Enzymatic Odor Eradication",
        subtitle: "Break the scent-return cycle",
        bullets: [
          "Blot fresh urine; saturate pad with enzyme cleaner",
          "Never use ammonia or vinegar (mimics urine cues)",
          "Block access to curing rugs with foil or furniture",
          "Reduce multi-cat tension with separate resources",
        ],
        footer: "Separate vertical spraying from horizontal squatting",
      },
    ],
  },
};

function detailSvg(page, width, height) {
  const cfg = detailConfigs[page.slug] ?? detailConfigs["dog-food-for-diarrhea"];
  const cards = cfg.steps
    .map((step, index) => {
      const x = 52 + index * 372;
      const badgeFill = index === 0 ? page.clay : page.accent;
      const bullets = step.bullets
        .map(
          (b, i) => `
          <circle cx="${x + 28}" cy="${332 + i * 52}" r="4.5" fill="${badgeFill}"/>
          <text x="${x + 44}" y="${337 + i * 52}" font-family="Georgia, serif" font-size="15.5" fill="#1c1915">${escapeXml(b)}</text>`,
        )
        .join("");

      return `
        <g>
          <rect x="${x}" y="140" width="352" height="540" rx="6" fill="#fbf8f2" stroke="${page.accent}" stroke-width="2.5"/>
          <rect x="${x}" y="140" width="352" height="52" rx="4" fill="${badgeFill}"/>
          <text x="${x + 24}" y="172" font-family="sans-serif" font-size="13" font-weight="bold" letter-spacing="2" fill="#fbf8f2">${escapeXml(step.num)}</text>
          <text x="${x + 328}" y="172" text-anchor="end" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#f6f2e8">0${index + 1}</text>

          <text x="${x + 24}" y="232" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#1c1915">${escapeXml(step.title)}</text>
          <text x="${x + 24}" y="258" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1" fill="${badgeFill}">${escapeXml(step.subtitle.toUpperCase())}</text>
          <line x1="${x + 24}" y1="278" x2="${x + 328}" y2="278" stroke="#d9d0c0" stroke-width="1.5"/>

          ${bullets}

          <rect x="${x + 20}" y="592" width="312" height="64" rx="4" fill="${page.bg}" stroke="${badgeFill}" stroke-width="1.5"/>
          <text x="${x + 176}" y="629" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="bold" fill="#1c1915">${escapeXml(step.footer)}</text>
        </g>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="${page.bg}"/>
  <rect x="24" y="24" width="1152" height="752" rx="4" fill="none" stroke="${page.accent}" stroke-width="2.5"/>
  <rect x="32" y="32" width="1136" height="736" rx="2" fill="none" stroke="${page.accent}" stroke-width="1" opacity="0.45"/>

  <text x="52" y="76" font-family="sans-serif" font-size="13" font-weight="bold" letter-spacing="2.5" fill="${page.accent}">${escapeXml(cfg.header)}</text>
  <text x="1148" y="76" text-anchor="end" font-family="Georgia, serif" font-size="14" fill="${page.ink}">WellFed Pet Guide · Field Protocol</text>
  <line x1="52" y1="96" x2="1148" y2="96" stroke="${page.accent}" stroke-width="1.5" opacity="0.4"/>

  ${cards}

  <text x="52" y="732" font-family="Georgia, serif" font-size="14" fill="${page.ink}">Compiled from public veterinary school &amp; regulatory guidance · Verify clinical signs with your veterinarian</text>
  <text x="1148" y="732" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1.5" fill="${page.clay}">WELLFEDPETGUIDE.COM</text>
</svg>`;
}

function ogSvg(page) {
  const lines = wrap(page.title, 26);
  const text = lines
    .map(
      (line, index) =>
        `<text x="88" y="${260 + index * 72}" font-family="Georgia, serif" font-size="60" font-weight="bold" fill="${page.ink}">${escapeXml(line)}</text>`,
    )
    .join("");
  const subColor = page.slug === "home" ? "#d8b268" : page.clay;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${page.bg}"/>
  <rect x="0" y="0" width="24" height="630" fill="${page.accent}"/>
  <rect x="48" y="36" width="1116" height="558" fill="none" stroke="${page.accent}" stroke-width="2" opacity="0.5"/>
  <text x="88" y="118" font-family="sans-serif" font-size="22" font-weight="bold" letter-spacing="3.5" fill="${subColor}">${escapeXml(page.kicker.toUpperCase())}</text>
  <line x1="88" y1="142" x2="1112" y2="142" stroke="${page.accent}" stroke-width="1.5" opacity="0.4"/>
  ${text}
  <line x1="88" y1="500" x2="1112" y2="500" stroke="${page.accent}" stroke-width="1.5" opacity="0.4"/>
  <text x="88" y="548" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="${page.ink}">WellFed Pet Guide</text>
  <text x="1112" y="548" text-anchor="end" font-family="sans-serif" font-size="18" letter-spacing="2" fill="${subColor}">EDITED BY ANDREW VIRTS</text>
</svg>`;
}

async function raster(svg, file, format, width, height) {
  let pipeline = sharp(Buffer.from(svg)).resize(width, height);
  if (format === "avif") pipeline = pipeline.avif({ quality: 52 });
  if (format === "webp") pipeline = pipeline.webp({ quality: 78 });
  if (format === "jpg") pipeline = pipeline.jpeg({ quality: 82 });
  if (format === "png") pipeline = pipeline.png();
  await pipeline.toFile(file);
}

const logo = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#163729"/>
  <rect x="28" y="28" width="456" height="456" rx="44" fill="none" stroke="#d8b268" stroke-width="8" opacity="0.7"/>
  <circle cx="256" cy="108" r="18" fill="#d8b268"/>
  <path fill="#f6f2e8" d="M96 152h64l44 168 48-168h48l48 168 44-168h64l-68 232h-64l-48-164-48 164h-64z"/>
</svg>`;

await raster(logo, join(out, "logo.png"), "png", 512, 512);

for (const page of pages) {
  const hero1200 = heroSvg(page, 1200, 675);
  const hero800 = heroSvg(page, 800, 450);
  await raster(hero1200, join(out, `${page.slug}-hero-1200.avif`), "avif", 1200, 675);
  await raster(hero1200, join(out, `${page.slug}-hero-1200.webp`), "webp", 1200, 675);
  await raster(hero800, join(out, `${page.slug}-hero-800.avif`), "avif", 800, 450);
  await raster(hero800, join(out, `${page.slug}-hero-800.webp`), "webp", 800, 450);
  await raster(ogSvg(page), join(out, `${page.slug}-og.jpg`), "jpg", 1200, 630);
  if (page.slug === "home") continue;
  const detail1200 = detailSvg(page, 1200, 800);
  const detail800 = detailSvg(page, 800, 533);
  await raster(detail1200, join(out, `${page.slug}-detail-1200.avif`), "avif", 1200, 800);
  await raster(detail1200, join(out, `${page.slug}-detail-1200.webp`), "webp", 1200, 800);
  await raster(detail800, join(out, `${page.slug}-detail-800.avif`), "avif", 800, 533);
  await raster(detail800, join(out, `${page.slug}-detail-800.webp`), "webp", 800, 533);
}

console.log("images written to", out);
