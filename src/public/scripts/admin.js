


window.onload = async() => {
    const response = await fetch('http://localhost:5000/api/users/check')
    const data = await response.json()
    currentCart = data.user.currentCart
    userCartId = currentCart.cart._id
    renderCart(userCartId)
  }