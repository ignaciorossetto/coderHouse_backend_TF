const changePassForm = document.getElementById('changePassForm')
const confirmBtn = document.getElementById('confirmBtn')
const currentPass = document.getElementById('currentPass')
const newPass = document.getElementById('newPass')

confirmBtn.addEventListener('click', async(e)=> {
    const obj = {
        currentPass: currentPass.value,
        newPass: newPass.value
    }   
    currentPass.value = ''
    newPass.value = ''
    try {
        response = await axios.put('http://localhost:5000/api/users/changePassword', obj)
    } catch (error) {
        const code = error.response.data.code
        return window.location.href = `/error?code=usernotfound${code}` 
    }
})