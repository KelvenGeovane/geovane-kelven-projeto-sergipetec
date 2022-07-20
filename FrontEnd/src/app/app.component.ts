import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ProjetoSergipeTec';
  displayedColumns: string[] = ['nome', 'email', 'cpf', 'celular', 'telefone', 'enderecos','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllContribuintes();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'50%'
    });
  }

  getAllContribuintes(){
    this.api.getContribuinte()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("error para pegar os dados")
      }
    })
  }

  editarContribuinte(row : any){
    this.dialog.open(DialogComponent,{
      width:'50%',
      data: row
    })
  }

  deleteContribuinte(id:number){
    this.api.deleteContribuinte(id)
    .subscribe({
      next:(res)=>{
        alert("Contribuinte deletado com sucesso")
        this.getAllContribuintes();
      },
      error:()=>{
        alert("Error enquanto deletado")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
