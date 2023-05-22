const privateViewList = document.getElementById('privateViewList')

window.onload = async() => {
    try {
        const {data: {user}} = await axios.get('/api/users/check')
        if (user.type === 'user') {
            const {dni, address, accStatement} = user.documents
            if (dni.status === 'approved' && address.status === 'approved' && accStatement.status === 'approved') return
            privateViewList.innerHTML += `
            <li class="list-group-item list-group-item-action">
                <a href="/private/premiumReq">
                    <button class='btn btn-primary'>
                        Completa los requisitos para ser Premium!!
                    </button>
                </a>
            </li>
            `
        }
    } catch (error) {
        console.log(error)
    }
}