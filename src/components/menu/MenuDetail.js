import React from 'react';
import { MenuDetailTable0, MenuDetailTable1, MenuDetailTable2, MenuDetailTable3, MenuDetailTable4, MenuDetailTable5 } from './menuDetailTable'
import { BinaryConverter, mapFolderValue, replaceControl, replaceValue, replaceSubject, replaceVolume, generateOutput } from '../sc/scComponentFunction';
import { hexToSignedDecimal } from '../../utils/calculate';
import { processBGMBand } from '../../utils/bgmBand';
import { oneTouch } from '../../utils/checkButton';
import useFileNavigation from '../../fileOperation/useFileNavigation';

const MenuDetail = (props) => {
  const { file, fileContent } = useFileNavigation();
  const id = props.id
  const startIndex = ((id - 1) * 70) + 17 ;
  const tableSet = MenuDetailProcessor({ menu: fileContent?.if_config?.menu || [], id: 0,  startIndex: startIndex });
  
  return (
    <div>
      {file && (
        <div>
            {fileContent && (
              <div>{tableSet.props.fileName?.join('') === '' ?
                <table align='center'>
                  <tbody>
                    <td><b>未登録</b></td>
                  </tbody>
                </table>              
              : tableSet}</div>)}
        </div>
      )}
      {!file && <h2>Lt Page</h2>}
    </div>
  );
};

export default MenuDetail;

export const MenuDetailProcessor = ({ menu, id, startIndex }) => {
  switch (menu[startIndex]) {
    case '00': //コメント再生         
        const fileName = [menu[startIndex+1],menu[startIndex+5],menu[startIndex+9],menu[startIndex+13],menu[startIndex+17]];
        const folder = [menu[startIndex+2],menu[startIndex+6],menu[startIndex+10],menu[startIndex+14],menu[startIndex+18]];
        const transformedFolder = folder.map(mapFolderValue);
        const volume = [menu[startIndex+3],menu[startIndex+7],menu[startIndex+11],menu[startIndex+15],menu[startIndex+19]];
        const transformedVolume = volume.map(hexToSignedDecimal);
        const mixing = [menu[startIndex+4],menu[startIndex+8],menu[startIndex+12],menu[startIndex+16],menu[startIndex+20]];
        const transformedMixing = mixing.map(hexValue => parseInt(hexValue, 16));
        const output = BinaryConverter(menu[startIndex+21]);
        const external = [(menu[startIndex+40] === '00' ? '利用しない' : '利用する'), parseInt(menu[startIndex+41],16), replaceControl(menu[startIndex+42]), parseInt(menu[startIndex+43],16)];
        const channel = [(menu[startIndex+44] === '00' ? '利用しない' : '利用する')];
        const channelName = (() => {
            switch (menu[startIndex+45]) {
                case '00': 
                    const num = parseInt(menu[startIndex+48]) === '00' ? '':parseInt(menu[startIndex+48]); 
                    return `${processBGMBand(menu[startIndex+49])}${num}`;
                case '01':
                    return menu[startIndex+46] === '00' ? '未設定' : `プログラム${menu[startIndex+46]}`;
                case '02':
                    return menu[startIndex+47];
                default:
                    return '不明'
            }
        })();
        channel.push(channelName);
        const input = [menu[startIndex+28],menu[startIndex+29],menu[startIndex+30],menu[startIndex+31],menu[startIndex+32],menu[startIndex+33],menu[startIndex+34],menu[startIndex+35],menu[startIndex+36],menu[startIndex+37],menu[startIndex+38],menu[startIndex+39]];
        const value = oneTouch(menu[15]);
        const ids = value[0].value.split(',').map(Number);
        const valid = ids.includes(id) ? '有効' : '無効';
        const pattern= (() => {
          switch (menu[startIndex+22]) {
            case '00':
              return '分指定(毎時)';
            case '01':
              return '1~99回設定';
            case '02':
              return '連続再生(リピート)';
            default:
              return '不明';
          }
        })();
        const manual = parseInt(menu[startIndex+23],16);
        const hour = menu[startIndex+24]==='18' ? '--' : parseInt(menu[startIndex+24],16);
        const hour2 = menu[startIndex+26]==='18' ? '--' : parseInt(menu[startIndex+25],16);
        const minute1 = menu[startIndex+25]==='3C' ? '--' : parseInt(menu[startIndex+26],16).toString().padStart(2, '0');
        const minute2 = menu[startIndex+27]==='3C' ? '--' : parseInt(menu[startIndex+27],16).toString().padStart(2, '0');
        return <MenuDetailTable0 fileName={fileName} folder={transformedFolder} volume={transformedVolume} mixing={transformedMixing} output={output} external={external} channel={channel} input={input} valid={valid} pattern={pattern} manual={manual} hour={hour} hour2={hour2} minute={minute1} minute2={minute2}/>;
    case '01': //チャンネル変更:9行
        let channel_Name = "";
        if(menu[startIndex+50] === '00') {
          channel_Name = `${processBGMBand(menu[startIndex + 53])}${parseInt(menu[startIndex + 54], 16)}`
        } else if(menu[startIndex+50] === '01') {
          channel_Name = "プログラム" + (menu[startIndex+51] === '00' ? "未設定" : menu[startIndex+51]);  
        } else if(menu[startIndex+50] === '02') {
          channel_Name = menu[startIndex+52];
        }
        const external1 = [(menu[startIndex+55] === '00' ? '利用しない' : '利用する'), parseInt(menu[startIndex+56],16), replaceControl(menu[startIndex+57]), parseInt(menu[startIndex+58],16)];
        return <MenuDetailTable1 channel={channel_Name} external={external1}/>;        
    case '02': //BGM/CMカット:4行
      const cm = BinaryConverter(menu[startIndex+59]);
      const bgm = BinaryConverter(menu[startIndex+60]);
      const minute = BinaryConverter(menu[startIndex+61]);
      return <MenuDetailTable2 cm={cm} bgm={bgm} minute={minute} action={generateOutput(menu[startIndex+62])}/>;        
    case '03': //外部制御:3行
      const external3 = [parseInt(menu[startIndex+63],16), replaceControl(menu[startIndex+64]), parseInt(menu[startIndex+65],16)];
      return <MenuDetailTable3 external3={external3}/>;        
    case '04': //ボリューム:3行
        return <MenuDetailTable4 subject={replaceSubject(menu[startIndex+66])} control={replaceVolume(menu[startIndex+67])} volume={parseInt(menu[startIndex+68],16)}/>;        
    case '05': //AUX:1行
        return <MenuDetailTable5 title="AUX" power={replaceValue(menu[startIndex+69])}/>;        
    default:
      return "";
  }
} 

