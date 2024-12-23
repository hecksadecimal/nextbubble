// Definitions for what permissions are available in the chat system
export const ChatPermissions: { [key: string]: number } = {
    ReadMessage: 1,
    WriteMessage: 2,
    EditMessage: 4,
    DeleteMessage: 8,
    ChangeOwnNickname: 16,
    ChangeNickname: 32,
    KickUser: 64,
    BanUser: 128,
    TransferOwnership: 256,
};

// If a user has one of these, then they are some kind of site admin
export const GlobalPermissions: { [key: string]: number } = {
    ManageChannels: 1,
    ManageUsers: 2,
    ManagePermissions: 4,
    ManageServer: 8,
};

export function permissionsFromDictionary(permissions: { [key: string]: boolean }) {
    let result = 0;
    for (const key in permissions) {
        if (permissions[key]) {
            result |= ChatPermissions[key];
        }
    }
    return result;
}

export function permissionsToDictionary(permissions: number) {
    const result: { [key: string]: boolean } = {};
    for (const key in ChatPermissions) {
        const value = ChatPermissions[key];
        result[key] = (permissions & value) === value;
    }
    return result;
}