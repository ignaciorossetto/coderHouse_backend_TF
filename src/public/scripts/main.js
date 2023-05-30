const socket1 = io('/');
const logoutBtn = document.getElementById('logoutBtn')
const loginBtn = document.getElementById('loginBtn')
const privateBtn = document.getElementById('privateBtn')
const adminBtn = document.getElementById('adminBtn')
const cartQuantity = document.getElementById('cartQuantity')
const registerBtn = document.getElementById('registerBtn')
const cartBtn = document.getElementById('cartBtn')
const addProductBtn = document.getElementById('addProductBtn')
const profileImgHeader = document.getElementById('profileImgHeader')

const handleClick = async() => {
    try {
        await fetch('/api/users/logout')
        document.cookie = "coderCookieToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace('/login?logout_status=success')
        displayLogOut()
    } catch (error) {
        console.log(error);
    }
}


socket1.on('totalQuantityInCart', data => {
    if (data.length > 0) {
        let total = 0
        data.forEach(e => {
            total += e.quantity                
        });
        cartQuantity.innerText = total
    } else cartQuantity.style.display = 'none'
    
})

logoutBtn.addEventListener('click', handleClick)
const displayLogOut = async() => {

    try {
        const response = await fetch('/api/users/check')
        const data = await response.json()
        if (!data.user.admin) {
            adminBtn.style.display = 'none'
        }
        loginBtn.style.display = 'none'
        registerBtn.style.display = 'none'
        if (data.user.type === 'user'){
            addProductBtn.style.display = 'none'
        }
        if (data.user?.currentCart?.cart?.shopCart?.length > 0) {
            let total = 0
            data.user.currentCart.cart.shopCart.forEach(e => {
                total += e.quantity                
            })
            cartQuantity.innerText = total
        } else cartQuantity.style.display = 'none'
        
        if (data.user.profileImg) {
            profileImgHeader.innerHTML = `<img 
            style='border-radius:50px; object-fit:cover; height:50px; width:50px;'
            src=${data.user.profileImg} /> `
        } else profileImgHeader.innerHTML = `<i class="fs-4 bi bi-person"/>`
        
        return
    } catch (error) {
        console.log(error)
        cartBtn.style.display = 'none'
        logoutBtn.style.display = 'none'
        privateBtn.style.display = 'none'
        addProductBtn.style.display = 'none'
        adminBtn.style.display = 'none'
        registerBtn.style.display = ''
        loginBtn.style.display = ''
        return
    }
}
displayLogOut()



