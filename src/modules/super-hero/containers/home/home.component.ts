import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SuperHeroService } from '../../services/super-hero.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  dialogRef:any;
  @ViewChild('deleteModal') deleteModal!:TemplateRef<unknown>;
  @ViewChild('formModal') formModal!:TemplateRef<unknown>;
  @ViewChild('paginator') paginator!:MatPaginator;
  superHeroForm = this.fb.group({
    id:['',Validators.required],
    name:['',Validators.required]
  });
  filterId!:string;
  filter!:string;
  superheroes!:any;
  superheroesBackup!:any;
  displayedColumns: string[] = ['id','name','actions'];
  constructor(private superHeroService:SuperHeroService, private cd:ChangeDetectorRef, private fb:FormBuilder, private dialog:MatDialog){
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

  updateHero(){
    let body = {
      name:this.superHeroForm.controls.name.value
    }
    this.superHeroService.updateHero(body, this.superHeroForm.controls.id.value).subscribe({
      next:response=>{
        console.log(response);
        this.dialogRef.close();
        this.getSuperheroes();
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  deleteHero(){
    console.log(this.superHeroForm.controls.id.value);
    this.superHeroService.deleteHero(this.superHeroForm.controls.id.value).subscribe({
      next:response=>{
        console.log(response);
        this.dialogRef.close();
        this.getSuperheroes();
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  openDialog(operation:string, element:any){
    this.superHeroForm.setValue({
      id:element.id,
      name:element.name
    })
    operation === 'update' ?
    (
    this.dialogRef = this.dialog.open(this.formModal)) : this.dialogRef = this.dialog.open(this.deleteModal);
  }

}
