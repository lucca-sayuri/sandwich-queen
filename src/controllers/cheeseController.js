import { prisma } from "../prisma.js"

export async function getCheeses(req, res) {
    try {
        const cheeses = await prisma.cheese.findMany()
        return res.status(200).json(cheeses)
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno"})
    }
}

export async function getCheeseById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const cheese = await prisma.cheese.findUnique({ where: { id } })
        if (!cheese) return res.status(404).json({ erro: "Queijo nao encontrado" })
        return res.status(200).json(cheese)
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno"})
    }
}

export async function createCheese(req, res) {
    try {
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json({ erro: "Nome é obrigatorio" })
        }

        const newCheese = await prisma.cheese.create({
            data: { nome }
        })

        return res.status(201).json(newCheese)
    } catch (erro) {
        if (erro.code == "P2002") {
            return res.status(400).json({ erro: 'este nome ja esta cadastrado' })
        }
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function deleteCheese(req, res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.cheese.delete({ where: { id } })
        return res.status(204).json()
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function updateCheese(req, res) {
    try {
        const id = parseInt(req.params.id)
        const { nome } = req.body
        const updatedCheese = await prisma.cheese.update({
            where: { id },
            data: { nome }
        })
        return res.status(200).json(updatedCheese)
    } catch (erro) {
        if (erro.code == "P2002") {
            return res.status(400).json({ erro: 'este nome ja esta cadastrado' })
        }
        return res.status(500).json({ erro: "erro interno" })
    }
}