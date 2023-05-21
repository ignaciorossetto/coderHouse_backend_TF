export default class UserDTO {

  constructor(user) {
    this.name = user.name
    this.password = user.password
    this.email = user.email
    this.admin = user.admin
    this.type = user.type
    this.strategy = user.strategy
    this.carts = user.carts
    this.profileImg = user.profileImg
    this.documents = user.documents
  }

}