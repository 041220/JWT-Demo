const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("CONNECTED TO MONGO DB"))
    .catch((error) => console.log("Failed to connect to MongoDB", error));

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
