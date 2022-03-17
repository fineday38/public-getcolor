import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ContentsService } from '../../contents/contents.service';
import { TagInfo } from '../../contents/model/colorInfo';
import { Router } from '@angular/router';

// const COLOR_DATA_SET: TagInfo[] = [
//   {tag_id: '', tag_name: 'Blue', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Green', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Red', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Pink', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Black', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Yellow', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Orange', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'White', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Brown', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Purple', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Beige', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Navy', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Peach', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Teal', type: 'color', alt: ''},
//   {tag_id: '', tag_name: 'Marron', type: 'color', alt: ''},
// ];

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, AfterViewInit {
  showFilterWindow = false;
  COLOR_DATA: TagInfo[] = [];//COLOR_DATA_SET;
  COLLECTION_DATA: TagInfo[] = [];//COLLECTION_DATA_SET;

  tagList: TagInfo[] = [];

  inputText = '';
  inputFilled = false;

  _isMenuHidden = true;

  @ViewChild('searchInput') 
  searchInput!:ElementRef;

  @ViewChild('filterContainer')
  filterContainer!: ElementRef;

  @ViewChild('menuButton')
  menuButton!: ElementRef;

  selectedItemList: TagInfo[] = [];
  inputPlaceHolder = "Search palettes";
  constructor(private el: ElementRef, 
    private renderer: Renderer2, 
    private contentsService: ContentsService,
    private router: Router) {
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
      this.COLLECTION_DATA = data;
    });
    this.contentsService.getTagList({type:'C'}).subscribe(data => {
      this.COLOR_DATA = data;
    });
  }

  ngAfterViewInit() {
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

  getSelectedItemList() {
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
    this.router.navigate(['content','tag', this.getSelectedItemList()]);
  }

  onMenuClick(){
    this._isMenuHidden = !this._isMenuHidden;
    // if ( $('.littleMenu.hidden').length == 1 ) {
    //   $('.kebab').attr('status','on');
    //   $('.littleMenu').removeClass('hidden');
    // } else {
    //   $('.kebab').attr('status','off');
    //   $('.littleMenu').addClass('hidden');
    // }
  }
}
