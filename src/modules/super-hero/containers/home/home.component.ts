import { Component, OnInit } from '@angular/core';
import { SuperHeroService } from '../../services/super-hero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private superHeroService:SuperHeroService){
    this.superHeroService.updateHero().subscribe({
      next:response=>{
        console.log(response);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    
  }

}
