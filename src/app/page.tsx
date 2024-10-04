import getServerSession  from "next-auth";
import { nextAuthConfig } from "@/lib/auth";


export default async function Home() {
  // const session = await getServerSession(nextAuthConfig);

  // console.log('current session: ', JSON.stringify(session));

  return (
    <h1 className="font-inter">Hello world</h1>
  );
}
