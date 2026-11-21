function verificaHamburguer(req, res, next) {
    const { nome, preco, desc } = req.body;
    if (!nome || typeof nome !== String) {
        return res.status(400).json({
            erro: "Nome inválido"
        })
    }
    if (!desc || typeof desc !== String || desc.trim() === "")
        return res.status(400).json({
            erro: "Descrição nula ou vazia"
        })
    
}