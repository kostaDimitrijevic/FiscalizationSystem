"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Company = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    companyName: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    street: {
        type: String
    },
    PIB: {
        type: String
    },
    registrationNumber: {
        type: Number
    },
    companyLogoPath: {
        type: String
    },
    status: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
    infoAddedStatus: {
        type: Boolean
    },
    category: {
        type: String
    },
    activityCodes: [{
            type: String
        }],
    isPDV: {
        type: Boolean
    },
    banks: [{
            bankName: {
                type: String
            },
            bankAccount: {
                type: String
            }
        }],
    numberOfWarehouses: {
        type: Number
    },
    warehouses: [{
            name: {
                type: String
            }
        }],
    numberOfRegisters: {
        type: Number
    },
    cashRegisters: [{
            registerName: {
                type: String
            },
            country: {
                type: String
            },
            city: {
                type: String
            },
            street: {
                type: String
            },
            type: {
                type: String
            }
        }],
    orderers: [{
            username: {
                type: String
            },
            PIB: {
                type: String
            },
            numOfDays: {
                type: Number
            },
            percentOfRebate: {
                type: Number
            }
        }],
    departments: [{
            isActive: {
                type: Boolean
            },
            departmentName: {
                type: String
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            matrix: [[{
                        tableName: {
                            type: String
                        },
                        mark: {
                            type: String
                        },
                        width: {
                            type: Number
                        },
                        height: {
                            type: Number
                        }
                    }]],
            matrixCircles: [[{
                        tableName: {
                            type: String
                        },
                        mark: {
                            type: String
                        },
                        width: {
                            type: Number
                        },
                        height: {
                            type: Number
                        }
                    }]],
            tables: [{
                    name: {
                        type: String
                    },
                    width: {
                        type: Number
                    },
                    height: {
                        type: Number
                    },
                    row: {
                        type: Number
                    },
                    column: {
                        type: Number
                    },
                    shape: {
                        type: String
                    }
                }]
        }],
    bills: [{
            date: {
                type: String
            },
            articals: [{
                    type: String
                }],
            priceWithPDV: {
                type: Number
            },
            realPrice: {
                type: Number
            }
        }],
    dailyReports: [{
            date: {
                type: String
            },
            totalAmount: {
                type: Number
            },
            totalAmountPDV: {
                type: Number
            }
        }]
});
exports.default = mongoose_1.default.model('Company', Company, 'companies');
//# sourceMappingURL=company.js.map