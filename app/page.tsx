import prisma from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      we have {users.length} users
    </div>
  );
}