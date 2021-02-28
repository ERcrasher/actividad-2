const { ipcRenderer } = require('electron')

document.getElementById('registro').addEventListener('submit',(event)=>{
    event.preventDefault()

    //Lista usuarios
    let listaUsuarios = ["Edsson","Luis","Manuel","Pedro","Pablo"]
    let listaCorreos = ["edsson@yahoo.com","luis@gmail.com","pablo@gmail.com"]

    //Para obtener lo que se ingresa en el formulario
    let nuevoUsuario = document.getElementById('nuevoUsuario')
    let nuevoEmail = document.getElementById('nuevoEmail')
    let nuevoPass = document.getElementById('nuevoPass')
    let error_form = document.getElementById('error_form')
    let errores = 0

    //reseteo 
    nuevoPass.classList.remove('invalid')
    error_form.innerHTML = ""

    //Verificacion de usuario repetido
    let i
    for (i=0; i < listaUsuarios.length;i++){

        if(nuevoUsuario == listaUsuarios[i]){
            
        }
    }


    //Para validar datos
    let exprMin = RegExp("[a-z]")
    let exprMay = RegExp("[A-Z]")
    let exprNum = RegExp("[0-9]")
    let exprSim = RegExp("[\-\*\_]")

    //Validaciones correo
    if(nuevoPass.value.length < 8){

        error_form.innerHTML += 'El password debe tener almenos 8 caracteres.<br>'
    }

    if(!nuevoPass.value.match(exprMin)){

        error_form.innerHTML+="El password necesita una letra minuscula.<br>"
        nuevoPass.classList.add('invalid')
        errores++
     }
     if(!nuevoPass.value.match(exprMay)){
 
         error_form.innerHTML+="El password necesita una letra mayuscula.<br>"
         nuevoPass.classList.add('invalid')
         errores++
     }
      if(!nuevoPass.value.match(exprNum)){
 
         error_form.innerHTMLL+="El password necesita un numero.<br>"
         nuevoPass.classList.add('invalid')
         errores++
     }
     if(!nuevoPass.value.match(exprSim)){
 
         error_form.innerHTML+="Debe incluir uno de estos simbolos. (- * _)<br>"
         nuevoPass.classList.add('invalid')
         errores++
      }

      
            
      // Verificacion de usuario
    if(listaUsuarios.includes(nuevoUsuario.value)){
        error_form.innerHTML+= "El usuario ingresado ya existe.<>br"
         nuevoPass.classList.add('invalid')
         errores ++
        }else if (listaCorreos.includes(nuevoEmail.value)){
            error_form.innerHTML+= "El correo ingresado ya existe.<br>"
            nuevoPass.classList.add('invalid')
            errores ++
        }else{
            listaUsuarios.push(nuevoUsuario.value)
            listaCorreos.push(nuevoEmail.value)
        }
      




     if(!nuevoPass.classList.contains('invalid')){
        ipcRenderer.send('registro-valido', [nuevoUsuario.value, nuevoEmail.value, nuevoPass.value])
    } else{
    
           ipcRenderer.send('error-registro', errores)
    }
    //Recibiendo mensaje de registro correcto
    ipcRenderer.on('registroC', (event, args)=>{
        alert(args)
    })



})