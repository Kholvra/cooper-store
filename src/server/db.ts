import { PrismaClient } from "../../generated/prisma";

const nodeEnvironment = process.env.NODE_ENV ?? "development";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      nodeEnvironment === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (nodeEnvironment !== "production") globalForPrisma.prisma = db;

