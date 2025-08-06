import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";
import { globalErrhandler, notFound } from "../middleware/globalErrorhandler.js";


// db connect
dbConnect();
const app = express();
app.use(express.json());

app.use(cors({
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));
    

app.use("/api/v1/user", userRoutes);

// global error handler middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
