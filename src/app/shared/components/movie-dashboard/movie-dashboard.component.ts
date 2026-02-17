import { Component, Input, OnInit } from '@angular/core';
import { Imovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { SnackBarService } from '../../services/snack-bar.service';


@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {

  movieArr:Array<Imovie> = []
  constructor(private movieService:MovieService,
    private snack:SnackBarService
  ) { }

  ngOnInit(): void {
    this.getAllMovies()
    this.getNewMovie()
    this.removeObj()
    this.getUpdatedObj()
  }

  getAllMovies(){
    this.movieService.fetchAllMovies().subscribe({
      next:data=>{
        this.movieArr = data;
        this.snack.ShowSuccessMsg(` All ${data.length} movies are fetched successfully!!`)
      },
      error:err=>{
          this.snack.ShowError(err)
        
      }
    })
  }

  getNewMovie(){
    this.movieService.emitNewMovie$.subscribe({
      next:data=>{
        this.movieArr.unshift(data)
        this.snack.ShowSuccessMsg(`The movie with id ${data.name} is added successfully`)
      }
    })
  }

  removeObj(){
    this.movieService.emitRemoveId.subscribe({
      next:data=>{
       let getIndex = this.movieArr.findIndex(movie=> movie.id === data)
       this.movieArr.splice(getIndex,1)
       this.snack.ShowSuccessMsg(`The movie with id ${data} is removed successfully!!`)
      }
    })
  }

  getUpdatedObj(){
    this.movieService.emitUpdatedObjs$.subscribe({
      next:data=>{
        let getIndex = this.movieArr.findIndex(movie=> movie.id === data.id)
        this.movieArr[getIndex] = data
        this.snack.ShowSuccessMsg(`The movie with id ${data.id} is updated successfully!!`)
      }
    })
  }


  trackById(index:number, movie:Imovie){
    return movie.id
  }

}
