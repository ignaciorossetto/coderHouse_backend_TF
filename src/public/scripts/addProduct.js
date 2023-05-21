let id

const handleAddProductSubmit = async(e) => {
    e.preventDefault()
    const addProductForm = document.getElementById('addProductForm')
    let data = new FormData(addProductForm)
    let obj = {}
    data.append('owner', id)
    for (let [key, value] of data.entries()) { 
        obj[`${key}`] = value
      }
    const response = await axios.post('/api/products', obj, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    if (response.data.status === 'success') {
          window.location.replace('/products?newProduct=true')
    }
}


window.onload = async() => {
    const {data: {user}} = await axios.get('/api/users/check')
    if (user.type !== 'premium') {
        document.getElementById('addProductContainer').innerHTML= `
            <h1> Solo usuarios premium pueden agregar productos!! </h1>
        `
    }
    id = user._id
    addProductForm.addEventListener('submit', handleAddProductSubmit)
}