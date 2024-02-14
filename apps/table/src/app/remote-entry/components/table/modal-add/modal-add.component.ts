//crear el modal-add component

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TableServiceService } from '../../services/table-service.service';


@Component({
  selector: 'challenge-md-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})

export class ModalAddComponent implements OnInit {
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalAddComponent>, private tableService: TableServiceService) {}

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  save() {
    if (this.form.valid) {
      this.tableService.addHeroe(this.form.value).subscribe((heroe) => {
        this.dialogRef.close(heroe);
      });
    }
  }
}