import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Imovie } from '../models/movie';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

emitNewMovie:Subject<Imovie> = new Subject<Imovie>()
emitRemoveId:Subject<string> = new Subject<string>()
emitEditObj:Subject<Imovie> = new Subject<Imovie>()
emitUpdatedObj:Subject<Imovie> = new Subject<Imovie>()

emitUpdatedObjs$:Observable<Imovie> = this.emitUpdatedObj.asObservable()
emitEditObj$:Observable<Imovie> = this.emitEditObj.asObservable()
emitRemoveId$:Observable<string> = this.emitRemoveId.asObservable()
emitNewMovie$:Observable<Imovie> = this.emitNewMovie.asObservable()

updateObj(movie:Imovie){
  this.emitUpdatedObj.next(movie)
}

EditObj(movie:Imovie){
  this.emitEditObj.next(movie)
}

RemoveId(id:string){
  this.emitRemoveId.next(id)
}

newMovie(movie:Imovie){
  this.emitNewMovie.next(movie)
}

BASE_URL = environment.BASE_URL;
MOVIE_URL = `${this.BASE_URL}/movies.json`
  
constructor(private http:HttpClient) { }

fetchAllMovies(){
  return this.http.get<any>(this.MOVIE_URL)
      .pipe(
        map(Obj=>{
          let movieArr: Array<Imovie> = []
          
          for(const key in Obj){
            movieArr.unshift({...Obj[key],id:key})
          }
          return movieArr
        })
      )
}


createMovie(movie:Imovie):Observable<Imovie>{
  return this.http.post<Imovie>(this.MOVIE_URL,movie)
}

updateMovieObj(movie:Imovie){
    let Update_Url = `${this.BASE_URL}/movies/${movie.id}.json`
    return this.http.patch(Update_Url,movie)
}

}
