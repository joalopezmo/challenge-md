//crear el modal-edit component

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialUiModule } from '@challenge-md/ui';
import { Heroe } from '../../../interfaces/heroe.interface';
import { TableServiceService } from '../../../services/table-service.service';
@Component({
  selector: 'challenge-md-modal-edit',
  standalone: true,
  imports: [SharedMaterialUiModule, ReactiveFormsModule],
  providers: [TableServiceService],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.scss',
})

export class ModalEditComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe,
    private tableService: TableServiceService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl(this.data.nombre, [Validators.required]),
      descripcion: new FormControl(this.data.descripcion, [Validators.required]),
    });
  }

  save() {
    if (this.form.valid) {
      // this.tableService.updateHeroe({ ...this.data, ...this.form.value }).subscribe((heroe) => {
      //   this.dialogRef.close(heroe);
      // });
      // si el form es valido pasa el heroe al componente que invoco al modal y cierra el dialogo
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }
}