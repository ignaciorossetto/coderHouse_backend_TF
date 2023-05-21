const errorText = document.getElementById('errorText')

window.onload = async() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if(params.type === 'usernotfound'){
        return errorText.innerText = 'Usuario no encontrado'
    } else if(params.type === 'changepass_2') {
        return errorText.innerText = 'No se puede cambiar la password de un usuario creado en otra plataforma'
    } else if(params.type === 'changepass_3') {
        return errorText.innerText = 'La contrasena actual es incorrecta'
    }
}