import React from 'react';
import { Link  } from 'react-router-dom';

export const ScTable1 = ({ id, button, call, back }) => {
    return (
        <table align='center'>
            <tbody>
                <tr textalign='center'>
                    <td width="100px" textalign="center">{id}</td>
                    <td width="100px">ボタン</td>
                    <td width="100px">呼出</td>
                    <td width="600px"><b>{call}</b></td>
                    <td width="150px" rowSpan={2}>
                    <Link to={{ pathname: `/sc/${button}`, state: {back}}}>
                            <button className="detail-button">詳細表示</button>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>{button}</td>
                    <td>呼戻</td>
                    <td><b>{back}</b></td>
            </tr>
            </tbody>
        </table>
    )
};

export const ScTable2 = ({ id, call }) => {
    return (
        <table align='center'>
            <tbody>
            <tr align='center'>
                <td width="100px" textalign="center">{id}.</td>
                <td width="100px">ボタン{id}</td>
                <td width="500px"><b>{call}</b></td>
                <td width="150px">
                    <Link to={`/sc/${id}`}>
                        <button className="detail-button">詳細表示</button>
                    </Link>
                </td>
            </tr>
            </tbody>
        </table>
    )
};