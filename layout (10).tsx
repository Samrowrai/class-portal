import AccessDenied from "@/components/AccessDenied";
import { getStudentSession } from "@/lib/session";
import { db } from "@/lib/db";
import { PROFILE_FIELDS } from "@/lib/profileFields";
export const dynamic = "force-dynamic";
export default async function Bio() {
  if (!(await getStudentSession())) return <AccessDenied />;
  try {
    const students = await db.student.findMany({ select: { id: true, name: true, studentId: true, profile: { select: { data: true } } }, orderBy: { name: "asc" } });
    return (
      <main className="container"><h1>Bio of All Students</h1>
        <div className="grid">{students.map((s) => {
          const d = (s.profile?.data ?? {}) as Record<string, string>;
          return (
            <article className="card" key={s.id}><h3>{s.name}</h3><small className="muted">{s.studentId}</small>
              {PROFILE_FIELDS.map((f) => d[f.key] ? <p key={f.key}><strong>{f.label}:</strong> {d[f.key]}</p> : null)}
            </article>);
        })}</div>
      </main>);
  } catch (e) { console.error(e); return <main className="container"><p className="error">Something went wrong. Please try again later.</p></main>; }
}
