import { auth } from "@/lib/auth"; 
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(!session) {

    redirect('/login');

  }

  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
}
