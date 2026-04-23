export type KeyboardKey = {
  code: string;
  label: string;
  shiftLabel?: string;
};

export type KeyboardLayout = {
  id: "english" | "hindi";
  name: string;
  upperRow: KeyboardKey[];
  homeRow: KeyboardKey[];
  lowerRow: KeyboardKey[];
  practiceSequence: string[];
};

export const keyboardLayouts: Record<KeyboardLayout["id"], KeyboardLayout> = {
  english: {
    id: "english",
    name: "English",
    upperRow: [
      { code: "KeyQ", label: "Q" },
      { code: "KeyW", label: "W" },
      { code: "KeyE", label: "E" },
      { code: "KeyR", label: "R" },
      { code: "KeyT", label: "T" },
      { code: "KeyY", label: "Y" },
      { code: "KeyU", label: "U" },
      { code: "KeyI", label: "I" },
      { code: "KeyO", label: "O" },
      { code: "KeyP", label: "P" },
      { code: "BracketLeft", label: "[", shiftLabel: "{" },
      { code: "BracketRight", label: "]", shiftLabel: "}" },
      { code: "Backslash", label: "\\", shiftLabel: "|" },
    ],
    homeRow: [
      { code: "KeyA", label: "A" },
      { code: "KeyS", label: "S" },
      { code: "KeyD", label: "D" },
      { code: "KeyF", label: "F" },
      { code: "KeyG", label: "G" },
      { code: "KeyH", label: "H" },
      { code: "KeyJ", label: "J" },
      { code: "KeyK", label: "K" },
      { code: "KeyL", label: "L" },
      { code: "Semicolon", label: ";", shiftLabel: ":" },
      { code: "Quote", label: "'", shiftLabel: '"' },
    ],
    lowerRow: [
      { code: "KeyZ", label: "Z" },
      { code: "KeyX", label: "X" },
      { code: "KeyC", label: "C" },
      { code: "KeyV", label: "V" },
      { code: "KeyB", label: "B" },
      { code: "KeyN", label: "N" },
      { code: "KeyM", label: "M" },
      { code: "Comma", label: ",", shiftLabel: "<" },
      { code: "Period", label: ".", shiftLabel: ">" },
      { code: "Slash", label: "/", shiftLabel: "?" },
    ],
    practiceSequence: [
      "KeyF",
      "KeyJ",
      "KeyD",
      "KeyK",
      "KeyS",
      "KeyL",
      "KeyA",
      "KeyG",
      "KeyH",
    ],
  },
  hindi: {
    id: "hindi",
    name: "Hindi",
    upperRow: [
      { code: "KeyQ", label: "ौ" },
      { code: "KeyW", label: "ै" },
      { code: "KeyE", label: "ा" },
      { code: "KeyR", label: "ी" },
      { code: "KeyT", label: "ू" },
      { code: "KeyY", label: "ब" },
      { code: "KeyU", label: "ह" },
      { code: "KeyI", label: "ग" },
      { code: "KeyO", label: "द" },
      { code: "KeyP", label: "ज" },
      { code: "BracketLeft", label: "ड", shiftLabel: "ढ़" },
      { code: "BracketRight", label: "़", shiftLabel: "ऋ" },
      { code: "Backslash", label: "\\", shiftLabel: "|" },
    ],
    homeRow: [
      { code: "KeyA", label: "ो" },
      { code: "KeyS", label: "े" },
      { code: "KeyD", label: "्" },
      { code: "KeyF", label: "ि" },
      { code: "KeyG", label: "ु" },
      { code: "KeyH", label: "प" },
      { code: "KeyJ", label: "र" },
      { code: "KeyK", label: "क" },
      { code: "KeyL", label: "त" },
      { code: "Semicolon", label: "च", shiftLabel: "छ" },
      { code: "Quote", label: "ट", shiftLabel: "ठ" },
    ],
    lowerRow: [
      { code: "KeyZ", label: "ॉ" },
      { code: "KeyX", label: "ं" },
      { code: "KeyC", label: "म" },
      { code: "KeyV", label: "न" },
      { code: "KeyB", label: "व" },
      { code: "KeyN", label: "ल" },
      { code: "KeyM", label: "स" },
      { code: "Comma", label: ",", shiftLabel: "ष" },
      { code: "Period", label: ".", shiftLabel: "।" },
      { code: "Slash", label: "य", shiftLabel: "?" },
    ],
    practiceSequence: [
      "KeyF",
      "KeyJ",
      "KeyD",
      "KeyK",
      "KeyS",
      "KeyL",
      "KeyA",
      "KeyH",
      "KeyG",
    ],
  },
};

export function findKeyLabel(layout: KeyboardLayout, code: string) {
  const allKeys = [...layout.upperRow, ...layout.homeRow, ...layout.lowerRow];

  return allKeys.find((key) => key.code === code)?.label ?? code;
}
