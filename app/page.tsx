"use client";
import { useTypingStore } from "@/lib/store/useTypingStore";

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
      {/* <Input type="text" onKeyDown={handleKeyPress} /> */}
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
        asperiores debitis iure suscipit, odit saepe magnam, ut reprehenderit ea
        Optio aut repudiandae dignissimos, odio perferendis eaque itaque.
      </div>
    </>
  );
}
