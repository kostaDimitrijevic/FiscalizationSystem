export class Buyer{
    username: String
    password: String
    firstname: String
    lastname: String
    phoneNumber: String
    IDNumber: String
    bills : {
        company: String
        object: String
        price: Number
        paymentMethod: String
    }[]
}