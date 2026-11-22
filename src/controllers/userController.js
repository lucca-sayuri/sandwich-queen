import { prisma } from "../prisma.js"

export async function createUser(req, res) {
    try {
        const { nome, email } = req.body

        if (!nome || !email) {
            return res.status(400).json({ erro: "Nome e email são obrigatorios"})
        }

        const newUser = await prisma.user.create({
            data: {
                nome: nome,
                email: email
            }
        })

        return res.status(201).json(newUser)
    } catch (erro) {
        if (erro.code == "P2002") {
            return res.status(400).json({ erro: 'este email ja esta cadastrado'})
        }
        return res.status(500).json({ erro: "erro interno"})
    }
}

export async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany()
        return res.status(200).json(users)
    } catch (erro) {
        console.error("getUsers error:", erro)
        return res.status(500).json({ erro: "erro interno"})
    }
}

export async function getUserById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) return res.status(404).json({ erro: "Usuario nao encontrado" })
        return res.status(200).json(user)
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno"})
    }
}

export async function deleteUser(req, res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.user.delete({ where: { id } })
        return res.status(204).json()
    } catch (erro) {
        return res.status(500).json({ erro: "erro interno"})
    }
}

export async function updateUser(req, res) {
    try {
        const id = parseInt(req.params.id)
        const { nome, email } = req.body
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { nome, email }
        })
        return res.status(200).json(updatedUser)
    } catch (erro) {
        if (erro.code == "P2002") {
            return res.status(400).json({ erro: 'este email ja esta cadastrado'})
        }
        return res.status(500).json({ erro: "erro interno"})
    }
}