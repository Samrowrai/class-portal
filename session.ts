import Navbar from "@/components/Navbar";
import { logout } from "@/app/actions";
import { getSession } from "@/lib/session";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSession();
  return (
    <>
      <Navbar />
      {children}
      <footer className="footer">
        <span>{s?.role === "student" ? "Logged in as student" : "Browsing as visitor"}</span>
        <form action={logout}><button className="link-btn">{s?.role === "student" ? "Log out" : "Exit visitor mode"}</button></form>
      </footer>
    </>
  );
}
