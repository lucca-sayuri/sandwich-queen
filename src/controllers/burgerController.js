import { prisma } from "../prisma.js"

export async function getBurgers(req, res) {
    try {
        const burgers = await prisma.burger.findMany({
            include: { cheese: true, patty: true }
        })
        return res.status(200).json(burgers)
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function getBurgerById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const burger = await prisma.burger.findUnique({
            where: { id },
            include: { cheese: true, patty: true }
        })
        if (!burger) return res.status(404).json({ erro: "Hamburguer nao encontrado" })
        return res.status(200).json(burger)
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function createBurger(req, res) {
    try {
        const { nome, preco, desc, cheeseId, pattyId } = req.body

        if (!nome || !preco) {
            return res.status(400).json({ erro: "Nome e preco sao obrigatorios" })
        }

        const newBurger = await prisma.burger.create({
            data: {
                nome,
                preco: parseFloat(preco),
                desc: desc || "",
                cheeseId: cheeseId || null,
                pattyId: pattyId || null
            }
        })

        return res.status(201).json(newBurger)
    } catch (erro) {
        if (erro.code == "P2003") {
            return res.status(400).json({ erro: "Id do queijo ou patty nao existe" })
        }
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function deleteBurger(req, res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.burger.delete({ where: { id } })
        return res.status(204).json()
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function updateBurger(req, res) {
    try {
        const id = parseInt(req.params.id)
        const { nome, preco, desc, cheeseId, pattyId } = req.body

        const updatedBurger = await prisma.burger.update({
            where: { id },
            data: {
                nome: nome || undefined,
                preco: preco ? parseFloat(preco) : undefined,
                desc: desc || undefined,
                cheeseId: cheeseId !== undefined ? cheeseId : undefined,
                pattyId: pattyId !== undefined ? pattyId : undefined
            }
        })

        return res.status(200).json(updatedBurger)
    } catch (erro) {
        if (erro.code == "P2003") {
            return res.status(400).json({ erro: "Id do queijo ou patty nao existe" })
        }
        return res.status(500).json({ erro: "erro interno" })
    }
}