import React from 'react';

export const ScDetailTable0 = ({fileName, folder, volume, mixing, output, external, channel, back }) => {
  const rowHeaders = ["前チャイム", "コメント①", "コメント②", "コメント③", "後チャイム"];

  return (
    <table align='center'>
      <tbody>
      <tr textalign='center'>
        <td colSpan={5}><b>コメント再生</b></td>
      </tr>
      <tr>
        <td width='20%'></td>
        <th width='30%'>ファイル名</th>
        <th width='30%'>格納フォルダ</th>
        <th width='10%'>再生音量</th>
        <th width='10%'>ミキシング</th>
      </tr>
      {rowHeaders.map((header, index) => (
        <tr key={index}>
          <th>{header}</th>
          <td>{fileName[index]}</td>
          <td>{folder[index]}</td>
          <td>{volume[index]}</td>
          <td>{mixing[index]}%</td>
        </tr>
      ))}
      <tr>
          <th colSpan={1}>出力先</th>
          <td></td>
          <td>{output[0]}</td>
          <td>{output[1]}</td>
          <td>{output[2]}</td>
      </tr>
      <tr>
          <th colSpan={1}>外部出力</th>
          <td colSpan={4}>{external[0]}</td>
      </tr>
      {external[0] !== "利用しない" && (
        <>
          <tr>
            <th width='30px'>出力先</th>
            <td width='30px'>{external[1]}</td>
            <td colSpan={3}>(外部制御1~16)</td>
          </tr>
          <tr>
            <th width='30px'>動作</th>
            <td colSpan={4}>{external[2]}</td>
          </tr>
          {external[2] === "秒数指定" && (
          <tr>
            <th width='30px'>秒数</th>
            <td width='30px' colSpan={3}>{external[3]}秒</td>
            <td>(1~99秒)</td>
          </tr>
          )}
        </>
      )}
      <tr>
        <th>ch変更</th>
        <td colSpan={4}>{channel[0]}</td>
      </tr>
      {channel[0] !== "利用しない" && (
        <>
          <tr>
            <th width='30px'>チャンネル</th>
            <td colSpan={4}>{channel[1]}</td>
          </tr>
        </>
      )}
      </tbody>
    </table>
  )
};

export const ScDetailTable1 = ({title, power, back}) => {
    return (
      <table align='center'>
        <tbody>
        <tr textalign='center'>
          <td colSpan={2}><b>{title}</b></td>
        </tr>
        <tr>
          <th width='30%'>動作</th>
          <td>{power}</td>
        </tr>
        </tbody>
      </table>
    )
};

export const ScDetailTable2 = ({channel, external, back}) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <td colSpan={3}><b>チャンネル変更</b></td>
        </tr>
        <tr>
          <th width='30%'>チャンネル</th>
          <td colSpan={2}>{channel}</td>
        </tr>
        <tr>
          <th width='30%'>外部出力</th>
          <td colSpan={2}>{external[0]}</td>
        </tr>
        {external[0] !== "利用しない" && (
          <>
            <tr>
              <th width='30%'>出力先</th>
              <td width='40%'>{external[1]}</td>
              <td>(外部制御1~16)</td>
            </tr>
            <tr>
              <th width='30%'>動作</th>
              <td colSpan={2}>{external[2]}</td>
            </tr>
            {external[2] === "秒数指定" && (
              <tr>
                <th width='30%'>秒数</th>
                <td width='30%'>{external[3]}秒</td>
                <td>(1~99秒)</td>
              </tr>
            )}
          </>
        )}
        </tbody>
      </table>
  )
};

export const ScDetailTable3 = ({action, cm, bgm, minute, back}) => {
  return (
    <table align='center'>
      <tbody>
      <tr textalign='center'>
        <td colSpan={4}><b>BGM/CMカット</b></td>
      </tr>
      <tr>
        <th>動作</th>
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

export const ScDetailTable4 = ({button, control, back}) => {
    return (
      <table align='center'>
        <tbody>
          <tr textalign='center'>
            <td colSpan={2}><b>ワンタッチボタン</b></td>
          </tr>
          <tr>
            <th width='30%'>ボタン</th>
            <td>{button}</td>
          </tr>
          <tr>
            <th width='30%'>動作</th>
            <td>{control}</td>
          </tr>
          </tbody>
      </table>
    )
};

export const ScDetailTable5 = ({external2, back}) => {
    return (
      <table align='center'>
        <tbody>
          <tr textalign='center'>
            <td colSpan={3}><b>外部制御</b></td>
          </tr>
          <tr>
            <th width='30%'>出力先</th>
            <td width='40%'>{external2[0]}</td>
            <td>(外部制御1~16)</td>
        </tr>
        <tr>
            <th width='30%'>動作</th>
            <td colSpan={2}>{external2[1]}</td>
        </tr>
        {external2[1] === "秒数指定" && (
        <tr>
            <th width='30%'>秒数</th>
            <td width='40%'>{external2[2]}秒</td>
            <td>(1~99秒)</td>
        </tr>
        )}
        </tbody>
      </table>
    )
};

export const ScDetailTable6 = ({subject, control, volume, back}) => {
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
            <td width='40%'>{volume}秒</td>
            <td>(1~99秒)</td>
        </tr>
        )}
        </tbody>
        </table>
    )
};