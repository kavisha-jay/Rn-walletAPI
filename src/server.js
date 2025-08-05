import express from "express";
import dotenv from "dotenv";
import initDB from "./config/db.js"
import rateLimiterMiddleware from "./middleware/ratelimiter.js";
import transaction from "./routes/transaction.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

//middleware
app.use(express.json())
app.use(rateLimiterMiddleware)

//router
app.use('/api/transactions', transaction);




console.log("PORT:", process.env.PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
}).catch((error) => {
  console.error("Failed to initialize database and start server:", error);
  process.exit(1);
});