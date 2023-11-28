export class CreateUserDto{
    constructor(userInfo){
        this.first_name = userInfo.first_name,
        this.last_name = userInfo.last_name,
        this.email = userInfo.email,
        this.age=userInfo.age,
        this.password=userInfo.password,
        this.role=userInfo.role,
        this.cart=userInfo.cart
    }
}
