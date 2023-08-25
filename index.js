const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());


app.use(cors());
app.use(errorHandler);

app.use("/auth", require("./routes/authRouter"));
app.use("/user", require("./routes/userRouter"));






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
