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

@Component({
  selector: 'challenge-md-table',
  standalone: true,
  imports: [
    CommonModule,
    SharedMaterialUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogContent,
  ],
  providers: [TableServiceService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  heroes: BehaviorSubject<Heroe[]> = new BehaviorSubject<Heroe[]>([]);
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  dataSource = new MatTableDataSource<Heroe>([]);
  form!: FormGroup;

  constructor(
    private tableService: TableServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tableService.getHeroes().subscribe((response: any) => {
      console.log(response);
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
    // this.dataSource = new MatTableDataSource<machine>(this.machines.value);
    this.dataSource.data = filteredHeroes;
    //si el valor del filtro es vacio, se vuelven a mostrar todos los heroes
    if (filterValue === '') {
      this.getHeroes();
    }
  }

  sortHeroes(sort: string) {
    this.tableService.sortHeroes(sort).subscribe((heroes) => {
      this.heroes.next(heroes);
      this.dataSource = new MatTableDataSource(heroes);
    });
  }

  searchHeroe(term: string) {
    this.tableService.searchHeroe(term).subscribe((heroes) => {
      this.heroes.next(heroes);
      this.dataSource = new MatTableDataSource(heroes);
    });
  }

  openEdit(heroe: Heroe) {
    const dialogRef = this.dialog.open(MatDialogContent);
    if (this.form.valid) {
      this.tableService.updateHeroe(heroe).subscribe(() => {
        this.getHeroes();
      });
    }
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAdd() {
    const heroe = {} as Heroe;
    this.addHeroe(heroe);
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
      this.tableService.addHeroe(heroe).subscribe(() => {
        this.getHeroes();
      });
    }
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
