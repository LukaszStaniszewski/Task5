const path = require("path")
const  express = require( "express")
const mongoose = require( "mongoose")
const cors = require( "cors")
require("dotenv").config({debug: true})
const setCurrentUser = require("./middleware/checkCurrentUser")

const userController = require("./controllers/user.controller")
const messageController = require("./controllers/message.controller")

mongoose.connect(process.env.MONGO_URL_CLOUD).
catch(error => console.error(error));

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connected'))

const app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  // origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: false,
}));
app.use(setCurrentUser)
  
app.get("/user" , userController.sendUser)

app.post("/" , userController.createAndAuthenticateUser)

app.get("/api/message", messageController.sendMessages)

app.post("/api/message", messageController.createMessage)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  
  app.get('*', (req, res) =>
  res.sendFile(
    path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))