import { execSync } from "child_process";
import prisma from "../config/prismaClient";
import { afterAll, beforeAll } from "vitest";

beforeAll(async () => {
    execSync("npx prisma db push --force-reset");
});

afterAll(async () => {
    await prisma.$disconnect();
})