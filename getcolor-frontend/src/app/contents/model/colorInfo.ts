export interface ColorInfo {
  code_web: string;
  code_hex: string;
  name: string;
}

export interface ColorTheme {
  pallete_id: string;
  color_set: ColorInfo[];
  tag_list: string[];
  like: number;
  timestamp: string;
}

export interface TagInfo {
  tag_id: string;
  tag_name: string;
  type: string;
  alt: string;
}