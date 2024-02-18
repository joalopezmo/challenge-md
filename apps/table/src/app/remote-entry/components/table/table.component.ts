import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SharedMaterialUiModule } from '@challenge-md/ui';
import { BehaviorSubject } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { TableServiceService } from '../../services/table-service.service';
import { ModalAddComponent } from './modal-add/modal-add.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';

@Component({
  selector: 'challenge-md-table',
  standalone: true,
  imports: [
    CommonModule,
    SharedMaterialUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogContent,
    ModalAddComponent,
    ModalEditComponent,
  ],
  providers: [TableServiceService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  heroes: BehaviorSubject<Heroe[]> = new BehaviorSubject<Heroe[]>([]);
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'action'];
  dataSource = new MatTableDataSource<Heroe>([]);
  form!: FormGroup;

  constructor(
    private tableService: TableServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tableService.getHeroes().subscribe((response: any) => {
      this.heroes.next(response);
      this.dataSource = new MatTableDataSource<Heroe>(this.heroes.value);
    });
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  getHeroes() {
    this.tableService.getHeroes().subscribe((heroes) => {
      console.log(JSON.stringify(heroes));
      this.heroes.next(heroes);
      this.dataSource = new MatTableDataSource<Heroe>(heroes);
    });
  }

  filterHeroes(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    const filteredHeroes = this.heroes.value.filter((heroe) => {
      return (
        heroe.nombre.toLowerCase().includes(filterValue) ||
        heroe.descripcion.toLowerCase().includes(filterValue) ||
        heroe.id.toString().includes(filterValue)
      );
    });
    //se actualiza la tabla
    this.heroes.next(filteredHeroes);
    this.dataSource.data = filteredHeroes;
    //si el valor del filtro es vacio, se vuelven a mostrar todos los heroes
    if (filterValue === '') {
      this.getHeroes();
    }
  }

  openEdit(heroe: Heroe) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '250px',
      data: { heroe }, // Pasamos el héroe al modal a través de la propiedad data
    });
    dialogRef.afterClosed().subscribe((result: Heroe | undefined) => {
      if (result) {
        // Si se ha devuelto un héroe modificado desde el modal, actualizamos el héroe en la lista
        this.tableService.updateHeroe(result).subscribe((updatedHeroes) => {
          // Actualizamos la lista de héroes en el componente
          this.getHeroes();
        });
      }
    });
  }

  openAdd() {
    // const heroe = {} as Heroe;
    // this.addHeroe(heroe);
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '250px',
      data: { heroe: {} as Heroe },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tableService.addHeroe(result).subscribe(() => {
          // this.heroes.next(result);
          // this.dataSource = new MatTableDataSource(result);
          this.getHeroes();
        });
      }
    });
  }
  deleteHeroe(heroe: Heroe) {
    this.tableService.deleteHeroe(heroe.id).subscribe(() => {
      this.getHeroes();
    });
  }
  addHeroe(heroe: Heroe) {
    //abre el mat-dialog de añadir heroe, lee el formulario reactivo y envia el post en el servicio
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '250px',
      data: { heroe },
    });
    if (this.form.valid) {
      heroe.id = this.heroes.value.length + 1;
      heroe.nombre = this.form.get('nombre')?.value;
      heroe.descripcion = this.form.get('descripcion')?.value;
      this.tableService.addHeroe(heroe).subscribe((result) => {
        //se actualiza la tabla
        this.heroes.next(result);
        this.dataSource = new MatTableDataSource(result);
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dialogRef.afterClosed().subscribe(() => {});
  }
}
