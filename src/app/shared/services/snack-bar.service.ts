import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar:MatSnackBar) { }

  ShowSuccessMsg(msg:string){
    this.snackBar.open(msg,'Close',{
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration:1500,
      panelClass:['success-snackBar']
    })
  }

  ShowError(err:any){
    this.snackBar.open(err,'Close',{
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration:1500,
      panelClass:['error-snackBar']
    })
  }
}
