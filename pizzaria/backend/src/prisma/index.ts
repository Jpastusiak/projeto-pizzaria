import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL!}`;
const adapter = new PrismaPg({connectionString});

const prismaClient = new PrismaClient({ adapter }); //carregar o postgres

//prismaClient vai servir acessar o banco de dados em outro arquivo
export default prismaClient;