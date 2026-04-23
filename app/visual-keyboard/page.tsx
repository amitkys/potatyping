"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { keyboardLayouts, type KeyboardKey, findKeyLabel } from "@/lib/keyboard-layouts";
import { cn } from "@/lib/utils";

type LayoutId = keyof typeof keyboardLayouts;

function KeyboardButton({
  active,
  error,
  keyDef,
}: {
  active: boolean;
  error: boolean;
  keyDef: KeyboardKey;
}) {
  return (
    <div
      className={cn(
        "flex h-16 min-w-14 flex-col items-center justify-center rounded-2xl border px-3 text-lg font-semibold shadow-sm transition-colors",
        "bg-card text-card-foreground",
        active && "border-emerald-600 bg-emerald-100 text-emerald-950",
        error && "border-red-600 bg-red-100 text-red-950",
      )}
    >
      {keyDef.shiftLabel ? (
        <span className="text-xs font-medium leading-none opacity-75">
          {keyDef.shiftLabel}
        </span>
      ) : null}
      {keyDef.label}
    </div>
  );
}

export default function VisualKeyboardPage() {
  const [layoutId, setLayoutId] = useState<LayoutId>("english");
  const [stepIndex, setStepIndex] = useState(0);
  const [mistypedCode, setMistypedCode] = useState<string | null>(null);

  const layout = keyboardLayouts[layoutId];
  const rows = [layout.upperRow, layout.homeRow, layout.lowerRow];
  const targetCode = layout.practiceSequence[stepIndex % layout.practiceSequence.length];
  const targetLabel = findKeyLabel(layout, targetCode);
  const targetCodeRef = useRef(targetCode);
  const sequenceLengthRef = useRef(layout.practiceSequence.length);
  const visibleCodesRef = useRef(new Set(rows.flat().map((keyDef) => keyDef.code)));
  targetCodeRef.current = targetCode;
  sequenceLengthRef.current = layout.practiceSequence.length;
  visibleCodesRef.current = new Set(rows.flat().map((keyDef) => keyDef.code));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedCode = event.code;

      if (!visibleCodesRef.current.has(pressedCode)) {
        return;
      }

      if (pressedCode === targetCodeRef.current) {
        setMistypedCode(null);
        setStepIndex((current) => (current + 1) % sequenceLengthRef.current);

        return;
      }

      setMistypedCode(pressedCode);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setStepIndex(0);
    setMistypedCode(null);
  }, [layoutId]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_28%),linear-gradient(180deg,_var(--background),_color-mix(in_oklab,var(--background)_88%,white))] px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border bg-card/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Visual Keyboard
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                Build row-based typing layouts
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                The next key to type stays green. If you press a different key,
                that key turns red. Layout rows are defined as arrays, so you
                can swap between English and Hindi without changing the
                component.
              </p>
            </div>
            <div className="flex gap-2">
              {Object.values(keyboardLayouts).map((option) => (
                <Button
                  key={option.id}
                  className="min-w-28"
                  type="button"
                  variant={layoutId === option.id ? "default" : "outline"}
                  onClick={() => setLayoutId(option.id)}
                >
                  {option.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current layout</p>
                <h2 className="text-2xl font-semibold">{layout.name}</h2>
              </div>
              <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-right text-emerald-950">
                <p className="text-xs uppercase tracking-[0.18em]">Type next</p>
                <p className="text-3xl font-semibold">{targetLabel}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 overflow-x-auto">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={cn(
                    "flex gap-2",
                    rowIndex === 1 && "pl-4",
                    rowIndex === 2 && "pl-8",
                  )}
                >
                  {row.map((keyDef) => (
                    <KeyboardButton
                      key={keyDef.code}
                      active={targetCode === keyDef.code}
                      error={mistypedCode === keyDef.code}
                      keyDef={keyDef}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border bg-card p-5 shadow-sm">
            <h2 className="text-xl font-semibold">Practice Sequence</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow the highlighted key. The sequence loops after the last
              item.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {layout.practiceSequence.map((code, index) => (
                <div
                  key={`${code}-${index}`}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm",
                    index === stepIndex % layout.practiceSequence.length
                      ? "border-emerald-600 bg-emerald-100 text-emerald-950"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {findKeyLabel(layout, code)}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
              Row data lives in arrays in `lib/keyboard-layouts.ts`. Add a new
              layout by supplying `upperRow`, `homeRow`, `lowerRow`, and a
              `practiceSequence`.
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
