console.log('js en el front')

//socket del cliente
const socketClient=io();

const userName=document.getElementById('userName')
const inputMsg=document.getElementById('inputMsg')
const sendMsg=document.getElementById('sendMsg')
const chatPanel=document.getElementById('chatPanel')
let user

 


Swal.fire({
    title:'Bienvenidos',
    text:'Ingrese su nombre de usuario',
    input:'text',
    inputValidator: (value)=>{
        return !value && 'Debes ingresar nombre de usuario para continuar'
    },
    allowOutsideClick:false,
    allowEscapeKey:false    
}).then((inputValue)=>{
    console.log(inputValue)
    user=inputValue.value
    userName.innerHTML=user;
    socketClient.emit('authenticated', user)
})

sendMsg.addEventListener('click', ()=>{
    const msg={user, message:inputMsg.value}
    socketClient.emit('msgChat', msg)
    inputMsg.value='';
})

socketClient.on('chatHistory', (dataServer)=>{
    console.log(dataServer);
    let msgElements=''
    dataServer.forEach(elm=>{
        msgElements += `<p>${elm.user}: ${elm.message} </p>`
    });
    chatPanel.innerHTML=msgElements;
});

socketClient.on('newUser', (data)=>{
    if(user){
       Swal.fire({
        text:`${data}`,
        toast:true,
        position:'top-right'
    }) 
    }
    
})

// scroll al utlimo mensaje
socketClient.on('chatHistory', (dataServer) => {
    console.log(dataServer);
    let msgElements = '';
    dataServer.forEach((elm) => {
      msgElements += `<p>${elm.user}: ${elm.message} </p>`;
    });
    chatPanel.innerHTML = msgElements;
    chatPanel.scrollTop = chatPanel.scrollHeight;
  });
  