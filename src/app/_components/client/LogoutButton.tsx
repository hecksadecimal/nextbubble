import logout from "@/app/_actions/logout";

export default async function LogoutButton() {
    return (
        <form action={logout}>
            <button className="logout-button" type="submit">Logout</button>
        </form>
    )
}