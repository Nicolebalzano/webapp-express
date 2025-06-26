import connection from "../db.js"

const index = (req, res) => {
    const sql = `SELECT * FROM movies`
    connection.query(sql, (err, results) => {
        if (err) {
            console.log("errore")
        } else {
            res.json({
                data: results,
            })
        }
    })

}
const show = (req, res) => {
    const id = req.params.id;
    const MovieSql = `SELECT * FROM movies WHERE id = ?`
    const reviewSql = `SELECT *
        FROM reviews
        WHERE reviews.movie_id = ?`
    connection.query(MovieSql, [id], (err, booksResults) => {
        if (err) {
            console.log("error")
        }
        if (booksResults.length === 0) {
            res.status(404).json({
                error: "Movie non trovato"
            })
        } else {
            connection.query(reviewSql, [id], (err, reviewResults) => {
                res.json({
                data: {
                    ...reviewResults[0],
                    reviews : reviewResults,
                }
            }) 
            })
           
        }
    })

}
export default {
    index,
    show
};