import { Component, OnInit } from '@angular/core';
import { ContentsService } from '../contents.service';
import { ActivatedRoute } from '@angular/router';
import { ColorInfo, ColorTheme } from '../model/colorInfo';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.scss']
})
export class DetailpageComponent implements OnInit {
  pallete: ColorTheme = null!;
  constructor(private route: ActivatedRoute, private contentsService: ContentsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pallete_id = params.get("pallete_id");
      console.log('pallete_id: ' + pallete_id);
      this.pallete = this.contentsService.getColorTheme(pallete_id);
    });
  }

  setBlockStyles(item: ColorInfo): any {
    let styles:any = {};

    styles.background = `none ${item.code_web}`;
    styles.color = 'rgb(0, 0, 0)';

    return styles;
  }

  setColorPreviewStyle(item: ColorInfo): any {
    let styles:any = {};
    styles.background = `#${item.code_hex}`;
    return styles;
  }

  setShadeStyle(item: ColorInfo): any {
    let styles:any = {};
    styles.color = `#${item.code_hex}`;
    return styles;
  }
}
