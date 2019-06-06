import { Component } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timer1';
  sec:Observable<number>;
  min:Observable<number>;
  hour:Observable<number>;
  secs:number;
  minutes:number;
  houres:number;
  difference:number;
  aSub1:Subscription;
  aSub2:Subscription;
  aSub3:Subscription;
  new:number[]=[];


  constructor(){
    this.sec=timer(0,1000);
    this.min=timer(0,60000);
    this.hour=timer(0,3600000)
  }

  ngOnInit(){

  }

  start(){
    // this.aSub1=combineLatest([this.sec,this.min,this.hour]).subscribe((value:[number,number,number])=>{
    //   this.secs=value[0],
    //   this.minutes=value[1],
    //   this.houres=value[2]
    // })
     this.aSub1=this.sec.subscribe(e=>this.secs=e);
     this.aSub2=this.min.subscribe(e=>this.minutes=e);
     this.aSub3=this.hour.subscribe(e=>this.houres=e);

  }
  stop(){
    if(this.aSub1 && this.aSub2 && this.aSub3){
      this.aSub1.unsubscribe();
      this.aSub2.unsubscribe();
      this.aSub3.unsubscribe();
    }
  }

  reset(){
    if(this.aSub1 && this.aSub2 && this.aSub3){
      this.aSub1.unsubscribe();
      this.aSub2.unsubscribe();
      this.aSub3.unsubscribe();
      this.secs=0;
      this.minutes=0;
      this.houres=0;
    }
  }
  wait(event:Event){
    // const id=document.querySelector('#wait');
    // fromEvent(id,'click').subscribe(e=>{ return this.new.push(e.timeStamp)});
    this.new.push(event.timeStamp)
  }
  ngDoCheck(){
    if(this.secs>=60){
      this.secs=0;
      this.aSub1.unsubscribe();
      this.aSub1=this.sec.subscribe(e=>this.secs=e);
    }
    else if(this.minutes>=60){
      this.minutes=0;
      this.aSub2.unsubscribe();
      this.aSub2=this.min.subscribe(e=>this.minutes=e);
    }
    else if(this.new.length==2 && (this.new[1]-this.new[0]) <= 300){
      this.aSub1.unsubscribe();
      this.aSub2.unsubscribe();
      this.new=[];
    }
  }
}
