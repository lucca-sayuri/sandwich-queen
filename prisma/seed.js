import { PrismaClient } from "@prisma/client";
import process from "node:process";
const prisma = new PrismaClient()

async function seed() {
    await prisma.patty.createMany({
        data: [
            { nome: "carne bovina" },
            { nome: "frango" },
            { nome: "peixe" }
        ]
    })

    await prisma.cheese.createMany({
        data: [
            { id: 1, nome: "mussarela" },
            { id: 2, nome: "cheddar" },
            { id: 3, nome: "prato" },
            { id: 4, nome: "gorgonzola" },
            { id: 5, nome: "nenhum" }
        ]
    })

    await prisma.burger.create({
        data: {
            nome: "cheeseburger",
            preco: 8.50,
            desc: "Hambúrger básico com carne, cheddar e alface.",
            cheeseId: 2,
            pattyId: 1
        }
    })

    await prisma.$disconnect();
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
