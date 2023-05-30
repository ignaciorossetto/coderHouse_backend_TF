const changeProfImgImg = document.getElementById('changeProfImgImg')

window.onload = async() => {
    try {
        const response = await fetch('/api/users/check')
        const data = await response.json()
        changeProfImgImg.src = data.user.profileImg
    } catch(error) {
    console.log(error)
    }
}