import AccessDenied from "@/components/AccessDenied";
import { getStudentSession } from "@/lib/session";
import { groupLinks } from "@/lib/config";
export default async function Groups() {
  if (!(await getStudentSession())) return <AccessDenied />;
  return (
    <main className="container"><h1>Groups &amp; Links</h1>
      <div className="grid">{groupLinks.map((g) => <a className="card link-card" key={g.url} href={g.url} target="_blank" rel="noopener noreferrer"><h3>{g.title}</h3><p className="muted">{g.description}</p></a>)}</div>
    </main>
  );
}
