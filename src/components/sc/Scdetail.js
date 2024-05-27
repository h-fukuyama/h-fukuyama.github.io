import React from 'react';
import { ScDetailTable0, ScDetailTable1, ScDetailTable2, ScDetailTable3, ScDetailTable4, ScDetailTable5, ScDetailTable6 } from './ScDetailTable';
import { BinaryConverter, mapFolderValue, replaceControl, replaceValue, replaceSubject, replaceVolume, generateOutput } from './scComponentFunction';
import { hexToSignedDecimal } from '../../utils/calculate';
import { processBGMBand } from '../../utils/bgmBand';
import useFileNavigation from '../../fileOperation/useFileNavigation';

const ScDetail = (props) => {
  const { file, fileContent } = useFileNavigation();
  const  id  = props.id;
  const tableSet = ScDetailProcessor({ sc: fileContent?.if_config?.sc || [], id: id>16? (id - 101) * 56 : ((id - 1) * 56)+44800 });
  const tableSet2 = ScDetailProcessor({ sc: fileContent?.if_config?.sc || [], id: id>16? ((id - 101) * 56)+22400 : ((id - 1) * 56)+45248 });
  return (
    <div>
      {file && (
        <div>
          {fileContent && (
              <div>
                <h4 align='left'>呼出</h4>
                {tableSet.props.fileName?.join('') === '' ? 
                  <table align='center'>
                    <tbody>
                      <td><b>未登録</b></td>
                    </tbody>
                  </table> : tableSet}
                {
                (id >= 9 && id <= 16)
                ? 
                <>
                  <h4 align='left'>呼戻</h4>
                  <table align='center'>
                    <tbody>
                      <td><b>呼び戻し無し</b></td>
                    </tbody>
                  </table>
                </>
                : 
                (tableSet.props?.back === '利用しない' || tableSet.props?.fileName?.join('') === '') 
                ?
                <>
                  <h4 align='left'>呼戻</h4>
                  <table align='center'>
                    <tbody>
                      <td><b>未登録</b></td>
                    </tbody>
                  </table>
                </>
                :
                <>
                  <h4 align='left'>呼戻</h4>
                  {tableSet2}
                </>
              }
            </div>
            )
          }
          </div>
      )}
      {!file && <h2>Sc Page</h2>}
    </div>
  );
};

export default ScDetail;

export const ScDetailProcessor = ({ sc,id }) => {
  const startIndex=id;
  switch (sc[startIndex]) {
    case '00': //コメント再生         
        const fileName = [sc[startIndex+1],sc[startIndex+5],sc[startIndex+9],sc[startIndex+13],sc[startIndex+17]];
        const fileName2 = [sc[startIndex+449],sc[startIndex+453],sc[startIndex+457],sc[startIndex+461],sc[startIndex+465]];
        const folder = [sc[startIndex+2],sc[startIndex+6],sc[startIndex+10],sc[startIndex+14],sc[startIndex+18]];
        const transformedFolder = folder.map(mapFolderValue);
        const volume = [sc[startIndex+3],sc[startIndex+7],sc[startIndex+11],sc[startIndex+15],sc[startIndex+19]];
        const transformedVolume = volume.map(hexToSignedDecimal);
        const mixing = [sc[startIndex+4],sc[startIndex+8],sc[startIndex+12],sc[startIndex+16],sc[startIndex+20]];
        const transformedMixing = mixing.map(hexValue => parseInt(hexValue, 16));
        const output = BinaryConverter(sc[startIndex+21]);
        const repeat = (sc[startIndex+22] === '00' ?  '未設定' : parseInt(sc[startIndex+22], 16) ); 
        const external = [(sc[startIndex+23] === '00' ? '利用しない' : '利用する'), parseInt(sc[startIndex+24],16), replaceControl(sc[startIndex+25]), parseInt(sc[startIndex+26],16)];
        const channel = [(sc[startIndex+27] === '00' ? '利用しない' : '利用する')];
        const channelName = (() => {
            switch (sc[startIndex+28]) {
                case '00': 
                    return `${processBGMBand(sc[startIndex+31])}${parseInt(sc[startIndex+32])}`;
                case '01':
                    return sc[startIndex+29] === '00' ? '未設定' : `プログラム${sc[startIndex+29]}`;
                case '02':
                    return sc[startIndex+30];
                default:
                    return '不明'
            }
        })();
        channel.push(channelName);
        const back=fileName2?.join('') === '' ? '利用しない' : '利用する';
        return <ScDetailTable0 fileName={fileName} folder={transformedFolder} volume={transformedVolume} mixing={transformedMixing} output={output} repeat={repeat} external={external} channel={channel}  back={back}/>;
    case '01': //電源制御:1行
        return <ScDetailTable1 title="電源ON/OFF" power={replaceValue(sc[startIndex+33])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"} />;
    case '02': //チャンネル変更:9行(呼び戻し無し)
        let channel_Name = "";
        if(sc[startIndex+34] === '00') {
          const num = sc[startIndex+38]==='00'?"":parseInt(sc[startIndex+38],16);
          channel_Name = `${processBGMBand(sc[startIndex + 37])}${num}`
        } else if(sc[startIndex+34] === '01') {
          channel_Name = "プログラム" + (sc[startIndex+35] === '00' ? "未設定" : sc[startIndex+35]);  
        } else if(sc[startIndex+34] === '02') {
          channel_Name = sc[startIndex+36];
        }
        const external3 = [(sc[startIndex+39] === '00' ? '利用しない' : '利用する'), parseInt(sc[startIndex+40],16), replaceControl(sc[startIndex+41]), parseInt(sc[startIndex+42],16)];
        return <ScDetailTable2 channel={channel_Name} external={external3} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
    case '03': //カット制御:4行
        const cm = BinaryConverter(sc[startIndex+43]);
        const bgm = BinaryConverter(sc[startIndex+44]);
        const minute = BinaryConverter(sc[startIndex+45]);
        return <ScDetailTable3 cm={cm} bgm={bgm} minute={minute} action={generateOutput(sc[startIndex+46])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
    case '04': //ワンタッチボタン:2行
        return <ScDetailTable4 button={(sc[startIndex+47] === '00' ? "未設定" : parseInt(sc[startIndex+48],16))} control={replaceValue(sc[startIndex+48])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
    case '05': //外部制御:3行
        const external2 = [parseInt(sc[startIndex+49],16), replaceControl(sc[startIndex+50]), parseInt(sc[startIndex+51],16)];
        return <ScDetailTable5 external2={external2} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
    case '06': //音量3行
        return <ScDetailTable6 subject={replaceSubject(sc[startIndex+52])} control={replaceVolume(sc[startIndex+53])} volume={parseInt(sc[startIndex+54],16)} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
    case '07': //AUX:1行
        return <ScDetailTable1 title="AUX" power={replaceValue(sc[startIndex+55])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
    default:
      return "";
  }
} 