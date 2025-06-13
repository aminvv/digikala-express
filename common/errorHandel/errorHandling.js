


function ErrorNotFound(app) {
    app.use((req, res, next,) => {

        return res.status(404).json({
            statusCode: res.statusCode,
            error: {
                type: 'NotFound',
                message: "notfound " + req.url + "  router"
            }
        })
    })

}




function ErrorHandel(app) {
    app.use((err, req, res, next) => {
        return res.json({
            statusCode: res.statusCode || 500,
            message: (err.message || "internal server error")
        })
    })
}



module.exports={
    ErrorHandel,
    ErrorNotFound
}