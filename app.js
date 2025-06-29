//  `` 
import connection from "./db.js";
import express from "express";
import moviesRouter from "./Routes/movies.js";
import notFound from "./middleware/notFound.js";
import handleError from "./middleware/handleError.js";
import imagePath from "./middleware/imagePath.js";
import cors from 'cors';

const app = express();
const port = process.env.SERVER_PORT;
app.use(cors({
    origin :process.env.FE_URL,
}))
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.json({
       data:"Benvenuti nelle API dei movies"
    })
})
app.use("/movies", imagePath, moviesRouter )
app.use(notFound)
app.use(handleError)


app.listen(port, () => {
console.log( `Server in ascolto sulla porta ${port}` )
})
