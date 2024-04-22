import React from 'react';
import { Link } from 'react-router-dom';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

export const LtDetailTable = ({ week, title }) => {
    const weekArray = week.split('').map(Number).slice(-7).reverse();

    return (
        <table align='center'>
            <tbody>
                <tr align='center'>
                    <th height="50px" width="30%" textalign="center">名前</th>
                    <td width="70%" textalign="center" colSpan={7}>{title}</td>
                </tr>
                <tr align='center'>
                    <th height="50px" width="30%" textalign="center">曜日</th>
                    {weekArray.map((value, index) => (
                        <td key={index} width="10%" textalign="center"><b>{value === 1 ? daysOfWeek[index] : ''}</b></td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};
export const LtDetailTable2 = ({ id, id2, hour, minute, call }) => {
    return (
    <table align='center'>
    <tbody>
        <tr align='center' className={call !== '<未登録>' ? 'highlighted' : ''}>
        <td width="5%" textalign="center">{id2}</td>
        <td width="25%" textalign="center">{hour}:{minute}</td>
        <td width="50%" textalign="center"><b>{call}</b></td>
        <td width="20%">
            <Link to={`/lt/${id}/${id2}`}>
            <button className="detail-button">詳細表示</button>
            </Link>
        </td>
        </tr>
    </tbody>
    </table>
    );
};