import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
})