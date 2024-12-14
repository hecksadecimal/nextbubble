import Image from "next/image";
import { getCurrentSession } from "@/lib/server/lucia";
import LogoutButton from "@/app/_components/client/LogoutButton";
import { permissionsFromDictionary, permissionsToDictionary, ChatPermissions } from "@/lib/shared/permissions";

export default async function Home() {
  const { user } = await getCurrentSession();
  const permissions = {
    ReadMessage: true,
    WriteMessage: true,
    EditMessage: false,
    DeleteMessage: true,
    ChangeOwnNickname: true,
    ChangeNickname: true,
    KickUser: true,
    BanUser: true,
    TransferOwnership: true,
  }
  const permissionsInt = permissionsFromDictionary(permissions);
  const permissionsDict = permissionsToDictionary(permissionsInt);

  return (
    <div>
      {permissionsInt}
      <pre>{JSON.stringify(permissionsDict, null, 2)}</pre>
    </div>
  );
}
