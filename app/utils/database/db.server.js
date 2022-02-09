import { PrismaClient } from "@prisma/client";

let prisma;

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient();
    global.__prisma.$connect();
  }
  prisma = global.__prisma;
}

export { prisma };
