"use server";
import { getCurrentSession, registerUser } from "@/lib/server/lucia";
import { registrationSchema } from "@/lib/shared/schemas";
import { redirect } from "next/navigation";

export async function createUser(form: FormData) {
    const username = form.get("username") as string;
    const password = form.get("password") as string;
    const passwordConfirm = form.get("passwordConfirm") as string;
    const dateOfBirth = new Date(form.get("dateOfBirth") as string);
    
    const { user } = await getCurrentSession();
    if (user !== null) {
        return redirect("/");
    }

    const data = registrationSchema.parse({ username, password, passwordConfirm, dateOfBirth });

    if (data.password !== data.passwordConfirm) {
        throw new Error("Passwords do not match");
    }
    await registerUser(data.username, data.password, data.dateOfBirth);
    return redirect("/");
}