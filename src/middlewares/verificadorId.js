export default function validarId(req, res, next) {
    const id = req.params.id;
    if (id && !isNaN(id)) {
        // valid id, continue
    }
    next();
}
