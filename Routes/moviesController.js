import connection from "../db.js"

const index = (req, res, next) => {
    const search = req.query.search;
    let sql = `SELECT * FROM movies`
    const params = [];
    if(search) {
        sql += `
        WHERE movies.title LIKE ?
        `;
        params.push(`%${search}%`);
    }else{
        sql = `SELECT * FROM movies`
    }
  
    connection.query(sql, params,  (err, results) => {
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
    const slug = req.params.slug;
    const MovieSql = `SELECT * FROM movies WHERE movies.slug = ?`
    const reviewSql = `SELECT *
        FROM reviews
        WHERE reviews.movie_id = ?`
    connection.query(MovieSql, [slug], (err, moviesResults) => {
        if (err) {
             return next(new Error(err))
        }
        if (moviesResults.length === 0) {
            res.status(404).json({
                error: "Movie non trovato"
            })
        } else {
            connection.query(reviewSql, [moviesResults[0].id], (err, reviewResults) => {
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
const storeReview = (req, res, next) => {
const {id} = req.params;
console.log(id)
const movieSql = `
SELECT *
FROM movies
WHERE id = ?
`;
connection.query(movieSql, [id], (err, movieResults) => {
    if(movieResults.length === 0) {
        return res.status(404).json({
            error: "Film non trovato",
        })
    }
    const {name, text, vote} = req.body;
 const newReviewSql = `
 INSERT INTO reviews (movie_id, name, vote, text)
 VALUES (?, ?, ?, ?)
 `
 connection.query(newReviewSql, [id, name, vote, text], (err, results) => {
     if (err) {
             return next(new Error(err))
        }
        return res.status(201).json({
            message: "review created",
            id:results.insertId,
        })
 })
})
}
export default {
    index,
    show,
    storeReview,
};