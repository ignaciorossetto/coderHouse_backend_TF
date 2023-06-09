const premiumReqContainer = document.getElementById('premiumReqContainer')

const pendingToapprovedHandleBtn = async(file) => {
    const response  = await axios.get(`/api/users/changePremiumReqStatus/${file}`)
}
const display = async(user) => {
    for (const key in user?.documents) {
        if (user.type === 'premium') {
            premiumReqContainer.innerHTML = `
                <h1>Felicitaciones, ahora sos un usuario PREMIUM!! </h1>
            `
            return
        }
        const fileName = user['documents'][`${key}`]['name'] === 'dni' ? 'DNI' : user['documents'][`${key}`]['name'] === 'address' ? 'Comprobante domicilio' : 'Estado de cuenta'
        if (user['documents'][`${key}`]['status'] === 'pending') {
            document.getElementById(`${user['documents'][key]['name']}FormContainer`).innerHTML = "";
            document.getElementById(`${user['documents'][key]['name']}FormContainer`).innerHTML = `
                <h3>Se cargo correctamente el archivo ${fileName}!, Estamos chequeando el archivo.</h3>
                <button class='btn btn-secondary' onclick='pendingToapprovedHandleBtn("${key}")'>Actualizar estado a 'approved' </button>
            `;
        }
        if (user['documents'][`${key}`]['status'] === 'approved') {
            document.getElementById(`${user['documents'][key]['name']}Form`).innerHTML = "";
            document.getElementById(`${user['documents'][key]['name']}Form`).innerHTML = `
                <h3>El archivo ${fileName} fue aprobado!!</h3>
            `;
        }
    }
}

window.onload = async() => {
    try {
        const {data: {user}} = await axios.get('/api/users/check')
        display(user)
        
    } catch (error) {
        console.log(error)
    }
}