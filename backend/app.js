const express = require("express")
const app = express()
const csrf = require("csurf")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const { environment } = require("./config")
const indexRouter = require("./routes")
let isProduction = environment === "production"

app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json())

if(!isProduction){
    app.use(cors())
}
app.use(helmet({contentSecurityPolicy:false}))
app.use(
    csrf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
);

app.use("/",indexRouter)


module.exports = app
