import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>hi, there</h1>
      <ModeToggle />
      <Button>Click me</Button>
    </div>
  );
}
