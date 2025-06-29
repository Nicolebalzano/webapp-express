const handleError = (req, res) => {
    if(process.env.ENVIROMENT === "development"){
        resData.error = err.message;
    }
    return res.status(500).json(res.data)
}
export default handleError;