import {Server} from 'socket.io'
export const io = new Server();

export const  Socket = {
    emit: function (event, data) {
        io.sockets.emit(event, data);
    }
};

io.on("connection", function (socket) {
    socket.on('authenticated', (data)=>{
    })
});
