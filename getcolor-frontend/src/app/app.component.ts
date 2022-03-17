import { Component, ElementRef, ViewChild, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { ContentsService } from './contents/contents.service';
import { TagInfo } from './contents/model/colorInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'getcolor';

  showFilterWindow = false;
  inputText = '';
  inputFilled = false;
  _isMenuHidden = true;

  tagList: TagInfo[] = [];
  COLOR_DATA: TagInfo[] = [];
  COLLECTION_DATA: TagInfo[] = [];

  selectedItemList: TagInfo[] = [];
  inputPlaceHolder = "Search palettes";

  @ViewChild('searchInput') 
  searchInput!:ElementRef;

  @ViewChild('filterContainer')
  filterContainer!: ElementRef;

  @ViewChild('menuButton')
  menuButton!: ElementRef;

  constructor(
    private el: ElementRef,
    private router: Router,
    private renderer: Renderer2,
    private contentsService: ContentsService
    )
  {
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(!this.filterContainer.nativeElement.contains(e.target) ) {
        this.showFilterWindow=false;
      }
      if(!this.menuButton.nativeElement.contains(e.target) ) {
          this._isMenuHidden = true;
      }
    });
  }

  ngOnInit(): void {
    this.contentsService.getTagList({type:'T'}).subscribe(data => {
      this.tagList = data;
    });
    this.contentsService.getTagList({type:'C'}).subscribe(data => {
      this.COLOR_DATA = data;
    });
  }

  ngAfterViewInit() {
  }

  toggleTab(tags: string[]) {
    const tabs = [].slice.call((<HTMLElement>this.el.nativeElement).getElementsByClassName('tab'));
    tabs.forEach((element: HTMLElement) => {
      element.setAttribute('status',
        tags.includes(element.getAttribute('tab') || "") ? 'on' : 'off'
      );
    });
  }

  cickMenu(event: any) {
    const tagName = event.currentTarget.getAttribute('tab');
    this.toggleTab([tagName]);
  }

  onFocusInEvent(event: any){
    this.showFilterWindow = true;
  }

  applyTag(item: any) {
    const idx = this.searchItemInList(item, this.selectedItemList);
    if( idx >= 0 ) {
      this.selectedItemList.splice(idx, 1);
    } else {
      this.selectedItemList.push(item);
    }
      
    this.searchInput.nativeElement.value = '';

    if( this.selectedItemList.length >0 ){
      this.inputPlaceHolder = 'Add tag';
      this.inputFilled = true;
    } else {
      this.inputPlaceHolder = 'Search palettes';
      this.inputFilled = false;
    }
  }

  getSelectedTagIdQuery() {
    var ret = '';
    for(var i=0;i<this.selectedItemList.length;i++){
      if(ret!=''){
        ret += ',';
      }
      ret += this.selectedItemList[i].tag_id;
    }
    return ret;
  }

  searchItemInList(item: TagInfo, list: TagInfo[]) {
    for(var i=0;i<list.length;i++){
      if( list[i].tag_name == item.tag_name ) {
        return i;
      }
    }
    return -1;
  }
  
  toggleTag(item: TagInfo){
    console.log('toggle: ' +item);
    this.applyTag(item);
    
    this.showFilterWindow = false;
    if( this.selectedItemList.length>0) {
      this.router.navigate(['content','tag', this.getSelectedTagIdQuery()]);
    } else {
      this.router.navigate(['content','popular', '']);
    }

    this.toggleTab(this.getSelectedTagArray());
  }

  getSelectedTagArray() {
    var ret = [];
    for(var i=0;i<this.selectedItemList.length;i++){
      ret.push(this.selectedItemList[i].tag_name.toLowerCase());
    }
    return ret;
  }
  onMenuClick(){
    this._isMenuHidden = !this._isMenuHidden;
  }
}
