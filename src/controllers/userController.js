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