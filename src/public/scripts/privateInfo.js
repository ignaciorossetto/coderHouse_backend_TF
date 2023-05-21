const privateViewList = document.getElementById('privateViewList')

window.onload = async() => {
    try {
        const {data: {user}} = await axios.get('http://localhost:5000/api/users/check')

    } catch (error) {
        console.log(error)
    }
}