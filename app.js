const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const route = require('./router/tasks')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', route)
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () =>{
    try {
        await connectDB(process.env.CONNECTION_STRING)
        app.listen(port, () =>{
            console.log(`Server is lisetning on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()