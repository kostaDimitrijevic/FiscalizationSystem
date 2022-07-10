import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Category } from '../models/category';
import { Company } from '../models/company';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ArticalService } from '../artical.service';
import { Artical } from '../models/artical';

@Component({
  selector: 'app-artical-arrangement',
  templateUrl: './artical-arrangement.component.html',
  styleUrls: ['./artical-arrangement.component.css']
})
export class ArticalArrangementComponent implements OnInit {

  constructor(private compService : CompanyService, private modalService : NgbModal, private articalService : ArticalService) { }

  ngOnInit(): void {
    this.compService.getAllCategories(localStorage.getItem('username')).subscribe((cat : Category[]) => {
      this.categories = cat
    })

    this.articalService.getArticals(localStorage.getItem('username')).subscribe((articals : Artical[]) => {
      this.articals = articals
    })

  }

  @Input()
  companyInfo : Company

  articals : Artical[] = []

  closeResult = '';
  searchStr : string;
  categorySelected : String;
  isSub : boolean;
  error = false;

  category: String
  selectedCat: String
  categories : Category[]
  subcategory: String

  addCategory(){
    this.compService.addCategory(localStorage.getItem('username'), this.category).subscribe((res) => {
      if(res['message'] == "category added"){
        alert("Uspesno dodata kategorija")
        this.compService.getAllCategories(localStorage.getItem('username')).subscribe((cat : Category[]) => {
          this.categories = cat
        })
      }
      else{
        alert("GRESKA")
      }
    })
  }

  addSubcategory(){
    this.compService.addSubcategory(localStorage.getItem('username'), this.selectedCat, this.subcategory).subscribe((res) => {
      if(res['message'] == 'Subcategory added'){
        alert("Uspesno dodata potkategorija")
        this.compService.getAllCategories(localStorage.getItem('username')).subscribe((cat : Category[]) => {
          this.categories = cat
        })
      }
      else if(res['message'] == 'postoji'){
        alert("GRESKA! Potkategorija sa tim nazivom vec postoji")
      }
      else{
        alert("GRESKA")
      }
    })
  }

  open(content, categorySelected, isSub) {
    this.categorySelected = categorySelected;
    this.isSub = isSub;
    this.articalService.getArticals(localStorage.getItem('username')).subscribe((articals : Artical[]) => {
      this.articals = articals
    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  searchByName(){
    let regex = new RegExp(this.searchStr)

    let searchedArticals : Artical[] = []
    this.articals.forEach(artical => {
      if(artical.articalName.match(regex)){
        searchedArticals.push(artical)
      }
    });

    if(searchedArticals.length > 0){
      this.articals = searchedArticals
    }

  }

  addArticalCategory(articalCode){
    this.articalService.addArticalCategory(articalCode, this.categorySelected, this.isSub).subscribe((res) => {
      if(res['message'] == 'artical updated'){
        alert("artikal je dodat u kategoriju")
        this.error = false;
      }
      else if(res['message'] == 'postoji'){
        this.error = true;
      }
    })
  }
}
