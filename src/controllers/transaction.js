import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
        try {
         
         const transaction = await sql`
         SELECT * FROM transactions ORDER BY create_at DESC
         `
     
         res.status(200).json(transaction)
        } catch (error) {
         console.log("Error getting the transaction error", error);
         res.status(500).json({message:"Internal server error"})
        }
}

export async function postTransaction(req, res) {
        try {
            const {title, amount, category} = req.body;
    
            if(!title || !category || amount===undefined) {
                return res.status(400).json({message:"All fields are required"})
            } 
    
            const transaction = await sql`
            INSERT INTO transactions( title, amount, category)
            VALUES ( ${title}, ${amount}, ${category})
            RETURNING *
            `
    
            console.log(transaction)
            res.status(201).json(transaction[0])
        } catch (error) {
            console.log("Error creating the transaction error", error);
            res.status(500).json({message:"Internal server error"})
        }
}

export async function deleteTransactionById (req, res) {
    try {
     const {id} = req.params;
 
     // Validate that id is a valid number
     const transactionId = parseInt(id);
     if (isNaN(transactionId)) {
         return res.status(400).json({message: "Invalid transaction ID. Must be a number."});
     }
 
     const result = await sql`
      DELETE FROM transactions WHERE id = ${transactionId} RETURNING *
     `
 
     if(result.length === 0){
         return res.status(404).json({message: "Transaction not found"});
     }
 
     res.status(200).json({message:"Transaction deleted successfully"})
    } catch (error) {
     console.log("Error deleting the transaction error", error);
     res.status(500).json({message:"Internal server error"})
    }
 }


export async function getSummaryByUserId (req, res)  {
    try {
        const {userId} = req.params;
        const balanceResult = await sql`
         SELECT COALESCE(SUM(amount), 0) as balance FROM transactions 
        `

        const incomeResult =  await sql`
         SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE amount > 0
        `

        const expensesResult =  await sql`
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE amount < 0
       `

       res.status(200).json({
        balance:balanceResult[0].balance,
        income:incomeResult[0].income,
        expenses:expensesResult[0].expenses
       })
    } catch (error) {
        console.log("Error getting the summary", error);
        res.status(500).json({message:"Internal server error"})
    }
}