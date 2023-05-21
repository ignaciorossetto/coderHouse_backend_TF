const changePassFormContainer = document.getElementById('changePassFormContainer')
const changePassForm = document.getElementById('changePassForm')
const changePassFormBtn = document.getElementById('changePassFormBtn')
const changePassFormPass = document.getElementById('changePassFormPass')

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const changePassSubmitHandler = async(e) => {
    e.preventDefault()
    const newPass = {
        password: changePassFormPass.value,
        token: params.token,
        email: params.email
    }
    try {
        const response =await axios.post('http://localhost:5000/api/users/changepass', newPass)
        if (response) {
            changePassFormContainer.innerHTML = ` 
            <h2>Contraseña modificada con exito</h2>
            <h5>Ingresa al sitio <a href='http://localhost:5000/login'>haciendo click aqui</a></h5>
        `
        }
    } catch (error) {
        changePassFormContainer.innerHTML = ` 
            <h2>Error al cambiar la contraseña </h2>
            <h5>${error.message}</h5>
        `
    }
}

changePassFormBtn.addEventListener('click', changePassSubmitHandler)