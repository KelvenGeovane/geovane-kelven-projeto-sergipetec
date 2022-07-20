import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  contribuinteForm !: FormGroup;
  enderecos !: FormGroup;
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.contribuinteForm = this.formBuilder.group({
      nome : ['', Validators.required],
      email : ['', Validators.required],
      cpf : ['', Validators.required],
      telefone : ['', Validators.required],
      celular : ['', Validators.required],

      enderecos : this.formBuilder.group({
        rua : ['', Validators.required],
        numero : ['', Validators.required],
        bairro : ['', Validators.required],
        cidade : ['', Validators.required],
        cep : ['', Validators.required],
        estado : ['', Validators.required],
        pais : ['', Validators.required]
      })
    })

    if(this.editData){
      this.contribuinteForm.controls['nome'].setValue(this.editData.nome);
      this.contribuinteForm.controls['email'].setValue(this.editData.email);
      this.contribuinteForm.controls['cpf'].setValue(this.editData.cpf);
      this.contribuinteForm.controls['telefone'].setValue(this.editData.telefone);
      this.contribuinteForm.controls['celular'].setValue(this.editData.celular);
      this.contribuinteForm.controls['rua'].setValue(this.editData.rua);
      this.contribuinteForm.controls['numero'].setValue(this.editData.numero);
      this.contribuinteForm.controls['bairro'].setValue(this.editData.bairro);
      this.contribuinteForm.controls['cidade'].setValue(this.editData.cidade);
      this.contribuinteForm.controls['cep'].setValue(this.editData.cep);
      this.contribuinteForm.controls['estado'].setValue(this.editData.estado);
      this.contribuinteForm.controls['pais'].setValue(this.editData.pais);
    }
  }

  adicionarContribuinte(){
    if(this.contribuinteForm.valid){
      this.api.postContribuinte(this.contribuinteForm.value)
      .subscribe({
        next:(res)=>{
          alert("Contribuinte adicionado !")
          this.contribuinteForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error ao adicionar !")
        }
      })
    }
  }

}
