const forgotPassFormContainer = document.getElementById('forgotPassFormContainer')
const forgotPassForm = document.getElementById('forgotPassForm')
const forgotPassFormBtn = document.getElementById('forgotPassFormBtn')
const forgotPassFormEmail = document.getElementById('forgotPassFormEmail')

const forgotPassSubmitHandler = async(e) => {
    e.preventDefault()
    const email = {email: forgotPassFormEmail.value}
    try {
        const response =await axios.post('http://localhost:5000/api/users/forgotpass', email)
        if (response) {
            forgotPassFormContainer.innerHTML = `
                <h2> Revisa tu email, te va llegar un link para poder modificar tu contraseña </h2>

                <h3>Si no te llega, proba enviarlo de nuevo <a href='http://localhost:5000/forgotPassword'>clickenado aqui</a> </h3>
            `
        }
    } catch (error) {
        forgotPassFormContainer.innerHTML = `
                <h2> ${error.response.data.message} </h2>
                <h3>Utiliza otro <a href='http://localhost:5000/forgotPassword'>clickenado aqui</a> </h3>
            `
    }
}

forgotPassFormBtn.addEventListener('click', forgotPassSubmitHandler)