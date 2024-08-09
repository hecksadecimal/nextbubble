import { PrismaClient } from "@prisma/client";
import { Redis } from "ioredis";

import { env } from "@/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const createRedisClient = () => new Redis(env.REDIS_URL)

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createRedisClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient();
export const redis = globalForRedis.redis ?? createRedisClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
if (env.NODE_ENV !== "production") globalForRedis.redis = redis;
