const express = require("express")
const app = express()
const csrf = require("csurf")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const { environment } = require("./config")
const indexRouter = require("./routes")
const usersRouter = require("./routes/api/users")
const sessionRouter = require("./routes/api/session")
const {ValidationError} = require("sequelize")
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
app.use("/users",usersRouter)
app.use("/session",sessionRouter)


app.use((req,res,next)=>{
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
})


app.use((err,req,res,next)=>{
  if(err instanceof ValidationError){
    err.errors=err.errors.map(e=>e.message)
    err.title = "Validation Error"
  }
  next(err)
})

app.use((err,req,res,next)=>{
  res.status(err.status||500)
  console.error(err)
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
})












module.exports = app
