import React from 'react';
import { Link  } from 'react-router-dom';

export const MenuTable = ({ id, title, call }) => {
    return (
        <table align='center'>
            <tbody>
            <tr align='center'>
                <td width="10%" textalign="center">{id}.</td>
                <td width="20%"><b>{title}</b></td>
                <td width="40%"><b>{call}</b></td>
                <td width="10%">
                    <Link to={`/menu/${id}`}>
                        <button className="detail-button">詳細表示</button>
                    </Link>
                </td>
            </tr>
            </tbody>
        </table>
    )
};