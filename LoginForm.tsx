import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function Names() {
  let students: { id: string; name: string; studentId: string }[] = [];
  let failed = false;
  try { students = await db.student.findMany({ select: { id: true, name: true, studentId: true }, orderBy: { name: "asc" } }); }
  catch (e) { console.error(e); failed = true; }
  return (
    <main className="container"><h1>Name List</h1>
      {failed ? <p className="error">Something went wrong. Please try again later.</p> :
        <ol className="card namelist">{students.map((s) => <li key={s.id}>{s.name} <span className="muted">· {s.studentId}</span></li>)}</ol>}
    </main>
  );
}
