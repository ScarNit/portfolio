/**
 * Pixel art as text. Each character is one pixel, "." is transparent,
 * every other letter is looked up in PALETTE. Used by the hero canvas
 * and by the project cover art.
 */
export const PALETTE: Record<string, string> = {
  a: "#ffb224", // amber
  d: "#b87410", // dark amber
  s: "#f2d6a2", // skin
  k: "#0e0c0a", // ink
  b: "#6b4a1e", // leather
  w: "#efe8da", // bone
  n: "#8a8272", // stone
  r: "#f0524f", // red
  g: "#9db552", // olive
  o: "#5f7030", // dark olive
  y: "#ffd75e", // flash
};

const HERO_TOP = [".aaaa..", "aaaaaa.", "aasssk.", "aassss.", ".dddd..", "adddda.", ".dddd.."];
export const HERO_RUN_A = [...HERO_TOP, ".d..d..", ".b..b.."];
export const HERO_RUN_B = [...HERO_TOP, "..dd...", "..bb..."];
export const HERO_JUMP = [...HERO_TOP, ".d..d..", "b....b."];

export const COVERS = {
  try: [
    "................",
    "................",
    "......aaaa......",
    ".....aaaaaa.....",
    ".....aasssk.....",
    ".....aassss.....",
    "......dddd......",
    ".....adddda.....",
    "......dddd......",
    "......d..d......",
    ".....b....b.....",
    "................",
    ".w...w...w...w..",
    "www.www.www.www.",
    "wwwwwwwwwwwwwwww",
    "nnnnnnnnnnnnnnnn",
  ],
  lucky: [
    "................",
    "...wwwwwwwwww...",
    "..wwwwwwwwwwww..",
    "..wwkkwwwwkkww..",
    "..wwkkwwwwkkww..",
    "..wwwwwwwwwwww..",
    "..wwwwwkkwwwww..",
    "..wwwwwkkwwwww..",
    "..wwwwwwwwwwww..",
    "..wwkkwwwwkkww..",
    "..wwkkwwwwkkww..",
    "..wwwwwwwwwwww..",
    "...wwwwwwwwww...",
    "....n......n....",
    "..rrrr....rrrr..",
    "..rrrr....rrrr..",
  ],
  samurai: [
    "................",
    ".....rrrrrr.....",
    "....rrrrrrrr...w",
    "...rrrrrrrrr..ww",
    "...rrrrrrrr..ww.",
    "...rrrrrrr..ww..",
    "...rrrrrr..ww...",
    "...rrrrr..ww....",
    "....rrr..ww.....",
    ".....r..ww......",
    ".......ww.......",
    "...a..ww........",
    "....aww.........",
    "....aaa.........",
    "...bb..a........",
    "..bb............",
  ],
  laststand: [
    "................",
    ".......rr.......",
    ".......rrrr.....",
    ".......n........",
    ".....oooooo.....",
    ".....oggggo..yy.",
    "....ooggggooooyy",
    ".....oggggo..yy.",
    ".....oooooo.....",
    "......gggg......",
    "......gggg......",
    ".....gggggg.....",
    "....gggggggg....",
    "...bbbbbbbbbb...",
    "..bbbbbbbbbbbb..",
    "nnnnnnnnnnnnnnnn",
  ],
} satisfies Record<string, string[]>;

export type CoverKey = keyof typeof COVERS;
