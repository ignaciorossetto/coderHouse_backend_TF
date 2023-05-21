const cartId = document.getElementById('cartId').innerText
const products = document.getElementById('products')
const shipping = document.getElementById('shipping')
const payment = document.getElementById('payment')
const timestamp = document.getElementById('timestamp')
let cart
let shippingInfo
let paymentInfo

const displayCartInfo = () => {
    products.innerHTML = ''
    shipping.innerHTML = ''
    payment.innerHTML = ''
    timestamp.innerHTML = ''
    let total = 0

    cart.shopCart.forEach((prod) => {
        products.innerHTML += 
        `<div>
            <div>Nombre: ${prod.product.title}</div>
            <div>Cantidad: ${prod.quantity}</div>
            <div>Precio: $${prod.product.price}</div>
            <div>Total : $${prod.product.price * prod.quantity}</div>
        </div>
        <hr>`
        total += prod.product.price * prod.quantity
    }) 

    products.innerHTML += `<div>Total: $ ${total}</div>`

    shipping.innerHTML = `
    <div>
        <h2>Datos de envio</h2>
        <div>Nombre: ${shippingInfo.name}</div>
        <div>Domicilio: ${shippingInfo.address}</div>
        <div>Email: ${shippingInfo.email}</div>
    </div>`

    payment.innerHTML =`
    <div>
        <h2>Datos de pago</h2>
        <div>Metodo: ${paymentInfo.method}</div>
    </div>`

    timestamp.innerText = `Fecha: ${new Date(cart.updatedAt).toLocaleDateString()}`



}

window.onload = async() => {
    const respone  = await fetch(`http://localhost:5000/api/carts/${cartId}`)
    const data = await respone.json()
    cart = data.cart
    shippingInfo = data.cart.shippingInfo
    paymentInfo = data.cart.paymentInfo
    displayCartInfo()
}