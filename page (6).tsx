import AccessDenied from "@/components/AccessDenied";
import { getStudentSession } from "@/lib/session";
import { notices } from "@/lib/config";
export default async function Notices() {
  if (!(await getStudentSession())) return <AccessDenied />;
  return (
    <main className="container"><h1>Notices</h1>
      <div className="grid">{notices.map((n, i) => <article className="card" key={i}><small className="muted">{n.date}</small><h3>{n.title}</h3><p>{n.body}</p></article>)}</div>
    </main>
  );
}
