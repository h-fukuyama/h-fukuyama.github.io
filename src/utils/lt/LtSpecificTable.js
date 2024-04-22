import React from 'react';

export const LtSpecificTable0 = ({fileName, folder, volume, mixing, output, external, channel, hour, minute }) => {
  const rowHeaders = ["前チャイム", "コメント①", "コメント②", "コメント③", "後チャイム"];

  return (
    <table align='center'>
      <tbody>
      <tr textalign='center'>
        <th colSpan={1}>時刻</th>
        <td colSpan={4}><b>{hour}:{minute}</b></td>
      </tr>
      <tr textalign='center'>
        <th>機能</th>
        <td colSpan={4}><b>コメント再生</b></td>
      </tr>
      <tr>
        <td></td>
        <th>ファイル名</th>
        <th>格納フォルダ</th>
        <th>再生音量</th>
        <th>ミキシング</th>
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
            <th>出力先</th>
            <td>{external[1]}</td>
            <td colSpan={3}>(外部制御1~16)</td>
          </tr>
          <tr>
            <th>動作</th>
            <td colSpan={4}>{external[2]}</td>
          </tr>
          {external[2] === "秒数指定" && (
          <tr>
            <th>秒数</th>
            <td colSpan={3}>{external[3]}秒</td>
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
            <th>チャンネル</th>
            <td colSpan={4}>{channel[1]}</td>
          </tr>
        </>
      )}
      </tbody>
    </table>
  )
};

export const LtSpecificTable1 = ({ power, hour, minute}) => {
    return (
      <table align='center'>
        <tbody>
        <tr textalign='center'>
            <th>時刻</th>
            <td ><b>{hour}:{minute}</b></td>
        </tr>
        <tr textalign='center'>
          <th>機能</th>
          <td><b>電源ON/OFF</b></td>
        </tr>
        <tr>
          <th>動作</th>
          <td>{power}</td>
        </tr>
        </tbody>
      </table>
    )
};

export const LtSpecificTable2 = ({channel, external, hour, minute}) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
            <th>時刻</th>
            <td ><b>{hour}:{minute}</b></td>
        </tr>
        <tr textalign='center'>
          <th>機能</th>
          <td><b>チャンネル変更</b></td>
        </tr>
        <tr>
          <th>チャンネル</th>
          <td>{channel}</td>
        </tr>
        <tr>
          <th colSpan={1}>外部出力</th>
          <td colSpan={4}>{external[0]}</td>
        </tr>
        {external[0] !== "利用しない" && (
          <>
            <tr>
              <th>出力先</th>
              <td>{external[1]}</td>
              <td colSpan={3}>(外部制御1~16)</td>
            </tr>
            <tr>
              <th>動作</th>
              <td colSpan={4}>{external[2]}</td>
            </tr>
            {external[2] === "秒数指定" && (
              <tr>
                <th>秒数</th>
                <td colSpan={3}>{external[3]}秒</td>
                <td>(1~99秒)</td>
              </tr>
            )}
          </>
        )}
        </tbody>
      </table>
  )
};

export const LtSpecificTable3 = ({external2, hour, minute}) => {
    return (
      <table align='center'>
        <tbody>
            <tr textalign='center'>
                <th>時刻</th>
                <td colSpan={2}><b>{hour}:{minute}</b></td>
            </tr>  
          <tr textalign='center'>
            <th>機能</th>
            <td colSpan={2}><b>外部制御</b></td>
          </tr>
          <tr>
            <th>出力先</th>
            <td>{external2[0]}</td>
            <td>(外部制御1~16)</td>
        </tr>
        <tr>
            <th>動作</th>
            <td colSpan={2}>{external2[1]}</td>
        </tr>
        {external2[1] === "秒数指定" && (
        <tr>
            <th>秒数</th>
            <td>{external2[2]}秒</td>
            <td>(1~99秒)</td>
        </tr>
        )}
        </tbody>
      </table>
    )
};