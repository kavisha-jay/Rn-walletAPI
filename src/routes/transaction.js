import express from "express";
import {
    getTransactionsByUserId, 
    postTransaction,
    deleteTransactionById,
    getSummaryByUserId
} from "../controllers/transaction.js"

const router = express.Router();

router.get('/:userId', getTransactionsByUserId)
 
router.post('/', postTransaction)
 
router.delete('/:id',  deleteTransactionById);
 
router.get('/summary/:userId', getSummaryByUserId)
 
 

export default router;