import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
dotenv.config();
import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middleware/globalErrorhandler.js";
import adminRoutes from "../routes/adminRoutes.js";
import candidateRoutes from "../routes/candidateRoutes.js";
import employeeRoutes from "../routes/employeeRoutes.js";
import attendanceRoutes from "../routes/attendanceRoutes.js";
// import attendanceRoutes from "../routes/attendanceRoutes.js";
// import leaveRoutes from "../routes/leaveRoutes.js";


// db connect
dbConnect();
const app = express();


app.use(cors({
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));


    // ========middleware======
app.use(morgan("dev"));

// //parse incomming json data Increase JSON body size limit to 10MB
app.use(express.json({ limit: "100mb" }));
app.use("/uploads", express.static("uploads"));


app.use("/api/v1/admin",adminRoutes );
app.use("/api/v1/candidate",candidateRoutes);
app.use("/api/v1/employee",employeeRoutes );
app.use("/api/v1/attendance",attendanceRoutes );
// app.use("/api/v1/leave",leaveRoutes );

// global error handler middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
