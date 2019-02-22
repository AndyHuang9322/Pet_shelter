import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  pet: any;
  selectPet: any;
  like= false;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getOnePet(params['id'])
      this.selectPet = {
        name: '',
        type: '',
        descrition: '',
        skill_1: '',
        skill_2: '',
        skill_3: ''
      }
    });
  }

  getOnePet(id: string) {
    this._httpService.getPet(id).subscribe(pet => {
      this.selectPet = pet['data']
    })
  }
  likePet(id:string){
    this._httpService.getPet(id).subscribe(pet => {
      pet['data'].likes +=1
      this.selectPet = pet['data']
      this.like= true;
    })
  }
  deletePet(id:string){
    this._httpService.deletePet(id).subscribe(pet=> this.pet=pet['data'])
    this.goHome();
  }
  goHome(){
    this._router.navigate(['']);
  }
}