import { getCurrentSession } from "@/lib/server/lucia";
import { redirect } from "next/navigation";

export default async function Page() {
	const { user } = await getCurrentSession();
	if (user === null) {
		return redirect("/login");
	}

	async function action() {
		"use server";
		const { user } = await getCurrentSession();
		if (user === null) {
			return redirect("/login");
		}
	}

    return (
        <div>
            <h1>Test Page</h1>
            <h2>Hello, {user.id}!</h2>
        </div>
    )
}