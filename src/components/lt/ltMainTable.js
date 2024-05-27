import React from 'react';
import { Link } from 'react-router-dom';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

export const LtMainTable = ({ power, id, week, title }) => {
    // weekを配列に変換する
    const weekArray = week.split('').map(Number).slice(-7).reverse();

    return (
        <table align='center'>
            <tbody>
                <tr align='center'>
                    <td height="60px" width="5%" textalign="center" className={power === 'ON' ? 'on' : 'off'}>{power}</td>
                    <td width="5%" textalign="center">{id}.</td>
                    {weekArray.map((value, index) => (
                        <td key={index} width="5%" textalign="center">{value === 1 ? daysOfWeek[index] : ''}</td>
                    ))}
                    <td width="40%"><b>{title}</b></td>
                    <td width="15%">
                        <Link to={`/lt/${id}`}>
                            <button className="detail-button">詳細表示</button>
                        </Link>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
