const {app, BrowserWindow} = require('electron')
const { ipcRenderer } = require('electron')
const { ipcMain } = require('electron')

//ventana inicio de sesion 
let ventana
function ventanaPrincipal(){

    ventana = new BrowserWindow({

        width: 400,
        height: 275,
        webPreferences: ({
                nodeIntegration: true
        })

    })

    ventana.loadFile('./inicio/inicio.html')
}
// Ventana Registro 

let ventanaRegistro
function ventanaSecundaria(){

    ventanaRegistro = new BrowserWindow({

        width: 400,
        height: 325,
        webPreferences: ({
                nodeIntegration: true
        })

    })

    ventanaRegistro.loadFile('./registro/registro.html')
    
}
let ventanaBienvenida
function ventanaTres(){

    ventanaBienvenida = new BrowserWindow({

        width: 530,
        height: 570,
        webPreferences: ({
                nodeIntegration: true
        })

    })

    ventanaBienvenida.loadFile('./bienvenida.html')
    
}



app.whenReady().then(ventanaPrincipal)

//Auto ajuste de la ventana de igreso con errores 
ipcMain.on('error-inicio', (event, args)=>{
    let linea = parseInt(args)
    let alto = 275 + (linea * 10)
    ventana.setSize(400,alto)
})
//Auto ajuste de la ventana de igreso sin errores
ipcMain.on('inicio-valido', (event, args) =>{

    ventana.setSize(400, 215)
    //console.log(args)
    //Respuesta cuando se inicia sesion correctamente.  Recibido en inicio.js
    //event.reply('respuesta','Inicio Correcto')
    ventanaTres()
    ventanaBienvenida.webContents.on('did-finish-load', ()=>{
        ventanaBienvenida.webContents.send('mensaje', args)


    })
    })
//Cuando se pulsa el boton de registro para abrir ventana de registro 
ipcMain.on('registrar-nuevo', (event,args)=>{
    ventanaSecundaria()
    args
})

//Auto ajuste ventana registro con errores

ipcMain.on('error-registro', (event, args)=>{
    let linea2 = parseInt(args)
    let alto2 = 275 + (linea2 * 35)
    ventanaRegistro.setSize(400,alto2)
    
})

//Auto ajuste ventana registro sin errores

ipcMain.on('registro-valido', (event, args)=>{

    ventanaRegistro.setSize(400, 325)
    //console.log(args)

    event.reply('registroC', 'Registro ingresado!' + args)

})