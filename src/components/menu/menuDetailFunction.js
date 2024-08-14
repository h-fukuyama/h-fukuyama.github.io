import { processBGMBand } from "../../utils/bgmBand";
import { oneTouch } from "../../utils/checkButton";
import { mapFolderValue } from "../sc/scProcessorFunction";
import { hexToSignedDecimal } from "../../utils/calculate";

export const getChannelName = (menu, startIndex) => {
  console.log(menu[startIndex + 45])
    switch (menu[startIndex + 45]) {
      case '00':
        const num = parseInt(menu[startIndex+48]) === '00' ? '':parseInt(menu[startIndex+49],16); 
        console.log(num)
        return `${processBGMBand(menu[startIndex + 48])}${num}`;
      case '01':
        return menu[startIndex + 46] === '00' ? '未設定' : `プログラム${menu[startIndex + 46]}`;
      case '02':
        return menu[startIndex + 47];
      default:
        return '不明';
    }
  };

  export const getValidStatus = (menu, id) => {
    const value = oneTouch(menu[15]);
    const ids = value[0].value.split(',').map(Number);
    return ids.includes(id) ? '有効' : '無効';
  };
  
  export const getPattern = (menu, startIndex) => {
    switch (menu[startIndex + 22]) {
      case '00':
        return '分指定(毎時)';
      case '01':
        return '1~99回設定';
      case '02':
        return '連続再生(リピート)';
      default:
        return '不明';
    }
  };

  export const parseTime = (time) => time === '18' ? '--' : parseInt(time).toString().padStart(2, '0');

  export const mapFolder = (value) => mapFolderValue(value);
  export const parseVolume = (value) => hexToSignedDecimal(value);
  export const parseMixing = (value) => parseInt(value, 16);