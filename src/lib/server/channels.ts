import { Channel } from "better-sse";

export const broadcastSessionCount = (channel: Channel) => {
    channel.broadcast(channel.sessionCount, "session-count");
};

export const channels: { [key: string]: Channel } = {};