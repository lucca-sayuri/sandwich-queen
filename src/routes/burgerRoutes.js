import { Router } from "express";
import {
    getBurgers,
    getBurgerById,
    createBurger,
    deleteBurger,
    updateBurger
} from "../controllers/burgerController.js"

const router = Router()

router.get('/burgers', getBurgers)
router.get('/burgers/:id', getBurgerById)
router.post('/burgers', createBurger)
router.delete('/burgers/:id', deleteBurger)
router.put('/burgers/:id', updateBurger)

export default router