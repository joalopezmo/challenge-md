import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedMaterialUiModule } from '@challenge-md/ui';
import { BehaviorSubject } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { TableServiceService } from '../../services/table-service.service';

@Component({
  selector: 'challenge-md-table',
  standalone: true,
  imports: [CommonModule, SharedMaterialUiModule, HttpClientModule],
  providers: [TableServiceService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  heroes: BehaviorSubject<Heroe[]> = new BehaviorSubject<Heroe[]>([]);
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  dataSource = new MatTableDataSource<Heroe>([]);

  constructor(private tableService: TableServiceService) {}

  ngOnInit() {
    this.tableService.getHeroes().subscribe((heroes) => {
      console.log(heroes);
      this.heroes.next(heroes);
      this.dataSource = new MatTableDataSource(heroes);
    });
  }

  getHeroes() {
    this.tableService.getHeroes().subscribe((heroes) => {
      this.heroes.next(heroes);
      this.dataSource = new MatTableDataSource(heroes);
    });
  }

  getHeroeById(id: number) {
    this.tableService.getHeroeById(id).subscribe((heroe) => {
      console.log(heroe);
      if (heroe) {
        this.heroes.next([heroe]);
        this.dataSource = new MatTableDataSource([heroe]);
      }
    });
  }

  filterHeroes(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    const filteredHeroes = this.heroes.value.filter((heroe) => {
      return (
        heroe.id ||
        heroe.nombre.toLowerCase().includes(filterValue) ||
        heroe.descripcion.toLowerCase().includes(filterValue)
      );
    });
    //se actualiza la tabla
    this.heroes.next(filteredHeroes);
    // this.dataSource = new MatTableDataSource<machine>(this.machines.value);
    this.dataSource.data = filteredHeroes;
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
}
