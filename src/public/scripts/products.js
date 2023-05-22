const productsGrid = document.getElementById("productsGrid");
const productSpinner = document.getElementById("productSpinner");
const selectCategories = document.getElementById("selectCategories");
const selectPriceSort = document.getElementById("selectPriceSort");
const selectQuantityDisplayed = document.getElementById(
  "selectQuantityDisplayed"
);
const paginationContainer = document.getElementById("paginationContainer");
const nextPageBtn = document.getElementById('nextPageBtn')
const prevPageBtn = document.getElementById('prevPageBtn')
const currentPage = document.getElementById('currentPage')

const handleSelect = async (e) => {
  const sort =
    selectPriceSort.value === "-" ? "" : `sort=${selectPriceSort.value}&`;
  const category =
    selectCategories.value === "-" ? "" : `category=${selectCategories.value}&`;
  const limit =
    selectQuantityDisplayed.value === "-"
      ? `limit=1000`
      : `limit=${selectQuantityDisplayed.value}&`;
  const response = await fetch(
    `/api/products?${sort}${category}${limit}`
  );
  const data = await response.json();
  display(data.payload, data);
};

const handlePaginate = async (url) => {
  let url1 = url.replace("-", "'")
  const response = await fetch(url1);
  const data = await response.json();
  display(data.payload, data);
};

const display = async (productsArray,data) => {
  productSpinner.style.display = ''
  productsGrid.innerHTML = ``;
  productsArray.forEach((element) => {
    productsGrid.innerHTML += `


        <div class="productCard shadow card col-lg-6" style="width: 18rem;">
          <img src="${element.image}" style='width: auto; height:300px;' class="card-img-top object-fit-contain" alt="product">
          <div class="card-body d-flex flex-column justify-content-between">
          <div style='height: auto; min-height:125px;'>
          <h5 class="card-title">${element.title}</h5>
          </div>
            <p class="card-text">$${element.price}</p>
            <a href="/products/${element._id}" class="btn btn-primary">ver producto</a>
          </div>
        </div>



        `;

        prevPageBtn.innerHTML = data.hasPrevPage ? `<button class='btn btn-primary' onclick='handlePaginate("${data.prevLink}")'> <i class="bi bi-arrow-left"></i> </button>` : `<button class='btn btn-secondary' disabled> <i class="bi bi-arrow-left"></i></button>`
        currentPage.innerText = data.page
        nextPageBtn.innerHTML = data.hasNextPage ? `<button class='btn btn-primary' onclick='handlePaginate("${data.nextLink}")'> <i class="bi bi-arrow-right"></i> </button>` : `<button class='btn btn-secondary' disabled> <i class="bi bi-arrow-right"></i> </button>`
        // NO PUEDO HACER FUNCIONAR LOS BTNS CON LAS CATEGORIAS QUE TIENE UN ' ADENTRO POR EJEMPLO men's clothing. 
        productSpinner.style.display = 'none'
        productsGrid.style.display = ''
  });


};

window.onload = async () => {
  productSpinner.style.display = ''
  productsGrid.style.display = 'none'
  const categories_resp = await fetch(
    `/api/products/categories`
  );
  const categories = await categories_resp.json();
  selectCategories.innerHTML = `<option value ="-">Todos los productos</option>`;
  categories.forEach((element) => {
    selectCategories.innerHTML += `<option value="${element}" >${element}</option>`;
  });
  const response = await fetch(`/api/products?`);
  const data = await response.json();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.name){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Bienvenido ${params.name}!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    })
  }
  if (params.newProduct){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Creaste exitosamente un producto!`,
      showConfirmButton: false,
      timer: 2000,
      toast: true
    })
  }
  if (params.newPurchase){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Felicitaciones por tu compra!`,
      showConfirmButton: false,
      timer: 2000,
      toast: true
    })
  }
  await display(data.payload, data);
};
