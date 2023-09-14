const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");


connectDb();
const app = express();
app.use(express.static(__dirname));

const port = process.env.PORT || 5000;
app.use(express.json());


const postRouter = require('./routes/userRouter'); 


app.use(cors());
app.use(errorHandler);

app.use("/auth", require("./routes/authRouter"));
app.use("/user", postRouter );



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
