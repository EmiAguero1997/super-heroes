import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SuperHeroService } from '../../services/super-hero.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator') paginator!:MatPaginator;
  filterId!:string;
  filter!:string;
  superheroes!:any;
  superheroesBackup!:any;
  displayedColumns: string[] = ['id','name','actions'];
  constructor(private superHeroService:SuperHeroService, private cd:ChangeDetectorRef){
    this.getSuperheroes();
  }

  ngOnInit(): void {
    
  }

  getSuperheroes(){
    this.superHeroService.getHeroes().subscribe({
      next:response=>{
        console.log(response);
        this.superheroes = response;
        this.superheroesBackup = this.superheroes;
        this.cd.detectChanges();
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  onPageChange(event:any) {
    // update your dataSource with the appropriate data based on the selected page
    this.superheroes = this.superheroesBackup;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.superheroes = this.superheroes.slice(startIndex, endIndex);
  }

  async search(){
    this.superheroes = await this.superHeroService.getByString(this.filter);
    this.cd.detectChanges();
  }

  searchById(){
    this.superHeroService.getOneHero(this.filterId).subscribe({
      next:response=>{
        this.superheroes = [response];
        this.cd.detectChanges();
      },
      error:error=>{
        console.log(error);
        this.cd.detectChanges();
      }
    })
  }

  clearFilter(){
    this.filter = '';
    this.superheroes = this.superheroesBackup;
    this.paginator._changePageSize(5);
    this.cd.detectChanges();
  }

  clearFilterId(){
    this.filterId = '';
    this.superheroes = this.superheroesBackup;
    this.paginator._changePageSize(5);
    this.cd.detectChanges();
  }

}
