//crear el modal-add component

import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialUiModule } from '@challenge-md/ui';
import { TableServiceService } from '../../../services/table-service.service';

@Component({
  selector: 'challenge-md-modal-add',
  standalone: true,
  imports: [SharedMaterialUiModule, FormsModule, ReactiveFormsModule],
  providers: [TableServiceService],
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalAddComponent>,
    @Inject(TableServiceService) private tableService: TableServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  save() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.tableService.addHeroe(this.form.value).subscribe((heroe) => {
        //se crea el heroe y se le asigna los valores del formulario
        this.dialogRef.close(heroe);
      });
    }
  }
}
