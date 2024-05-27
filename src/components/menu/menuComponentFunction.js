import { processBGMBand } from "../../utils/bgmBand";
import { replaceValue, replaceVolume, generateOutput } from "../sc/scComponentFunction";

export const replacePattern = (value) => {
  switch (value) {
    case '00':
      return "分指定再生";
    case '01':
      return "1~99回数指定再生";
    case '02':
      return "連続再生";  
    default:
      return value; // 何も該当しない場合は元の値をそのまま返す
  }
};

export const replaceEQ = (value) => {
  switch (value) {
    case 0:
      return "Lo";
    case 1:
      return "Mid";
    case 2:
      return "Hi";  
    default:
      return value; // 何も該当しない場合は元の値をそのまま返す
  }
};

export const eqSetting = (value) => {
  switch (value) {
    case '00':
      return "マニュアル";
    case '01':
      return "POPS";
    case '02':
      return "ROCK";
    case '03':
      return "JAZZ/FUSION";
    case '04':
      return "VOCAL";
    case '05':
      return "CLUB/DANCE";  
    case '06':
      return "CAFE";
    case '07':
      return "LOUNGE";
    case '08':
      return "CLASSIC";     
    case '09':
      return "HEALING";
    case '0A':
      return "イージーリスニング/インスト";      
    default:
      return value; // 何も該当しない場合は元の値をそのまま返す
  }
};

  export const getActionResult = (menu, i) => {
    switch (menu[i]) {
      case '01':
        let channel = "";
        if(menu[i+50] === '00') {
          const num = menu[i+54]==='00'?"":parseInt(menu[i+54],16);
          channel = `${processBGMBand(menu[i + 53])}${num}`
        } else if(menu[i+50] === '01') {
          channel = "プログラム" + (menu[i+51] === '00' ? "未設定" : menu[i+51]);  
        } else if(menu[i+50] === '02') {
          channel = menu[i+52];
        }
        return ["チャンネル変更", channel];     
      case '02':
        return ["BGM/CMカット", `${generateOutput(menu[i + 62])}`];  
      case '03':
        return [`外部制御${parseInt(menu[i + 63], 16)}`, `${replaceValue(menu[i + 64])}`];    
      case '04':
        return ["ボリューム", `${replaceVolume(menu[i + 67])}`];      
      case '05':
        return ["AUX", `${replaceValue(menu[i + 69])}`];
      default:
        return ["不明", menu[i]];
    }
  };