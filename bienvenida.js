const { ipcRenderer } = require('electron')

ipcRenderer.on('mensaje', (event, args)=>{

    document.getElementById('mensaje').innerHTML = "Bienvenido " + args[0] + "!"
})