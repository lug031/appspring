import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../modelo/tarea';
import { environment  } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TareaService {
  url:string = environment.baseUrl
  constructor(private http:HttpClient) { }
    public getTareas(){
      return this.http.get<Tarea[]>(this.url+'/tarea')
    }

    public addTarea(obj:Tarea){
      return this.http.post<Tarea>(this.url+'/tarea',obj)
    }

    public deleteTarea(id:string){
      return this.http.delete(this.url+`/tarea/${id}`)
    } 

    public getTarea(id:string){
      return this.http.get<Tarea>(this.url+`/tarea/${id}`)
    }

    public updateTarea(obj:any){
      return this.http.put(this.url+'/tarea',obj);
    }
}
