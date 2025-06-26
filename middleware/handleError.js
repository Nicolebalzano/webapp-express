const handleError = (req, res) => {
    return res.status(500).json({
        status:"fail",
        message:"Qualcosa è andato storto"
    })
}
export default handleError;