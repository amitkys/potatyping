"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

type KeyDef = {
  label: string;
  shifted?: string;
  code?: string; // e.g., "Digit1", "KeyQ"
  action?:
    | "delete"
    | "backspace"
    | "tab"
    | "enter"
    | "shift"
    | "caps"
    | "ctrl"
    | "alt"
    | "meta"
    | "menu"
    | "space";
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "space";
};

const row1: KeyDef[] = [
  { label: "`", shifted: "~", code: "Backquote" },
  { label: "1", shifted: "!", code: "Digit1" },
  { label: "2", shifted: "@", code: "Digit2" },
  { label: "3", shifted: "#", code: "Digit3" },
  { label: "4", shifted: "$", code: "Digit4" },
  { label: "5", shifted: "%", code: "Digit5" },
  { label: "6", shifted: "^", code: "Digit6" },
  { label: "7", shifted: "&", code: "Digit7" },
  { label: "8", shifted: "*", code: "Digit8" },
  { label: "9", shifted: "(", code: "Digit9" },
  { label: "0", shifted: ")", code: "Digit0" },
  { label: "-", shifted: "_", code: "Minus" },
  { label: "=", shifted: "+", code: "Equal" },
  { label: "delete", action: "delete", width: "lg" },
];

const row2: KeyDef[] = [
  { label: "tab", action: "tab", width: "md" },
  { label: "Q", code: "KeyQ" },
  { label: "W", code: "KeyW" },
  { label: "E", code: "KeyE" },
  { label: "R", code: "KeyR" },
  { label: "T", code: "KeyT" },
  { label: "Y", code: "KeyY" },
  { label: "U", code: "KeyU" },
  { label: "I", code: "KeyI" },
  { label: "O", code: "KeyO" },
  { label: "P", code: "KeyP" },
  { label: "[", shifted: "{", code: "BracketLeft" },
  { label: "]", shifted: "}", code: "BracketRight" },
  { label: "\\", shifted: "|", code: "Backslash" },
];

// Home row (Caps, A-L, ;, ', Enter)
const row3: KeyDef[] = [
  { label: "caps", action: "caps", width: "lg" },
  { label: "A", code: "KeyA" },
  { label: "S", code: "KeyS" },
  { label: "D", code: "KeyD" },
  { label: "F", code: "KeyF" },
  { label: "G", code: "KeyG" },
  { label: "H", code: "KeyH" },
  { label: "J", code: "KeyJ" },
  { label: "K", code: "KeyK" },
  { label: "L", code: "KeyL" },
  { label: ";", shifted: ":", code: "Semicolon" },
  { label: "'", shifted: '"', code: "Quote" },
  { label: "enter", action: "enter", width: "xl" },
];

// Bottom letter row (Shift, Z-M, , . /, Shift)
const row4: KeyDef[] = [
  { label: "shift", action: "shift", width: "xl" },
  { label: "Z", code: "KeyZ" },
  { label: "X", code: "KeyX" },
  { label: "C", code: "KeyC" },
  { label: "V", code: "KeyV" },
  { label: "B", code: "KeyB" },
  { label: "N", code: "KeyN" },
  { label: "M", code: "KeyM" },
  { label: ",", shifted: "<", code: "Comma" },
  { label: ".", shifted: ">", code: "Period" },
  { label: "/", shifted: "?", code: "Slash" },
  { label: "shift", action: "shift", width: "xl" },
];

// Space row (Ctrl, Meta, Alt, Space, Alt, Meta, Menu, Ctrl)
const row5: KeyDef[] = [
  { label: "ctrl", action: "ctrl", width: "md" },
  // { label: "meta", action: "meta", width: "md" },
  { label: "alt", action: "alt", width: "md" },
  { label: "space", action: "space", width: "space" },
  { label: "alt", action: "alt", width: "md" },
  // { label: "meta", action: "meta", width: "md" },
  { label: "ctrl", action: "ctrl", width: "md" },
];

function widthClass(w?: KeyDef["width"]) {
  switch (w) {
    case "md":
      return "w-16";
    case "lg":
      return "w-20";
    case "xl":
      return "w-28";
    case "2xl":
      return "w-36";
    case "space":
      return "w-96"; // wide spacebar
    default:
      return "w-10";
  }
}

function Key({
  k,
  onPress,
}: {
  k: KeyDef;
  onPress?: (k: KeyDef, e: React.KeyboardEvent | React.MouseEvent) => void;
}) {
  return (
    <Button
      aria-label={k.shifted ? `${k.shifted} ${k.label}` : k.label}
      className={`key ${widthClass(k.width)} h-10 rounded border flex items-center justify-center `}
      role="gridcell"
      type="button"
      variant={"outline"}
      onClick={(e) => onPress?.(k, e)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPress?.(k, e);
        }
      }}
    >
      <span className="flex flex-col items-center">
        {k.shifted && <kbd>{k.shifted}</kbd>}
        <kbd className="font-mono">{k.label}</kbd>
      </span>
    </Button>
  );
}

export default function Page() {
  const rows = [row1, row2, row3, row4, row5];

  return (
    <div className="fixed bottom-25 w-full flex justify-center">
      <div
        aria-label="Keyboard"
        className="relative flex flex-col gap-2 bg-card p-4 border rounded-lg shadow-lg scale-110"
        role="grid"
      >
        {/* left hand */}
        <Image
          alt="Resting hand on keyboard"
          className="pointer-events-none absolute -bottom-68 left-[17%] -translate-x-1/2"
          height={600}
          src="/left-bottom-row-2.png"
          width={520}
        />
        {/* right hand */}
        <Image
          alt="Resting hand on keyboard"
          className="pointer-events-none absolute -bottom-66 left-[71%] -translate-x-1/2"
          height={600}
          src="/right-top-row-5.png"
          width={568}
        />
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1 " role="row">
            {row.map((k, i) => (
              <Key key={i} k={k} onPress={(key) => console.log("press", key)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
