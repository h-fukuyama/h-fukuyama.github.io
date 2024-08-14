import { replacePattern } from "./menuFunction";
import { processBGMBand } from "../../utils/bgmBand";
import { replaceValue, replaceVolume, generateOutput } from "../sc/scProcessorFunction";

export const menuProcessor3 = ({ menu }) => {
    const datasets = [];
    for (let i = 17; i < 996; i += 70) {
      if (menu[i]==='00') {
        const dataset = [menu[i + 1], menu[i + 5], menu[i + 9], menu[i + 13], menu[i + 17]];
        const firstArrayValue = dataset.find(value => value !== "");
        datasets.push([
          ((i - 17) / 70) + 1,
          firstArrayValue ? replacePattern(menu[i+22]) : "<未登録>",
          firstArrayValue || "",
        ]); 
      } else {
        const actionResult = getActionResult(menu, i);
        datasets.push([((i -17 )/70)+1, ...actionResult]);
      }
    }
    return datasets;
  };

const getActionResult = (menu, i) => {
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