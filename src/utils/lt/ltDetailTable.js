import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/Button'
import { Collapse } from '@mui/material';
import LtSpecific from '../../components/LtSpecific';

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
    const [open, setOpen] = React.useState(false);
    return (
    <table align='center'>
    <tbody>
        <tr align='center'>
        <td width="5%" textalign="center">{id2}</td>
        <td width="25%" textalign="center">{hour}:{minute}</td>
        <td width="50%" textalign="center"><b>{call}</b></td>
        <td width="20%">
        <IconButton style={{color: 'black'}} z-index='1'  onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            {open ? "詳細非表示": "詳細表示"}
        </IconButton>
        </td>
        </tr>
        {open && (
            <tr style={{backgroundColor: 'white'}}>
                <td colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <LtSpecific id={id} id2={id2} />
                    </Collapse>
                </td>
            </tr>
        )}
    </tbody>
    </table>
    );
};