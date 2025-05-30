import express from "express";
import costumersRoutes from "./src/routes/costumers.js"
import registerCustomers from "./src/routes/registerCostumers.js"
import gamesRoutes from "./src/routes/games.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/costumers", costumersRoutes);
app.use("/api/registerCustomers", registerCustomers);

app.use("/api/games", gamesRoutes);

export default app;