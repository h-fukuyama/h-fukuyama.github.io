import React from 'react';

export const MenuDetailTable0 = ({
  fileName, folder, volume, mixing,
  output, external, channel, input, valid,
  pattern, manual, hour, hour2, minute, minute2
}) => {

  const rowHeaders = ["前チャイム", "コメント①", "コメント②", "コメント③", "後チャイム"];
  const groupedNumbers = [];
  for (let i = 0; i < input.length; i += 6) {
    const group = input.slice(i, i + 6);
    while (group.length < 6) {
      group.push(null);
    }
    groupedNumbers.push(group);
  }

  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <th>機能</th>
          <td colSpan={5}><b>コメント再生</b></td>
        </tr>
        <tr>
          <th>再生方法</th>
          <td colSpan={5}><b>{pattern}</b></td>
        </tr>

        {pattern === "分指定(毎時)" && (
          <>
            <tr height='20px'></tr>
            {groupedNumbers.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td height='20px' key={cellIndex}>{cell === '3C' ? '' : <b>{parseInt(cell, 16)}分</b>}</td>
                ))}
              </tr>
            ))}
            <tr height='20px'></tr>
          </>
        )}

        {pattern === "1~99回設定" && (
          <tr>
            <th width='30%'>回数</th>
            <td>{manual}</td>
          </tr>
        )}
        <tr>
          <td width='20%'></td>
          <th colSpan={2} width='30%'>ファイル名</th>
          <th width='20%'>格納フォルダ</th>
          <th width='15%'>再生音量</th>
          <th width='15%'>ミキシング</th>
        </tr>
        {rowHeaders.map((header, index) => (
          <tr key={index}>
            <th>{header}</th>
            <td colSpan={2}>{fileName[index]}</td>
            <td>{folder[index]}</td>
            <td>{volume[index]}</td>
            <td>{mixing[index]}%</td>
          </tr>
        ))}
        <tr>
          <th colSpan={1}>出力先</th>
          <td colSpan={2}></td>
          <td>{output[0]}</td>
          <td>{output[1]}</td>
          <td>{output[2]}</td>
        </tr>
        {pattern === "分指定(毎時)" && (
          <>
            <tr>
              <th>自動ON</th>
              <td>{hour}:{minute}</td>
              <td rowSpan={2}><b>{valid}</b></td>
            </tr>
            <tr>
              <th>自動OFF</th>
              <td>{hour2}:{minute2}</td>
            </tr>
          </>
        )}
        <tr>
          <th colSpan={1}>外部出力</th>
          <td colSpan={5}><b>{external[0]}</b></td>
        </tr>
        {external[0] !== "利用しない" && (
          <>
            <tr>
              <th width='30%'>出力先</th>
              <td width='40%' colSpan={2}>{external[1]}</td>
              <td colSpan={3}>(外部制御1~16)</td>
            </tr>
            <tr>
              <th width='30%'>動作</th>
              <td colSpan={5}><b>{external[2]}</b></td>
            </tr>
            {external[2] === "秒数指定" && (
              <tr>
                <th width='30%'>秒数</th>
                <td width='40%' colSpan={2}>{external[3]}秒</td>
                <td colSpan={3}>(1~99秒)</td>
              </tr>
            )}
          </>
        )}
        <tr>
          <th>ch変更</th>
          <td colSpan={5}><b>{channel[0]}</b></td>
        </tr>
        {channel[0] !== "利用しない" && (
          <>
            <tr>
              <th width='30%'>チャンネル</th>
              <td colSpan={5}>{channel[1]}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  )
};

export const MenuDetailTable1 = ({ channel, external }) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <td colSpan={2}><b>チャンネル変更</b></td>
        </tr>
        <tr>
          <th width='30%'>チャンネル</th>
          <td>{channel}</td>
        </tr>
        <tr>
          <th width='30%' colSpan={1}>外部出力</th>
          <td colSpan={4}>{external[0]}</td>
        </tr>
        {external[0] !== "利用しない" && (
          <>
            <tr>
              <th width='30%'>出力先</th>
              <td width='30%'>{external[1]}</td>
              <td colSpan={3}>(外部制御1~16)</td>
            </tr>
            <tr>
              <th width='30%'>動作</th>
              <td colSpan={4}>{external[2]}</td>
            </tr>
            {external[2] === "秒数指定" && (
              <tr>
                <th width='30%'>秒数</th>
                <td width='40%' colSpan={3}>{external[3]}秒</td>
                <td>(1~99秒)</td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </table>
  )
};

export const MenuDetailTable2 = ({ action, cm, bgm, minute }) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <td colSpan={4}><b>BGM/CMカット</b></td>
        </tr>
        <tr>
          <th width='22%'>動作</th>
          <td colSpan={3}>{action}</td>
        </tr>
        <tr>
          <td width='22%'></td>
          <th width='26%'>店内<br />(エリア1)</th>
          <th width='26%'>事務所<br />(エリア2)</th>
          <th width='26%'>インカム<br />(エリア3)</th>
        </tr>
        <tr>
          <th>BGM</th>
          {bgm.slice(0, 3).map((value, index) => (
            <td key={index}>{value ? '☑' : ''}</td>
          ))}
        </tr>
        <tr>
          <th>CM</th>
          {cm.map((value, index) => (
            <td key={index}>{value ? '☑' : ''}</td>
          ))}
        </tr>
        <tr>
          <th>分指定再生</th>
          {minute.map((value, index) => (
            <td key={index}>{value ? '☑' : ''}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
};


export const MenuDetailTable3 = ({ external3 }) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <td colSpan={3}><b>外部制御</b></td>
        </tr>
        <tr>
          <th width='30%'>出力先</th>
          <td width='30%'>{external3[0]}</td>
          <td>(外部制御1~16)</td>
        </tr>
        <tr>
          <th width='30%'>動作</th>
          <td colSpan={2}>{external3[1]}</td>
        </tr>
        {external3[1] === "秒数指定" && (
          <tr>
            <th width='30%'>秒数</th>
            <td width='30%'>{external3[2]}秒</td>
            <td>(1~99秒)</td>
          </tr>
        )}
      </tbody>
    </table>
  )
};

export const MenuDetailTable4 = ({ subject, control, volume }) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <td colSpan={3}><b>音量制御</b></td>
        </tr>
        <tr>
          <th width='30%'>対象</th>
          <td colSpan={2}>{subject}</td>
        </tr>
        <tr>
          <th width='30%'>制御</th>
          <td colSpan={2}>{control}</td>
        </tr>
        {control === "秒数指定" && (
          <tr>
            <th width='30%'>秒数</th>
            <td width='30%'>{volume}秒</td>
            <td>(1~99秒)</td>
          </tr>
        )}
      </tbody>
    </table>
  )
};

export const MenuDetailTable5 = ({ title, power }) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <td colSpan={3}><b>{title}</b></td>
        </tr>
        <tr>
          <th width='30%'>動作</th>
          <td colSpan={2}>{power}</td>
        </tr>
      </tbody>
    </table>
  )
};