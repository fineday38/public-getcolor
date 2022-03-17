import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ContentsService } from './contents.service';
import { ActivatedRoute } from '@angular/router';
import { ColorInfo, ColorTheme } from './model/colorInfo';
import { toRGB, toHex } from '../util/colorUtil';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private contentsService: ContentsService) { }

  colorThemes:ColorTheme[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.colorThemes = [];
      const type = this.getTabType(params);
      const tag_id = params.get("tag_id");

      console.log('listen: type: ' + type + ' tag_id: '+tag_id);

      const paramset = {type, tag_id}
      this.contentsService.getColorThemeList(paramset).subscribe(data => {

        var ret = [];
        for(var i =0; i<data.length; i++) {
          var item:any = {};
          var colorset = 
          [
            {code_web:toRGB(data[i].c0), code_hex:toHex(data[i].c0), name:''},
            {code_web:toRGB(data[i].c1), code_hex:toHex(data[i].c1), name:''},
            {code_web:toRGB(data[i].c2), code_hex:toHex(data[i].c2), name:''},
            {code_web:toRGB(data[i].c3), code_hex:toHex(data[i].c3), name:''},
          ];
          item['pallete_id'] = data[i].id;
          item['color_set'] = colorset;
          item['like'] = data[i].like;
          item['timestamp'] = data[i].created_time;
          ret.push(item);
        }
        this.colorThemes = ret;
        this.contentsService.colorThemes = ret;
  
        console.log(data);
      });
    })
  }
  ngAfterViewInit(): void {
    
  }

  getTabType(params: any): string {
    let type = params.get("type")
    if(!type) {
      type = "new";
    }
    return type;
  }

  getTagType(params: any): string {
    let type = params.get("tag")
    if(!type) {
      type = "new";
    }
    return type;
  }

  likePallete(item: any) {
    item.like = item.like+1;
    const paramset = {pallete_id: item.pallete_id};
    this.contentsService.likePallete(paramset).subscribe(data => {
    });
  }
}
