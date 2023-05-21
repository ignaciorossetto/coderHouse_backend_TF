export default class ProductDTO {

  constructor(product) {
    this.title = product.title
    this.price = product.price
    this.description = product.description
    this.category = product.category
    this.image = product.image
    this.code = product.code
    this.stock = product.stock
    this.owner = product.owner
  }

}
