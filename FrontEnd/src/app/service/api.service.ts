import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postContribuinte(data : any){
    return this.http.post<any>("http://localhost:3000/contribuintes/", data);
  }

  getContribuinte(){
    return this.http.get<any>("http://localhost:3000/contribuintes/");
  }

  deleteContribuinte(id:number){
    return this.http.delete<any>("http://localhost:3000/contribuintes/"+id);
  }
}
