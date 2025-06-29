import connection from "../db.js"

const index = (req, res, next) => {
    const sql = `SELECT * FROM movies`
    connection.query(sql, (err, results) => {
        if (err) {
           return next(new Error(err))
        } else {
            const movies = results.map((curMovie) => {
                return {
                    ...curMovie,
                    image : curMovie.image ? `${req.imagePath}/${curMovie.image}` : null,
                }
            })
            res.json({
                data: movies,
            })
        }
    })

}
const show = (req, res, next) => {
    const id = req.params.id;
    const MovieSql = `SELECT * FROM movies WHERE id = ?`
    const reviewSql = `SELECT *
        FROM reviews
        WHERE reviews.movie_id = ?`
    connection.query(MovieSql, [id], (err, moviesResults) => {
        if (err) {
             return next(new Error(err))
        }
        if (moviesResults.length === 0) {
            res.status(404).json({
                error: "Movie non trovato"
            })
        } else {
            connection.query(reviewSql, [id], (err, reviewResults) => {
              if (err) {
             return next(new Error(err))
        }else{
            res.json({
                data: {
                    ...moviesResults[0],
                    image: `${req.imagePath}/${moviesResults[0].image}` ,
                    reviews : reviewResults,
                }
            }) 
        }
                
            })
           
        }
    })

}
export default {
    index,
    show
};