import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ContentsService } from '../../contents/contents.service';
import { TagInfo } from '../../contents/model/colorInfo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  tagList: TagInfo[] = [];

  constructor(private el: ElementRef, private contentsService: ContentsService) { 
  }

  ngOnInit(): void {
    this.contentsService.getTagList({type:'T'}).subscribe(data => {
      this.tagList = data;
    });
  }

  ngAfterViewInit() {
  }

  cickMenu(event: any) {
    console.log(event);
    const tabs = [].slice.call((<HTMLElement>this.el.nativeElement).getElementsByClassName('tab'));
    tabs.forEach((element: HTMLElement) => {
      if( element == event.currentTarget ) {
        event.currentTarget.setAttribute('status', 'on');
      } else {
        element.setAttribute('status', 'off');
      }
    });
    
  }
}
