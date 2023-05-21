
const homeList = document.getElementById('httpList')
const socket = io();



const products = async() => {
    const response = await fetch('http://localhost:5000/api/products')
    const data = await response.json()
    return data
}

const renderProducts = async()=>{
    const prods = await products()
    if (prods.length === 0) {
        homeList.innerHTML = '<h2>No hay items en la lista</h2>'
        return
    }
    let items = ''
    prods.forEach((prod)=>{
        items += `
        <li>
            <h5>Nombre:${prod.title}</h5>
            <p>Precio: $${(prod.price).toLocaleString()}</p>
        </li>`
    })
    homeList.innerHTML = items
}

window.onload = async() =>{
    await renderProducts()
}
