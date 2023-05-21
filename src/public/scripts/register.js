const usernameSpan = document.getElementById('usernameSpan')
const emailSpan = document.getElementById('emailSpan')

window.onload = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.key === 'name') {
        usernameSpan.innerText = 'Ya se registro un usuario con el mismo nombre'
    }
    if (params.key === 'email') {
        emailSpan.innerText = 'Ya se registro un email igual'
    }
}