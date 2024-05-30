import React from 'react';
import { MenuDetailTable0, MenuDetailTable1, MenuDetailTable2, MenuDetailTable3, MenuDetailTable4, MenuDetailTable5 } from './menuDetailTable'
import { BinaryConverter, replaceControl, replaceValue, replaceSubject, replaceVolume, generateOutput } from '../sc/scComponentFunction';
import { processBGMBand } from '../../utils/bgmBand';
import { getChannelName, getValidStatus, getPattern, parseTime, mapFolder, parseVolume, parseMixing } from './menuDetailFunction';
import useFileNavigation from '../../fileOperation/useFileNavigation';

const MenuDetail = (props) => {
  const { file, fileContent } = useFileNavigation();
  const startIndex = ((props.id - 1) * 70) + 17;
  const tableSet = MenuDetailProcessor({ menu: fileContent?.if_config?.menu || [], id: 0, startIndex: startIndex });

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
      {!file && <h2>Resetting...</h2>}
    </div>
  );
};

export default MenuDetail;

// メイン処理
export const MenuDetailProcessor = ({ menu, id, startIndex }) => {
  switch (menu[startIndex]) {
    case '00': // コメント再生
      const fileName = [menu[startIndex + 1], menu[startIndex + 5], menu[startIndex + 9], menu[startIndex + 13], menu[startIndex + 17]];
      const folder = [menu[startIndex + 2], menu[startIndex + 6], menu[startIndex + 10], menu[startIndex + 14], menu[startIndex + 18]].map(mapFolder);
      const volume = [menu[startIndex + 3], menu[startIndex + 7], menu[startIndex + 11], menu[startIndex + 15], menu[startIndex + 19]].map(parseVolume);
      const mixing = [menu[startIndex + 4], menu[startIndex + 8], menu[startIndex + 12], menu[startIndex + 16], menu[startIndex + 20]].map(parseMixing);
      const output = BinaryConverter(menu[startIndex + 21]);
      const external = [(menu[startIndex + 40] === '00' ? '利用しない' : '利用する'), parseInt(menu[startIndex + 41]), replaceControl(menu[startIndex + 42]), parseInt(menu[startIndex + 43], 16)];
      const channel = [(menu[startIndex + 44] === '00' ? '利用しない' : '利用する'), getChannelName(menu, startIndex)];
      const input = [menu[startIndex + 28], menu[startIndex + 29], menu[startIndex + 30], menu[startIndex + 31], menu[startIndex + 32], menu[startIndex + 33], menu[startIndex + 34], menu[startIndex + 35], menu[startIndex + 36], menu[startIndex + 37], menu[startIndex + 38], menu[startIndex + 39]];
      const valid = getValidStatus(menu, startIndex, id);
      const pattern = getPattern(menu, startIndex);
      const manual = parseInt(menu[startIndex + 23], 16);
      const hour = parseTime(menu[startIndex + 24]);
      const hour2 = parseTime(menu[startIndex + 25]);
      const minute1 = parseTime(menu[startIndex + 26]);
      const minute2 = parseTime(menu[startIndex + 27]);
      return <MenuDetailTable0 fileName={fileName} folder={folder} volume={volume} mixing={mixing} output={output} external={external} channel={channel} input={input} valid={valid} pattern={pattern} manual={manual} hour={hour} hour2={hour2} minute={minute1} minute2={minute2} />;

    case '01': // チャンネル変更:9行
      const channelName = (() => {
        if (menu[startIndex + 50] === '00') {
          return `${processBGMBand(menu[startIndex + 53])}${parseInt(menu[startIndex + 54], 16)}`;
        } else if (menu[startIndex + 50] === '01') {
          return "プログラム" + (menu[startIndex + 51] === '00' ? "未設定" : menu[startIndex + 51]);
        } else if (menu[startIndex + 50] === '02') {
          return menu[startIndex + 52];
        }
        return '';
      })();
      const external1 = [(menu[startIndex + 55] === '00' ? '利用しない' : '利用する'), parseInt(menu[startIndex + 56], 16), replaceValue(menu[startIndex + 57]), parseInt(menu[startIndex + 58], 16)];
      return <MenuDetailTable1 channel={channelName} external={external1} />;

    case '02': // BGM/CMカット:4行
      const cm = BinaryConverter(menu[startIndex + 59]);
      const bgm = BinaryConverter(menu[startIndex + 60]);
      const minute = BinaryConverter(menu[startIndex + 61]);
      return <MenuDetailTable2 cm={cm} bgm={bgm} minute={minute} action={generateOutput(menu[startIndex + 62])} />;

    case '03': // 外部制御:3行
      const external3 = [parseInt(menu[startIndex + 63], 16), replaceValue(menu[startIndex + 64]), parseInt(menu[startIndex + 65], 16)];
      return <MenuDetailTable3 external3={external3} />;

    case '04': // ボリューム:3行
      return <MenuDetailTable4 subject={replaceSubject(menu[startIndex + 66])} control={replaceVolume(menu[startIndex + 67])} volume={parseInt(menu[startIndex + 68], 16)} />;

    case '05': // AUX:1行
      return <MenuDetailTable5 title="AUX" power={replaceValue(menu[startIndex + 69])} />;

    default:
      return null;
  }
};
