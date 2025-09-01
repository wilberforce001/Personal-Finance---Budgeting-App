import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categories.js'
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/API', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use("/api/categories", categoryRoutes);
app.use('/api/users', userRoutes);

// Serve frontend
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

if (process.env.NODE_ENV === "production") {
    const frontendPath = ath.join(_dirname, "../frontend/build");
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => 
    res.sendFile(path.resolve(frontendPath, "index.html")));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));