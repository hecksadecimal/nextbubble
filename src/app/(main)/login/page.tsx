import { getCurrentSession, loginUser } from "@/lib/server/lucia";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    username: z.string().min(3).max(16),
    password: z.string().min(8).max(128),
});

export default async function Page() {
    async function login(form: FormData) {
        "use server";
        const username = form.get("username") as string;
        const password = form.get("password") as string;
        const { user } = await getCurrentSession();
        if (user !== null) {
            return redirect("/");
        }

        const data = schema.parse({ username, password });

        await loginUser(data.username, data.password);
        return redirect("/");
    }

    return (
        <div>
            <h1>Login</h1>
            <form action={login}>
                <label>
                    Username
                    <input type="text" name="username" required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}