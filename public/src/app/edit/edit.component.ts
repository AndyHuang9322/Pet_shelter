import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet: any;
  updatedPet: any;
  errors: any = [];

  constructor(private _httpService: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.updatedPet = {
      name: '',
      type: '',
      descrition: '',
      skill_1: '',
      skill_2: '',
      skill_3: ''
    }
    this._route.params.subscribe((params: Params) => {
      this.getOnePet(params['id'])
    });
  }

  getOnePet(id: string) {
    this._httpService.getPet(id).subscribe(pet => {
      this.updatedPet = pet['data']
    })
  }
  editPet(id: string) {
    this._httpService.editPet(this.updatedPet).subscribe(response => {
      if (response['message'] == 'Error') {
        console.log(response)
        this.errors = response['error']
      } else {
        console.log(id)
        this._router.navigate(['/pets/'+ id]);
      }
    })
  }
}

