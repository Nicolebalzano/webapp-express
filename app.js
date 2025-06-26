//  `` 
import connection from "./db.js";
import express from "express";
import moviesRouter from "./Routes/movies.js";
import notFound from "./middleware/notFound.js";

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.json({
       data:"Benvenuti nelle API dei movies"
    })
})
app.use("/movies", moviesRouter )
app.use(notFound)


app.listen(port, () => {
console.log( `porta in ascolto sulla porta ${port}` )
})
