const productTitle = document.getElementById("productTitle");
const productContainer = document.getElementById("productContainer");
const socket2 = io('http://localhost:5000/');
window.onload = async () => {
  try {
  const user = await fetch('http://localhost:5000/api/users/check')
  const userData = await user.json()
  const {currentCart} = userData.user
  const value = document.URL.split("/")[4];
  const response = await fetch(`http://localhost:5000/api/products/${value}`);
  const { product } = await response.json();
  productTitle.innerText = `${product.title}`;
  productContainer.innerHTML = `

            
          <div style='height: auto; min-height:350px;' class="card w-50 d-flex align-items-center justify-content-evenly">
            <img src="${product.image}" style='width: 50%; height:auto;' class="card-img-top object-fit-contain" alt="product">
            <div style='height: auto; min-height:125px;'>
              <h5 class="card-title">${product.title}</h5>
              <h5 class="card-title">$${product.price}</h5>
              <button class="btn btn-primary" id='addCartButton' >Agregar al carrito</button>
          </div>

          `;
const addCartButton = document.getElementById("addCartButton");

  addCartButton.addEventListener("click", async() => {
    const id = product._id
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Agregaste un producto al carrito!!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    })
    const {shopCart} = currentCart.cart
    if (product.owner === userData.user._id) {
      return Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: `No puede agregar productos propios al carrito`,
        showConfirmButton: false,
        timer: 1500,
        toast: true
      })
    }
    if(!shopCart.some((e)=>{
      return e.product === id})){
        const obj={
            product: id,
            quantity: 1
        }
        shopCart.push(obj)
        await axios.put(`http://localhost:5000/api/carts/${currentCart.cart._id}`, {shopCart : shopCart})
        socket2.emit('productAdded', shopCart)
        // location.reload()
        return
      } else {
        const index = shopCart.findIndex((e)=> e.product === id)
        shopCart[index].quantity += 1
        await axios.put(`http://localhost:5000/api/carts/${currentCart.cart._id}`, {shopCart : shopCart})
        socket2.emit('productAdded', shopCart)
        return
      }

  });
  } catch (error) {
    productTitle.innerText = `DEBES INICIAR SESION PARA VER EL PRODUCTO`;
  }
}
