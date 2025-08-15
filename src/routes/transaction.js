import express from "express";
import {
    getTransactionsByUserId, 
    postTransaction,
    deleteTransactionById,
    getSummaryByUserId
} from "../controllers/transaction.js"

const router = express.Router();

router.get('/', getTransactionsByUserId)
 
router.post('/post', postTransaction)
 
router.delete('/:id',  deleteTransactionById);
 
router.get('/summary', getSummaryByUserId)
 
 

export default router;