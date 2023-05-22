const privateViewList = document.getElementById('privateViewList')

window.onload = async() => {
    try {
        const {data: {user}} = await axios.get('/api/users/check')

    } catch (error) {
        console.log(error)
    }
}