


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
        const status = err?.status ?? err?.statusCode ?? 500
        let message = err.message ?? "internal server error"
        if (err?.name == "ValidationError") {
            const { details } = err
            message = details?.body?.[0]?.message ?? "internal server error"
        }
        return res.status(status).json({
            message, 
        })
    })
}



module.exports = {
    ErrorHandel,
    ErrorNotFound
}