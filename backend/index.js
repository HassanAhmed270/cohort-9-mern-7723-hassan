const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your exact frontend URL
  optionsSuccessStatus: 200
};
(async () => {
    await connectDB();
   
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(cors(corsOptions));
   

    app.use("/user", userRoutes);

    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: "Route not found"
        });
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})();