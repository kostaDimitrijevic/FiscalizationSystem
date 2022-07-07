
export class Artical{
    company: String
    articalCode: String
    articalName: String
    unit: String
    taxRate: Number
    type: String
    manufacturer: String
    country: String
    foreinName: String
    barcode: String
    customsTariff: Number
    ecoTax: Boolean
    exciseTax: Boolean
    minSupplies: Number
    maxSupplies: Number
    description: String
    decleration: String
    pricesAndState: {
        warehouseRegisterName: String,
        purchasePrice: Number,
        sellingPrice: Number,
        currentStockStatus: Number,
        minAmount: Number,
        maxAmount: Number
    }[]
}