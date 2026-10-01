import AccessDenied from "@/components/AccessDenied";
import ProfileForm from "@/components/ProfileForm";
import { getStudentSession } from "@/lib/session";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function Profile() {
  const s = await getStudentSession();
  if (!s?.sid) return <AccessDenied />;
  try {
    const student = await db.student.findUnique({ where: { id: s.sid }, select: { name: true, studentId: true, profile: { select: { data: true } } } });
    if (!student) return <AccessDenied />;
    return (
      <main className="container narrow"><h1>My Profile</h1>
        <p className="muted">{student.name} · {student.studentId}</p>
        <ProfileForm values={(student.profile?.data ?? {}) as Record<string, string>} />
      </main>);
  } catch (e) { console.error(e); return <main className="container"><p className="error">Something went wrong. Please try again later.</p></main>; }
}
