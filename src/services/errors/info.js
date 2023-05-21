export const generateUserErrorInfo = (user) => { 
    return `Uno o mas propiedades estan incompletos o son invalidos
    Lista de propiedades obligatorias:
        - username: Necesita ser un string. // ${user.username}
        - email: Necesita ser un string. // ${user.email}  
    `
 } 


export const generateProductErrorInfo = (product) => {
    return ``
}