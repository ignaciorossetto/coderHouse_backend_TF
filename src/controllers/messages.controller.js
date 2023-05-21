import { messageModel } from "../dao/mongo/models/messages.model.js" 

export const getAllMessages = async (req, res) => {
  let data = await messageModel.find()
  if (data.length === 0) {
    const response = await messageModel.create({
      message: []
    })
    data = [response]
  }
  const messages = data[0].messages
  var collectionId = data[0]._id
  const io = req.app.get('io')
  io.on('connection', (socket) => {
    // esa linea elimina todos los listeners que se generan al crear la instanicia de io dentro de la route
    socket.removeAllListeners()
    socket.on('authenticated', data => {
        console.log(`New client ${data} connected. Socket-id: ${socket.id}`);
        socket.broadcast.emit("userLoggedIn", {
            user: data,
            mjs: messages
        })
        io.to(socket.id).emit('messagesArray', messages)
    })

    socket.on('message', async(data) => {
      const mesa = await messageModel.find()
      mesa[0].messages.push(data)
      io.emit('messageLogs', mesa[0].messages)
        const response = await messageModel.findByIdAndUpdate({_id: mesa[0]._id}, {
            $push: {
              messages: data
            }
        })
        // const mes = await messageModel.find()
        // const messages = mes[0].messages
    })

    socket.on('deleteCollection', async()=> {
      await messageModel.findByIdAndDelete(collectionId)
      const response = await messageModel.create({
        message: []
      })
      data = [response]
      const messages = data[0].messages
      collectionId = data[0]._id
      io.emit('messageLogs', messages)
    })

}
)
    res.render('messages')

  }
  
  export const deleteallMessages = async (req, res) => {
    
    res.json('Hitted deleteall')

  }
  










