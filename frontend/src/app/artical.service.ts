import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artical } from './models/artical';

@Injectable({
  providedIn: 'root'
})
export class ArticalService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  addArticalBasicInfo(company, articalCode, articalName, taxRate, unit, type){
    const data = {
      company: company,
      articalCode: articalCode,
      articalName: articalName,
      unit: unit,
      taxRate: taxRate,
      type: type
    }

    return this.http.post(`${this.uri}/artical/addArticalBasicInfo`, data)
  }

  getArticals(company){
    const data = {
      company: company
    }

    return this.http.post(`${this.uri}/artical/getArticals`, data)
  }

  getArtical(articalCode){
    const data = {
      articalCode : articalCode
    }

    return this.http.post(`${this.uri}/artical/getArtical`, data)
  }

  addArticalMoreInfo(articalCode, country, foreinName, barcode, manufacturer, customsTariff, ecoTax, exciseTax, minSupplies, maxSupplies, description, decleration){
    const data = {
      articalCode : articalCode,
      country : country,
      foreinName : foreinName,
      barcode : barcode,
      manufacturer : manufacturer,
      customsTariff : customsTariff,
      ecoTax : ecoTax,
      exciseTax : exciseTax,
      minSupplies : minSupplies,
      maxSupplies : maxSupplies,
      description : description,
      decleration : decleration
    }
    return this.http.post(`${this.uri}/artical/addArticalMoreInfo`, data)
  }

  removeArtical(articalCode){
    const data = {
      articalCode : articalCode
    }

    return this.http.post(`${this.uri}/artical/removeArtical`, data)
  }

  addArticalpricesAndStatus(articalCode, warehouseRegisterName, purchasePrice, sellingPrice, currentStockStatus, minAmount, maxAmount){
    const data = {
      articalCode : articalCode,
      warehouseRegisterName : warehouseRegisterName,
      purchasePrice : purchasePrice,
      sellingPrice : sellingPrice,
      currentStockStatus : currentStockStatus,
      minAmount : minAmount,
      maxAmount : maxAmount
    }
    
    return this.http.post(`${this.uri}/artical/addArticalpricesAndStatus`, data)
  }

  addArticalCategory(articalCode, category, isSub){
    const data = {
      articalCode : articalCode,
      category : category,
      isSub : isSub
    } 

    return this.http.post(`${this.uri}/artical/addArticalCategory`, data)
  }

  getArticalsByObject(company, warehouse, name){
    const data = {
      company : company,
      warehouse : warehouse,
      name : name
    }

    return this.http.post(`${this.uri}/artical/getArticalsByObject`, data)
  }
}
