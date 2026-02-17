import { Component, Input, OnInit } from '@angular/core';
import { Imovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movieObj!:Imovie
  constructor(private movieService:MovieService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  onEdit(){
    this.movieService.EditObj(this.movieObj)
  }

  onRemove(){
    let matConfig = new MatDialogConfig()
    matConfig.width = '500px',
    matConfig.disableClose = true,
    matConfig.data= `Are you sure, you want to remove this post with id ${this.movieObj.id}`
    let matDialogRef = this.matDialog.open(GetConfirmComponent,matConfig)
    matDialogRef.afterClosed().subscribe(flag=>{
      this.movieService.RemoveId(this.movieObj.id)
    })
  }

}
