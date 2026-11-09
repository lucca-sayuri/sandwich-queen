const prisma = require('prisma')

async function createUser(req, res) {
    try {
        const { nome, email } = req.body

        if (!nome || !email) {
            return res.status(400).json({ erro: "Nome e email são obrigatorios"})
        }

        const newUser = await 
    } catch {

    }
}