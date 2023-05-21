const createProductButton = document.getElementById('createProductButton')
const shippingInfoContainer = document.getElementById('shippingInfoContainer')
let userCartId
let currentCartIndex
let userId

createProductButton.addEventListener('click', async(e)=> {
    e.preventDefault()
    const ship = {
        name: e.target.form[0].value,
        address: e.target.form[1].value,
        id: e.target.form[2].value,
        email: e.target.form[3].value,
        cellphone: e.target.form[4].value,
    }
    const payment= {
        method: e.target.form[5].value,
        status: 'pendiente',
    }
    try {
        const resetBtn = document.getElementById("resetButton");
        resetBtn.click();
        await axios.put(`/api/carts/${userCartId}`, {shippingInfo: ship, paymentInfo: payment})
        await axios.post(`/api/users/modify/${userId}`, {
            "$set": {[`carts.${currentCartIndex}.confirmed`]: true, timeStamp: new Date().toDateString()}
        })
        shippingInfoContainer.innerHTML = `
        <h1>
            Felicitaciones por tu compra! Seras re dirigido al resumen de tu compra!
        </h1>`

        setTimeout(()=> {
          window.location.replace(`/private/lastpurchases/${userCartId}?newPurchase=true`)
        },2000)
        return 
        
    } catch (error) {
        console.log(error);

        return
    }
})

const display = async() => {
    const response = await axios.get(`http://localhost:5000/api/carts/${userCartId}`)
    const {cart : {shopCart}} = response.data
    let cartResume = document.getElementById('cartResume')
    let total = 0
    shopCart.forEach(element => {
        cartResume.innerHTML += `
            <div>
                <h4>ID: ${element.product._id}</h4>
                <h5>PRECIO: $${element.product.price}</h5>
                <h5>CANTIDAD: ${element.quantity}</h5>
            </div>
            <hr>
        `
        total += element.product.price*element.quantity
    });
    
    cartResume.innerHTML += `
    <hr>
        <div>TOTAL: $${total} </div>
        <br>
    `

}



window.onload = async() => {
    const response = await fetch('http://localhost:5000/api/users/check')
    const data = await response.json()
    currentCartIndex = data.user.carts.findIndex(c=>c.confirmed === false)
    currentCart = data.user.currentCart
    userId = data.user._id
    userCartId = currentCart.cart._id
    display()
}