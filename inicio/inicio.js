const { ipcRenderer } = require('electron')
document.getElementById('inicio').addEventListener('submit', (event)=>{
    event.preventDefault()

    let listaUsuarios = ["Edsson","Luis","Manuel","Erwin","Pablo"]
    let usuario = document.getElementById('nombreUsuario')
    let error_pass = document.getElementById('error_pass')
    let pass = document.getElementById('pass')
    let errores = 0

    pass.classList.remove('invalid')
    error_pass.innerHTML = ""

    if(!listaUsuarios.includes(usuario.value)){
        error_pass.innerHTML+="Usuario no registrado.<br>"
        pass.classList.add('invalid')
        errores++

      }

    if(pass.value.length < 8){

        error_pass.innerHTML += 'La contraseña nececita almenos 8 caracteres.<br>'
        pass.classList.add('invalid')
        errores++

    }

    let exprMin = RegExp("[a-z]")
    let exprMay = RegExp("[A-Z]")
    let exprNum = RegExp("[0-9]")
    let exprSim = RegExp("[\-\*\_]")

    if(!pass.value.match(exprMin)){

        error_pass.innerHTML+="El password ecesita una letra minuscula.<br>"
        pass.classList.add('invalid')
        errores++
     }
     if(!pass.value.match(exprMay)){
 
         error_pass.innerHTML+="El password necesita una letra mayuscula.<br>"
         pass.classList.add('invalid')
         errores++
     }
      if(!pass.value.match(exprNum)){
 
         error_pass.innerHTML+="El password necesita un numero.<br>"
         pass.classList.add('invalid')
         errores++
     }
     if(!pass.value.match(exprSim)){
 
         error_pass.innerHTML+="EL password necesita un simbolo. (- * _)<br>"
         pass.classList.add('invalid')
         errores++
      }
      

     if(!pass.classList.contains('invalid')){
         
        ipcRenderer.send('inicio-valido', [usuario.value, pass.value])
    

         
     } else{

            ipcRenderer.send('error-inicio', errores)
     }
})

//ipcRenderer.on('respuesta', (event,args)=>{


  //  alert(args)
//})



//Abrir registro 
document.getElementById('registro').onclick = abrirRegistro


function abrirRegistro(){

    ipcRenderer.send('registrar-nuevo', "ventanaSecundaria.webContents.on('did-finish-load', ()=>{})")

}