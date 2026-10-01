import { redirect } from "next/navigation";
export default function Root() { redirect("/home"); } // middleware sends logged-out users to /login
