import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'

dotenv.config({ path: new URL("../.env", import.meta.url) });

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
export const prismaClient = new PrismaClient({ adapter })

