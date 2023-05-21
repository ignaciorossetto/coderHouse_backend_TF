

window.onload = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.register === 'success') {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Creaste exitosamente un usuario!`,
            showConfirmButton: false,
            timer: 2000,
            toast: true
          })
    }
    if (params.logout_status === 'success') {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Cerraste cesion exitosamente`,
            showConfirmButton: false,
            timer: 2000,
            toast: true
          })
    }
    if (params.login_status === 'failed') {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: `Usuario y/o contraseña incorrecta`,
            showConfirmButton: false,
            timer: 2000,
            toast: true
          })
    }
    if (params.login_status === 'Gfailed') {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: `El usuario ya se registro con otra plataforma`,
            showConfirmButton: false,
            timer: 2000,
            toast: true
          })
    }
}