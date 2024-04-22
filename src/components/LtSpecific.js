import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { BinaryConverter, mapFolderValue, replaceControl, replaceValue } from '../utils/sc/scComponentFunction';
import { LtSpecificTable0, LtSpecificTable1, LtSpecificTable2, LtSpecificTable3 } from '../utils/lt/LtSpecificTable';
import { processBGMBand } from '../utils/bgmBand';
import { hexToSignedDecimal } from '../utils/calculate';


const LtSpecific = () => {
    const { file } = useFileContext(); //fileとsetFileContextを取得
    const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
    const navigate = useNavigate();
    const { id, id2 } = useParams();
  
    useEffect(() => {
      if (!file) {
        navigate('/reset');
      }
    }, [file, navigate]);
  
    const LtSpecificProcessor = ({ lt,id,id2 }) => {  
        const startIndex = ((47 * (id2 - 1)) + ( 4702* (id - 1) + 2));
        const hour = lt[startIndex]==='18' ? '--': parseInt(lt[startIndex],16).toString().padStart(2, '0');
        const minute = lt[startIndex+1]==='3C' ? '--': parseInt(lt[startIndex+1],16).toString().padStart(2, '0');
        switch(lt[startIndex+2]) {
            case '00': //コメント再生
                const fileName = [lt[startIndex+3],lt[startIndex+7],lt[startIndex+11],lt[startIndex+15],lt[startIndex+19]];
                const folder = [lt[startIndex+4],lt[startIndex+8],lt[startIndex+12],lt[startIndex+16],lt[startIndex+17]];
                const transformedFolder = folder.map(mapFolderValue);
                const volume = [lt[startIndex+5],lt[startIndex+9],lt[startIndex+13],lt[startIndex+17],lt[startIndex+20]];
                const transformedVolume = volume.map(hexToSignedDecimal);
                const mixing = [lt[startIndex+6],lt[startIndex+10],lt[startIndex+14],lt[startIndex+18],lt[startIndex+21]];
                const transformedMixing = mixing.map(hexValue => parseInt(hexValue, 16));
                const output = BinaryConverter(lt[startIndex+23]);
                const external = [(lt[startIndex+24] === '00' ? '利用しない' : '利用する'), parseInt(lt[startIndex+25],16), replaceControl(lt[startIndex+26]), parseInt(lt[startIndex+27],16)];
                const channel = [(lt[startIndex+28] === '00' ? '利用しない' : '利用する')];
                const channelName = (() => {
                    switch (lt[startIndex+29]) {
                        case '00': 
                            const num = lt[startIndex+33]==='00'?"":parseInt(lt[startIndex+33],16);
                            return `${processBGMBand(lt[startIndex+32])}${num}`;
                        case '01':
                            return lt[startIndex+30] === '00' ? '未設定' : `プログラム${lt[startIndex+30]}`;
                        case '02':
                            return lt[startIndex+31];
                        default:
                            return '不明'
                    }
                })();
                channel.push(channelName);
                return <LtSpecificTable0 fileName={fileName} folder={transformedFolder} volume={transformedVolume} mixing={transformedMixing} output={output} external={external} channel={channel} hour={hour} minute={minute} />;
            case '01': //電源制御
                return <LtSpecificTable1 power={replaceValue(lt[startIndex+34])} hour={hour} minute={minute} />;
            case '02': //チャンネル変更
                let channel_Name = "";
                if(lt[startIndex+35] === '00') {
                  const num = parseInt(lt[startIndex + 39], 16)===0?'':parseInt(lt[startIndex + 39], 16);
                  channel_Name = `${processBGMBand(lt[startIndex + 38])}${num}`
                } else if(lt[startIndex+35] === '01') {
                  channel_Name = "プログラム" + (lt[startIndex+36] === '00' ? "未設定" : lt[startIndex+36]);  
                } else if(lt[startIndex+35] === '02') {
                  channel_Name = lt[startIndex+37];
                }
                const external2 = [(lt[startIndex+40] === '00' ? '利用しない' : '利用する'), parseInt(lt[startIndex+41],16), replaceControl(lt[startIndex+42]), parseInt(lt[startIndex+43],16)];
                return <LtSpecificTable2 channel={channel_Name} external={external2} hour={hour} minute={minute} />;
            case '03': //外部制御
                const external3 = [parseInt(lt[startIndex+44],16), replaceControl(lt[startIndex+45]), parseInt(lt[startIndex+46],16)];
                return <LtSpecificTable3 external2={external3} hour={hour} minute={minute} />;
            default:
                return "";
        }
    }  

    const table = LtSpecificProcessor({ lt: fileContent?.if_config.lt || [], id, id2 });

    return (
        <div>
          {file && ( 
            <div>
              <Header />
              <h2>Lt Page</h2>
              {fileContent && (
                <div>
                  <h3>ローカルタイマー{id}の要素{id2}</h3>
                  {table.props.fileName?.join('') === '' ? '未登録' : table}                </div>
              )}
            </div>
          )}
          {!file && <h2>Lt Page</h2>} {/* fileが存在しなければタイトルだけ表示（/に遷移するとかでもよさそう) */}
        </div>
      );
};

export default LtSpecific;