import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from './add-note/add-note.component';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coa-notes',
  templateUrl: './coa-notes.component.html',
  styleUrls: ['./coa-notes.component.scss']
})
export class CoaNotesComponent implements OnInit{


  constructor(
    private dialogue:MatDialog,
    private msg:NotificationService,
    private http:HttpClient,
    private globalData:GlobalDataModule
  ){}


  ngOnInit(): void {
   
    this.getNotes();
  }


  notesData:any;



  getNotes(){
    this.http.get(environment.mallApiUrl+'GetNote').subscribe(
      (Response )=>{
        this.notesData = Response;

      }
      
    )
  }



  editNote(row:any){
    this.dialogue.open(AddNoteComponent,{
      width:"40%",
      data:row,
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getNotes();
      }
    })
  }
    
  


 /////////////////////////////////////////////////

 deleteNote(row:any){


  Swal.fire({
    title:'Alert!',
    text:'Confirm to Delete the Data',
    position:'center',
    icon:'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
  }).then((result)=>{
    if(result.isConfirmed){

      //////on confirm button pressed the api will run
      this.http.post(environment.mallApiUrl+'DeleteNote',{
        AutoID: row.autoID,
       NoteID: row.noteID,
      UserID: this.globalData.getUserID(),
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Deleted Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.getNotes();
          }else{
            this.msg.WarnNotify(Response.msg);
          }
        },
        (Error)=>{
        
        }
      )
    }
  });



 
}


  OpenDialogue(){
    this.dialogue.open(AddNoteComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
    
      if(val == 'Update'){
        this.getNotes();
      }

    })
  }
}
