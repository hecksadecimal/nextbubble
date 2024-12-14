"use server";
import { logoutUser } from "@/lib/server/lucia";

export default async function logout() {
    await logoutUser();
}