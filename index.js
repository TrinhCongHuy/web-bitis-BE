const express = require('express')
require('dotenv').config()
const database = require('./src/config/database')
const route = require('./src/routes/index.route')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { configLoginWithGG } = require('./src/config/passport') 
const http = require('http');
const socketIo = require('socket.io');

database.connect()
const app = express()
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3001

io.on('connection', (socket) => {
  console.log('A user connected');

    socket.on('message', (msg) => {
        // Gửi tin nhắn từ client tới admin
        io.emit('message', { content: msg.content, userType: msg.type });
    });

    socket.on('admin message', (msg) => {
        // Gửi tin nhắn từ admin tới client
        io.emit('message', { content: msg.content, userType: msg.type });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const corsOptions ={
    origin:'http://localhost:3000, http://localhost:3000/api/v1', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route(app)
configLoginWithGG()

server.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})