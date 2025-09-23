import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center py-6">
      <Image
        alt="Potatyping"
        height={600}
        src="/right-resting-hand.png"
        width={600}
      />
    </div>
  );
}
