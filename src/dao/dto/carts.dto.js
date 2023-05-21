export default class CartDTO {
    
    constructor(cart) {
      this._id = cart._id
      this.shippingInfo = cart.shippingInfo
      this.paymentInfo = cart.paymentInfo
      this.shopCart = cart.shopCart || []
      this.timestamps = cart.timestamps

    }

}
