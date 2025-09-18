import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      <ModeToggle />
      we have {users.length} users
      <Button className="" variant={"outline"} size={"icon"}>Save and next</Button>
    </div>
  );
}