import React from 'react';
import { LtSpecificTable0, LtSpecificTable1, LtSpecificTable2, LtSpecificTable3 } from './LtSpecificTable';
import useFileNavigation from '../../fileOperation/useFileNavigation';
import { getHour, getMinute, getFileName, getTransformedFolder, getTransformedVolume, getTransformedMixing, getOutput, getExternal, getChannelName, getPower, getChannel, getExternal2, getExternal3 } from './ltSpecificFunction';

const LtSpecific = (props) => {
  const { file, fileContent } = useFileNavigation();
  const table = LtSpecificProcessor({ lt: fileContent?.if_config.lt || [], id: props.id, id2: props.id2 });

  return (
    <div>
      {file && (
        <div>
          {fileContent && (
            <div>
              {table.props.fileName?.join('') === '' ?
                <table align='center'>
                  <tbody>
                    <tr>
                      <td><b>未登録</b></td>
                    </tr>
                  </tbody>
                </table> : table}
            </div>
          )}
        </div>
      )}
      {!file && <h2>Lt Page</h2>}
    </div>
  );
};

export default LtSpecific;

export const LtSpecificProcessor = ({ lt, id, id2 }) => {
  const startIndex = ((47 * (id2 - 1)) + (4702 * (id - 1) + 2));
  const hour = getHour(lt, startIndex);
  const minute = getMinute(lt, startIndex);

  switch (lt[startIndex + 2]) {
    case '00': //コメント再生
      return (
        <LtSpecificTable0
          fileName={getFileName(lt, startIndex)}
          folder={getTransformedFolder(lt, startIndex)}
          volume={getTransformedVolume(lt, startIndex)}
          mixing={getTransformedMixing(lt, startIndex)}
          output={getOutput(lt, startIndex)}
          external={getExternal(lt, startIndex)}
          channel={[lt[startIndex + 28] === '00' ? '利用しない' : '利用する', getChannelName(lt, startIndex)]}
          hour={hour}
          minute={minute}
        />
      );
    case '01': //電源制御
      return <LtSpecificTable1 power={getPower(lt, startIndex)} hour={hour} minute={minute} />;
    case '02': //チャンネル変更
      return (
        <LtSpecificTable2
          channel={getChannel(lt, startIndex)}
          external={getExternal2(lt, startIndex)}
          hour={hour}
          minute={minute}
        />
      );
    case '03': //外部制御
      return (
        <LtSpecificTable3
          external2={getExternal3(lt, startIndex)}
          hour={hour}
          minute={minute}
        />
      );
    default:
      return "";
  }
};
