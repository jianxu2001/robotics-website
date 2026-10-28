import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");

const out = path.join(process.cwd(), "public/images/applications");
await fs.mkdir(out, { recursive: true });
const escape = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const sack = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M12 7 Q35 0 58 7 L67 53 Q68 65 53 68 L16 68 Q2 65 3 52 Z" fill="#c4a66e" stroke="#f2d6a0" stroke-width="3"/><path d="M15 12 Q35 17 56 12 M12 57 Q35 62 59 57" fill="none" stroke="#8c7248" stroke-width="3"/><path d="M22 27 L48 27 M22 35 L44 35" stroke="#7c643f" stroke-width="3"/></g>`;
const pallet = `<path d="M10 151 H192 V164 H10 Z M24 164 V175 M90 164 V175 M174 164 V175" fill="#715d3b" stroke="#c4a66e" stroke-width="4"/>`;
const rollers = `<rect x="8" y="139" width="184" height="20" rx="6" fill="#243644" stroke="#77909e" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${18 + i * 20} 141 V157" stroke="#8ca6b3" stroke-width="3"/>`).join("")}<path d="M24 159 V177 M176 159 V177" stroke="#8ca6b3" stroke-width="5"/>`;
const icons = {
  bag: `${rollers}${sack(62, 61, 1.15)}`,
  bags: `${pallet}${sack(17, 86, .86)}${sack(84, 86, .86)}${sack(50, 27, .86)}`,
  robot: `<rect x="83" y="132" width="47" height="39" rx="5" fill="#263847" stroke="#b7c6ce" stroke-width="4"/><path d="M107 132 L154 70 L83 25 L40 88" fill="none" stroke="#d8e1e6" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="M107 132 L154 70 L83 25 L40 88" fill="none" stroke="#465e6e" stroke-width="5"/>${[[107,132],[154,70],[83,25],[40,88]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#0e171f" stroke="#f5b41b" stroke-width="3"/>`).join("")}<path d="M17 102 H63 M17 102 V116 M63 102 V116" stroke="#69c6db" stroke-width="5" fill="none"/>${sack(18, 116, .63)}`,
  hopper: `<path d="M45 82 H159 L137 132 L113 139 V171 H88 V139 L65 132 Z" fill="#273b49" stroke="#b7c6ce" stroke-width="4"/><path d="M64 171 V123 M143 171 V123" stroke="#8ca6b3" stroke-width="5"/>${sack(53, 5, .76)}<path d="M79 44 L108 51" stroke="#f5b41b" stroke-width="5"/><path d="M83 66 L86 78 M99 66 L97 78 M112 65 L108 78" stroke="#c4a66e" stroke-width="4"/>`,
  vision: `<path d="M30 174 V24 H100" fill="none" stroke="#607b8c" stroke-width="7"/><rect x="82" y="17" width="61" height="35" rx="7" fill="#294554" stroke="#8dd5e6" stroke-width="3"/><circle cx="112" cy="36" r="9" fill="#8dd5e6"/><path d="M111 54 L54 141 M117 54 L172 141 M114 54 V132" stroke="#69c6db" stroke-width="2" stroke-dasharray="7 6"/>${sack(68, 111, .95)}`,
  tray: `<rect x="14" y="112" width="178" height="42" rx="7" fill="#263847" stroke="#8ca6b3" stroke-width="4"/>${[38,88,138].map(x=>`<ellipse cx="${x}" cy="91" rx="16" ry="8" fill="#b6c8d2"/><path d="M${x-16} 91 V119 Q${x} 132 ${x+16} 119 V91" fill="#607c8e" stroke="#b6c8d2" stroke-width="2"/>`).join("")}`,
  cnc: `<rect x="9" y="24" width="189" height="143" rx="10" fill="#233544" stroke="#b7c6ce" stroke-width="4"/><rect x="27" y="48" width="105" height="96" rx="3" fill="#0b1720" stroke="#6e8a99" stroke-width="3"/><path d="M65 51 V78 M55 78 H76 L72 96 H59 Z" fill="#8ca6b3" stroke="#b7c6ce" stroke-width="3"/><path d="M46 124 H112" stroke="#f5b41b" stroke-width="6"/><rect x="150" y="51" width="29" height="27" fill="#69c6db"/><circle cx="157" cy="99" r="4" fill="#f5b41b"/><circle cx="173" cy="99" r="4" fill="#74b892"/>`,
  belt: `${rollers}<rect x="35" y="76" width="57" height="59" rx="4" fill="#a68b5c" stroke="#e6c98f" stroke-width="3"/><path d="M63 77 V134 M35 90 H92" stroke="#6d5836" stroke-width="3"/><path d="M113 104 H173 M162 92 L174 104 L162 116" fill="none" stroke="#f5b41b" stroke-width="5"/>`,
  buffer: `${rollers}${[24,78,132].map(x=>`<rect x="${x}" y="83" width="44" height="52" rx="4" fill="#a68b5c" stroke="#e6c98f" stroke-width="3"/><path d="M${x+22} 85 V133" stroke="#6d5836" stroke-width="3"/>`).join("")}`,
};
icons["robot-part"] = icons.robot.replace(sack(18, 116, .63), '<path d="M25 125 V150 Q41 163 57 150 V125" fill="#607c8e" stroke="#b6c8d2" stroke-width="3"/><ellipse cx="41" cy="125" rx="16" ry="8" fill="#b6c8d2"/>');
const definitions = {
  "bag-palletizing": { icons: ["bag", "robot", "bags"], en: ["Robotic bag palletizing", ["Bag infeed", "Robot + bag tooling", "Pallet stack"]], zh: ["袋装物料码垛", ["袋装来料", "机器人与袋装工装", "托盘堆垛"]] },
  "bag-depalletizing": { icons: ["bags", "robot", "bag"], en: ["Bag depalletizing", ["Incoming bag stack", "Robot bag pickup", "Downstream handoff"]], zh: ["袋装拆垛与转运", ["来料袋垛", "机器人取袋", "下游接料"]] },
  "vision-bag-feeding": { icons: ["bags", "vision", "robot", "hopper"], en: ["Vision-guided bag feeding", ["Bag presentation", "Position detection", "Robot pickup", "Opening + discharge"]], zh: ["视觉引导袋装上料", ["袋体呈现", "视觉定位", "机器人取袋", "拆包与接料"]] },
  "machine-tending": { icons: ["tray", "robot-part", "cnc"], en: ["Machine loading and unloading", ["Parts tray", "Robot + part tooling", "Machine / fixture"]], zh: ["机床上下料", ["零件料盘", "机器人与零件工装", "机床与夹具"]] },
  "conveyor-flow": { icons: ["belt", "buffer", "belt"], en: ["Conveyor and buffer integration", ["Product infeed", "Accumulation buffer", "Downstream transfer"]], zh: ["输送与缓存衔接", ["产品进料", "间距与缓存", "下游转接"]] },
  "material-handling-line": { icons: ["bags", "hopper", "bags"], en: ["Material handling process planning", ["Inbound handling", "Feeding interface", "End-of-line handling"]], zh: ["物料搬运工艺规划", ["来料搬运", "上料接口", "末端搬运"]] },
};
for (const [key, definition] of Object.entries(definitions)) {
  for (const locale of ["en", "zh"]) {
    const [title, labels] = definition[locale];
    const n = definition.icons.length;
    const cardWidth = n === 4 ? 240 : 304;
    const gap = n === 4 ? 32 : 56;
    const left = (1200 - n * cardWidth - (n - 1) * gap) / 2;
    const cards = definition.icons.map((kind, i) => {
      const x = left + i * (cardWidth + gap);
      return `<g transform="translate(${x} 232)"><rect width="${cardWidth}" height="332" rx="20" fill="#111f2a" stroke="#314756"/><text x="22" y="38" fill="#f5b41b" font-size="18" font-weight="700">0${i+1}</text><g transform="translate(${(cardWidth-200)/2} 75)">${icons[kind]}</g><text x="${cardWidth/2}" y="302" text-anchor="middle" fill="#dce6ed" font-size="${n===4?18:20}" font-weight="600">${escape(labels[i])}</text></g>${i<n-1?`<path d="M${x+cardWidth+10} 394 H${x+cardWidth+gap-9} M${x+cardWidth+gap-20} 384 L${x+cardWidth+gap-9} 394 L${x+cardWidth+gap-20} 404" fill="none" stroke="#f5b41b" stroke-width="3"/>`:""}`;
    }).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><title>${escape(title)} — ${locale==="zh"?"工艺流程示意":"process schematic"}</title><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 H0 V40" fill="none" stroke="#253440" stroke-width=".6"/></pattern></defs><rect width="1200" height="760" fill="#0b131b"/><rect width="1200" height="760" fill="url(#grid)" opacity=".5"/><g font-family="Microsoft YaHei,Arial,sans-serif"><rect x="64" y="67" width="44" height="5" fill="#f5b41b"/><text x="124" y="77" fill="#8fa6b6" font-size="17" letter-spacing="2">SCR / ${locale==="zh"?"工艺流程示意":"PROCESS SCHEMATIC"}</text><text x="64" y="147" fill="#f1f5f8" font-size="38" font-weight="700">${escape(title)}</text><path d="M64 182 H1136" stroke="#314756"/>${cards}<text x="64" y="668" fill="#8fa6b6" font-size="18">${locale==="zh"?"布局、工装与配置按具体项目确认":"Layout, tooling and configuration are confirmed for each application"}</text><text x="1136" y="710" fill="#526d80" font-size="15" text-anchor="end">SCR ROBOT</text></g></svg>`;
    const base = path.join(out, `${key}-${locale}`);
    await fs.writeFile(`${base}.svg`, svg);
    await sharp(Buffer.from(svg)).png().toFile(`${base}.png`);
  }
}
console.log(`Generated ${Object.keys(definitions).length * 2} localized application diagrams (SVG + PNG).`);
