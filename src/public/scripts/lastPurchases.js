const lpList = document.getElementById('lpList')

const displayCarts = async(array) => {
    lpList.innerHTML = ''
    array.forEach((element)=> {
        lpList.innerHTML += 
        `<li><a href='/private/lastpurchases/${element.cart._id}'>${element.cart.updatedAt.split('T')[0]}</a></li>`
    })

}

window.onload = async() => {
    const response = await fetch('http://localhost:5000/api/users/check')
    const data = await response.json()
    const confirmedCarts = data.user.carts.filter(item => item.confirmed === true)
    displayCarts(confirmedCarts)
}