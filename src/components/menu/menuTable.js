import React from 'react';
import MenuDetail from './MenuDetail';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/Button'
import { Collapse } from '@mui/material';

export const MenuTable = ({ id, title, call }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <table align='center'>
            <tbody>
            <tr align='center'>
                <td width="10%" textalign="center">{id}.</td>
                <td width="20%"><b>{title}</b></td>
                <td width="40%"><b>{call}</b></td>
                <td width="10%">
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
                            <MenuDetail id={id} />
                        </Collapse>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
};