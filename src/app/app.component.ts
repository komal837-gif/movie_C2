import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'movie_C2';
  isLoading:boolean = false;

  constructor( private loaderService:AuthService){}
  ngOnInit(): void {
    this.loaderService.emitLoadingState$.subscribe(res=>{
      console.log(res);
      
      this.isLoading= res;
    })
  }

}
