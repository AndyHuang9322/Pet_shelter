import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){
  }
  getPets(){
    return this._http.get('/allpet');
  }
  getPet(id:string){
    return this._http.get('/allpet/' + id);
  }
  createPet(pet: any){
    return this._http.post('/allpet/', pet);
  }
  editPet(pet:any){
    return this._http.put('/allpet/' + pet._id, pet);
  }
  deletePet(id:string){
    return this._http.delete('/allpet/' + id);
  }
}