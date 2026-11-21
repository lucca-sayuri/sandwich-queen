import { prisma } from "../prisma.js"

export async function getPatties(req, res) {
    try {
        const patties = await prisma.patty.findMany()
        return res.status(200).json(patties)
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function getPattyById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const patty = await prisma.patty.findUnique({ where: { id } })
        if (!patty) return res.status(404).json({ erro: "Patty nao encontrada" })
        return res.status(200).json(patty)
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function createPatty(req, res) {
    try {
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json({ erro: "Nome é obrigatorio" })
        }

        const newPatty = await prisma.patty.create({
            data: { nome }
        })

        return res.status(201).json(newPatty)
    } catch (erro) {
        if (erro.code == "P2002") {
            return res.status(400).json({ erro: 'este nome ja esta cadastrado' })
        }
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function deletePatty(req, res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.patty.delete({ where: { id } })
        return res.status(204).json()
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno" })
    }
}

export async function updatePatty(req, res) {
    try {
        const id = parseInt(req.params.id)
        const { nome } = req.body
        const updatedPatty = await prisma.patty.update({
            where: { id },
            data: { nome }
        })
        return res.status(200).json(updatedPatty)
    } catch (erro) {
        if (erro.code == "P2002") {
            return res.status(400).json({ erro: 'este nome ja esta cadastrado' })
        }
        return res.status(500).json({ erro: "erro interno" })
    }
}