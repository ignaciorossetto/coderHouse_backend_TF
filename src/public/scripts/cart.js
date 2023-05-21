let currentCart
let userCartId
const socket3 = io();


const deleteHandler = async(id) => {
  const {cart : {shopCart}} = currentCart
  const index = shopCart.findIndex(({ product }) => product === id);
  shopCart[index].quantity -= 1;
  if (shopCart[index].quantity <= 0){
    shopCart.splice(index, 1)
  }
  await axios.put(`http://localhost:5000/api/carts/${userCartId}`, {shopCart: shopCart})
  renderCart(userCartId)
  socket3.emit('productAdded', shopCart)
};



const renderCart = async(cartID) => {
  const response = await axios.get(`http://localhost:5000/api/carts/${cartID}`)
  const {cart : {shopCart}} = response.data
  let cartContainer = document.getElementById("cartContainer");
  let total = 0;
  cartContainer.innerHTML = ''
  if (shopCart.length > 0) {
    
  
  shopCart.forEach((element) => {
    cartContainer.innerHTML += `


        <div class="card w-25 px-5">
            <img src="${element.product.image}" style='width:auto; height:200px;' class="card-img-top object-fit-contain" alt="element">
            <div style='height: auto; min-height:125px;' class='d-flex flex-column justify-content-between'>
              <h5 class="card-title">${element.product.title}</h5>
              <h5 class="card-title">$${element.product.price}</h5>
              <h5 class="card-title">Cantidad: ${element.quantity}</h5>
              <button class="btn btn-danger" id='deleteItemBtn' onclick="deleteHandler('${element.product._id}')" >Eliminar del carrito</button>
          </div>
          <hr>

        `;
    total += element.product.price * element.quantity;
  });

  cartContainer.innerHTML += `
<hr>
<div>TOTAL: $${total} </div>
<br>
<a href="/shippinginfo"" class="btn btn-primary">Continuar</a>

`;
} else {
  cartContainer.innerHTML += `
    <h3> No hay productos en el carrito </h3>
  `
}


};



window.onload = async() => {
  const response = await fetch('http://localhost:5000/api/users/check')
  const data = await response.json()
  currentCart = data.user.currentCart
  userCartId = currentCart?.cart?._id
  renderCart(userCartId)
}
