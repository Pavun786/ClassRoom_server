// const express = require("express")
// const app = express()
// const dotenv = require("dotenv")
// const cors = require("cors");
// const DbConnection = require("./DB_Connection/Db");
// const userRoutes = require("./Routes/UserRoute")
// const courseRoutes = require("./Routes/CourseRoute")
// const studentRoutes = require("./Routes/StudentRoute")
// const sylabusRoutes = require("./Routes/SylbusRoute")
// const accessRoutes = require("./Routes/AccessRoute")
// const taskRoutes = require("./Routes/TaskRoute")
// const taskReviewRoutes = require("./Routes/TaskReviewRoute")
// const queryRoutes = require("./Routes/QueryRoute")
// const conversationRoutes = require("./Routes/ConversationRoute")
// const messageRoutes = require("./Routes/MessageRoute")


// dotenv.config;

// app.use(express.json())
// app.use(cors("*"))

// const port = process.env.PORT || 4200 ;

// DbConnection()

// app.use("/user",userRoutes)
// app.use("/course",courseRoutes)
// app.use("/student",studentRoutes)
// app.use("/sylabus",sylabusRoutes)
// app.use("/task",taskRoutes)
// app.use("/review",taskReviewRoutes)
// app.use("/query",queryRoutes)
// app.use("/conversation",conversationRoutes)
// app.use("/message",messageRoutes)

// // app.use("/access",accessRoutes)

// app.get("/",(req,res)=>{
//     res.send("Welcome to zenclass app..!")
// })

// const server = app.listen(port,()=>{
//     console.log(`The server run on port ${port}`)
// })

// const io = require("socket.io")(server,{
//     cors :{
//         origin : "http://localhost:3000"
//     }
// })

// let users = [];


// // const addUser = (userId,conversationId,socketId)=>{
// //      !users.some((user)=> user.userId === userId && user.conversationId === conversationId) && 
// //      users.push({userId,conversationId,socketId})
// // }
// const addUser = (userId,socketId)=>{
//     console.log(userId,socketId)
//     !users.some((user)=> user.userId === userId )&& 
//     users.push({userId,socketId})
// }

// const removeUser = (socketId)=>{
//     users=users.filter((user)=>user.socketId !== socketId)
// }

// // const getUser = (userId)=>{
// //     return users.find((user)=> user.userId === userId && user.conversationId === conversationId )
// // }

// const getUser = (userId)=>{
//     console.log(userId)
//     console.log("users",users)
//     return users.find((user)=> user.userId === userId )
// }

// const getRoomUsers = (conversationId) => {
//     return users.filter(e => e.conversationId === conversationId)
// }

// io.on("connection",(socket)=>{
//     console.log("connection established")
//    // const socketId = socket.id
//     io.emit("welcome","hello this is socket server")

    

//     socket.on("addUser",(userId)=>{
//         console.log("Add")
//         console.log("2",userId,socket.id)
//         addUser(userId,socket.id)
//         io.emit("getUsers",users)
        
//         //socket.join(conversationId)
       
//        // io.to(conversationId).emit('roomMembers', getRoomUsers(conversationId))
//     }) 


//     socket.on("sendMessage",({senderId,receiverId,text})=>{
//         console.log(receiverId)
//     const user = getUser(receiverId)
//     console.log("user",user)
//     io.to(user.socketId).emit("getMessage",{
//         senderId,
//         text
//     })
// })

//     // socket.on("sendMessage",({senderId,receiverId,text,conversationId})=>{
//     //      console.log(receiverId)
//     //     const user = getUser(receiverId)
        
//     //     io.to(user?.conversationId).emit("getMessage",{
//     //         senderId,
//     //         text
//     //     })
//     // })

//     socket.on("disconnect",()=>{
//         console.log("Disconnected")
//         removeUser(socket.id)
//         io.emit("getUsers",users)
//     })
// })

// // socket.on("sendMessage",({senderId,receiverId,text})=>{
// //     const user = receiverId
// //     io.to(user.socketId).emit("getMessage",{
// //         senderId,
// //         text
// //     })
// // })


const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const DbConnection = require("./DB_Connection/Db");
const userRoutes = require("./Routes/UserRoute");
const courseRoutes = require("./Routes/CourseRoute");
const studentRoutes = require("./Routes/StudentRoute");
const sylabusRoutes = require("./Routes/SylbusRoute");
const accessRoutes = require("./Routes/AccessRoute");
const taskRoutes = require("./Routes/TaskRoute");
const taskReviewRoutes = require("./Routes/TaskReviewRoute");
const queryRoutes = require("./Routes/QueryRoute");
const conversationRoutes = require("./Routes/ConversationRoute");
const messageRoutes = require("./Routes/MessageRoute");
const mentorRoutes = require("./Routes/MentorRoute")

dotenv.config(); // Correct initialization

app.use(express.json());
app.use(cors()); // Configure CORS properly if needed

const port = process.env.PORT || 4200;

DbConnection();

app.use("/user", userRoutes);
app.use("/mentor",mentorRoutes)
app.use("/course", courseRoutes);
app.use("/student", studentRoutes);
app.use("/sylabus", sylabusRoutes);
app.use("/task", taskRoutes);
app.use("/review", taskReviewRoutes);
app.use("/query", queryRoutes);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);

// Uncomment if needed
// app.use("/access", accessRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to zenclass app..!");
});

const server = app.listen(port, () => {
    console.log(`The server is running on port ${port}`); // Fixed syntax
});

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    console.log(userId, socketId);
    if (!users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    console.log(userId);
    console.log("users", users);
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("Connection established");

    io.emit("welcome", "Hello, this is the socket server");

    socket.on("addUser", (userId) => {
        console.log("Add");
        console.log("2", userId, socket.id);
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text, conversationId }) => {
        console.log(receiverId);
        const user = getUser(receiverId);
        console.log("user", user);
        if (user) { // Check if user exists
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
                conversationId
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
