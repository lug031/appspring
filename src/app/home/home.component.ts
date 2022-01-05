import { Component, OnInit } from '@angular/core';
import { Tarea } from '../modelo/tarea';
import { TareaService } from '../servicio/tarea.service'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tareas:Tarea[] = [
    
  ];
  id=''
  disableInput: boolean = false;
  confirm: boolean = false;
  dataTareaSelect: any;
  tareaForm = new FormGroup({
    nombre: new FormControl(''),
    estado: new FormControl('')
  })

  constructor(private servicio:TareaService) { }

  ngOnInit(): void {
    this.getTareas();
  }

  private getTareas(){
    this.servicio.getTareas().subscribe(res => {
      console.log(res)
      this.tareas = res
    },error=>{
      console.log(error)
    })
  }

  public addTarea(){
    this.tareaForm.value.estado = false;
    this.servicio.addTarea(this.tareaForm.value)
    .subscribe(res => {
      this.tareas.push(res)
      this.tareaForm.reset('')
    },error => {
      console.log(error)
    })
  }

  public deleteTarea(id:string, estado: any){
    this.confirm = true;
    this.dataTareaSelect = id;
    if(estado == true) {
      this.servicio.deleteTarea(id).subscribe(()=>{
        this.getTareas()
      },error => {
        console.log(error)
      })
    }
  }

  public getTarea(id:string){
    this.servicio.getTarea(id).subscribe(res =>{
      const {id,nombre,estado} =res
      this.id = id
      this.tareaForm.setValue({nombre,estado})
    },error =>{
      console.log(error)
    })
  }

  public updateTarea(){
    let obj = this.tareaForm.value
    obj.id = this.id
    /* this.servicio.updateTarea(obj).subscribe(()=>{
      this.getTareas()
      this.tareaForm.reset('')
    },error => {
      console.log(error)
    }) */
  }

  editarTarea(tarea: any, index: any): void {
    console.log(tarea);
    
    tarea.estadoEdit = (tarea.estadoEdit == true) ? false : true;
    this.servicio.updateTarea(tarea).subscribe(()=>{
      this.getTareas()
      this.tareaForm.reset('')
    },error => {
      console.log(error)
    })
  }

  cambiarEstado(tarea: any): void {
    tarea.estadoEdit = (tarea.estadoEdit == true) ? false : true;
  }
  closeConfirm(): void {
    setTimeout(() => {
      this.confirm = false;
    }, 500)
  }
}
