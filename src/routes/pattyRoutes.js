import { Router } from "express";
import {
    getPatties,
    getPattyById,
    createPatty,
    deletePatty,
    updatePatty
} from "../controllers/pattyController.js"

const router = Router()

router.get('/patties', getPatties)
router.get('/patties/:id', getPattyById)
router.post('/patties', createPatty)
router.delete('/patties/:id', deletePatty)
router.put('/patties/:id', updatePatty)

export default router