import { Component, OnInit } from '@angular/core';
import { LifeStyleService } from '../../services/lifestyle.service';
import { LifeStyle } from '../../entity/lifestyle';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.css'],
  providers:[LifeStyleService]
})
export class LifestyleComponent implements OnInit {
  public readLife:boolean=false;
  public isNewRecord: boolean = true;
  public editorValue: string = '';
  public date:string;
  public id:number;
  public lifeStyles:LifeStyle[];
  constructor(private lifeStyleService:LifeStyleService) { }

  ngOnInit() {
    this.date=new Date().toISOString().split("T")[0];
  }

  save(){
    let lifeStyle=new LifeStyle(null,new Date(Date.parse(this.date)),this.editorValue);
    this.lifeStyleService.saveLifeStyle(lifeStyle)
  }
  update(){
    let lifeStyle=new LifeStyle(this.id,new Date(Date.parse(this.date)),this.editorValue);
    this.lifeStyleService.updateLifeStyle(lifeStyle)
  }
  delete($event){
    this.lifeStyleService.deleteLifeStyle($event.srcElement.parentElement.parentElement.id).subscribe(e=>{
      this.listALL();  
    });
    
  }
  edit($event){
    this.lifeStyleService.getLifeStyle($event.srcElement.parentElement.parentElement.id).subscribe(life => this.setlifeDetails(life))
    
  }
  setlifeDetails(life){
    this.editorValue=life.id;
    this.date=new Date(Date.parse(life.date)).toISOString().split('T')[0];
    this.editorValue=life.text;
    this.readLife=false;
  }
  listALL(){
    this.lifeStyleService.getLifeStyles().subscribe(l=>this.lifeStyles=l);
  }
  readlife(){
    this.listALL();
    this.readLife=true;
    //console.log("asdasd");
  }  
  addlife(){
    this.readLife=false;
  }  

}
