import express from "express";
import dotenv from "dotenv";
import initDB from "./config/db.js"
import rateLimiterMiddleware from "./middleware/limiter.js";
import transaction from "./routes/transaction.js";
import job from "./config/cron.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();


if(process.env.NODE_ENV==="production")job.start();
//middleware
app.use(express.json())
app.use(rateLimiterMiddleware)

//router
app.use('/api/transactions', transaction);

app.get('/api/health', (req, res) => {
  res.status(200).json({status:"ok"})
})


console.log("PORT:", process.env.PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
}).catch((error) => {
  console.error("Failed to initialize database and start server:", error);
  process.exit(1);
});