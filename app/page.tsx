"use client";
import { useTypingStore } from "@/lib/store/useTypingStore";
import { Input } from "@/components/ui/input";

export default function TypingInput() {
  const { layout } = useTypingStore();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const mapped = layout[e.key];

    if (mapped) {
      e.preventDefault();
      // insert Hindi char instead of English
    }
  };

  return (
    <>
      <Input type="text" onKeyDown={handleKeyPress} />
    </>
  );
}
