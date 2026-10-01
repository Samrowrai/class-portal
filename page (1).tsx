"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSession, destroySession, getStudentSession } from "@/lib/session";
import { PROFILE_FIELDS } from "@/lib/profileFields";

export type FormState = { error?: string; ok?: boolean } | undefined;
const GENERIC = "Something went wrong. Please try again later.";
// Compared against when the Student ID doesn't exist, so timing doesn't reveal valid IDs.
const DUMMY_HASH = "$2a$12$C6UzMDM.H6dfI/f/IKcEeO5Yt5m0Gq5nYl0w9b1Yb3u6k2VJ9wq1G";

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const studentId = String(fd.get("studentId") ?? "").trim();
  const password = String(fd.get("password") ?? "");
  const name = String(fd.get("name") ?? "").trim();
  if (!name || !studentId || !password || studentId.length > 50 || password.length > 200) return { error: "Invalid Student ID or Password." };
  let sid: string | null = null;
  try {
    const student = await db.student.findUnique({ where: { studentId } });
    const ok = await bcrypt.compare(password, student?.passwordHash ?? DUMMY_HASH);
    if (student && ok) sid = student.id;
  } catch (e) { console.error("login error", e); return { error: GENERIC }; }
  if (!sid) return { error: "Invalid Student ID or Password." };
  await createSession({ role: "student", sid });
  redirect("/home");
}
export async function continueAsVisitor() { await createSession({ role: "visitor" }); redirect("/home"); }
export async function logout() { destroySession(); redirect("/login"); }

export async function saveProfile(_: FormState, fd: FormData): Promise<FormState> {
  const session = await getStudentSession(); // identity comes from the signed cookie, never from the form
  if (!session?.sid) return { error: "Access Denied." };
  const data: Record<string, string> = {};
  for (const f of PROFILE_FIELDS) {
    const v = String(fd.get(f.key) ?? "").trim();
    if (v.length > f.max) return { error: `${f.label} must be at most ${f.max} characters.` };
    data[f.key] = v;
  }
  try {
    await db.profile.upsert({ where: { studentRef: session.sid }, update: { data }, create: { studentRef: session.sid, data } });
  } catch (e) { console.error("saveProfile error", e); return { error: GENERIC }; }
  revalidatePath("/students/bio"); revalidatePath("/profile");
  return { ok: true };
}
