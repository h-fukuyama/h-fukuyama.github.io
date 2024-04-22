import { replaceValue } from "../sc/scComponentFunction"
import { processBGMBand } from "../bgmBand";

export const getActionResult = (lt, startIndex) => {
    if(lt){
        switch(lt[startIndex+2]){
            case '01':
                return '電源 '+replaceValue(lt[startIndex+34]);
            case '02':
                let channel = '';
                if(lt[startIndex+35] === '00') {
                    const num = parseInt(lt[startIndex + 39], 16)===0?'':parseInt(lt[startIndex + 39], 16);
                    channel = `${processBGMBand(lt[startIndex + 38])}${num}`
                } else if(lt[startIndex+35] === '01') {
                    channel = "プログラム" + (lt[startIndex+36] === '00' ? "未設定" : lt[startIndex+36]);  
                } else if(lt[startIndex+35] === '02') {
                    channel = lt[startIndex+37];
                }
                return 'チャンネル変更 '+channel;
            case '03':
                return '外部制御'+parseInt(lt[startIndex+44])+' '+replaceValue(lt[startIndex+45]);
            default:
                return lt[startIndex];
        }
    }
}