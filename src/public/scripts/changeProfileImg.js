const changeProfImgImg = document.getElementById('changeProfImgImg')

window.onload = async() => {
    try {
        const response = await fetch('/api/users/check')
        const data = await response.json()
        console.log(data.user.profileImg)
        changeProfImgImg.src = data.user.profileImg
    } catch(error) {
    console.log(error)
    }
}