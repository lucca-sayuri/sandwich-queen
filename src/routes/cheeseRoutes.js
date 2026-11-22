import { Router } from "express";
import {
    getCheeses,
    getCheeseById,
    createCheese,
    deleteCheese,
    updateCheese
} from "../controllers/cheeseController.js"

const router = Router()

router.get('/cheeses', getCheeses)
router.get('/cheeses/:id', getCheeseById)
router.post('/cheeses', createCheese)
router.delete('/cheeses/:id', deleteCheese)
router.put('/cheeses/:id', updateCheese)

export default router