const express = require('express')
const app = express ()
const cors = require("cors")


app.use(express.json())
app.use(cors())

const managerRoute = require('./routes/manager.route')
const jobRoute = require('./routes/job.route')

app.get("/", (req, res)=> {
    res.send('Server is running')
})

app.use("/manager",managerRoute)
app.use("/jobs",jobRoute)

module.exports = app