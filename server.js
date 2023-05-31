const connectDatabasae = require('./db');
const app = require('./app')
const PORT=process.env.PORT||6000


//unhandled uncatch exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to uncaught exception rejection`)
    server.close(() => {
        process.exit(1)
    })
})
connectDatabasae();


const server = app.listen(PORT, () => {
    console.log(`the server is running at http://localhost:${PORT}`)
})

//unhandled promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(err)
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`)
    server.close(() => {
        process.exit(1)
    })
}) 