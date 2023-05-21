const socket = io();

let user;
let chatBox = document.getElementById("chatBox");
let chatBoxClick = document.getElementById("chatBoxClick");
let userName = document.getElementById("userName");
let eliminarChat = document.getElementById("eliminarChat");
let bool = false

Swal.fire({
  title: "Set your name to chat",
  input: "text",
  inputValidator: (value) => {
    return !value && "Need to set a name!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("authenticated", user);
  userName.innerText = `User: ${user}`
  bool = true
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

chatBoxClick.addEventListener("click", () => {
  if (chatBox.value.trim().length > 0) {
    const obj = {
        user,
        message: chatBox.value
    }
    socket.emit("message", obj);
    chatBox.value = "";
  }
});

eliminarChat.addEventListener("click", ()=> {
    socket.emit("deleteCollection")
})


socket.on('messageLogs', data => {
    let log = document.getElementById('chatLogs')
    let messages = ''
    data.forEach(element => {
        messages += `<b>${element.user}</b>: ${element.message}<br>`
    })
    log.innerHTML = messages
    
})

socket.on('userLoggedIn', (data) => {
    if (bool) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${data.user} is connected!`,
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
    }
      
})

socket.on('messagesArray', data=> {
    let log = document.getElementById('chatLogs')
    let newMessages = ''
    data.forEach(element => {
        newMessages += `<b>${element.user}</b>: ${element.message}<br>`
    })
    log.innerHTML = newMessages
})