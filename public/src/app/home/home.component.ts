import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formHeader = 'New Pet'
  pets = [];
  pet: any;
  newPet: any;
  updatedPet: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllPets();
  }

  getAllPets(){
    this._httpService.getPets().subscribe(all_pets=> this.pets=all_pets['data'])
  }
}
