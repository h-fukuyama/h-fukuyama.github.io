import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/Button'
import { Collapse } from '@mui/material';
import ScDetail from '../../components/Scdetail';

export const ScTable1 = ({ id, button, call, back }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <table align='center'>
            <tbody>
                <tr textalign='center'>
                    <td width="100px" textalign="center">{id}</td>
                    <td width="100px">ボタン</td>
                    <td width="100px">呼出</td>
                    <td width="600px"><b>{call}</b></td>
                    <td width="150px" rowSpan={2} >
                        <IconButton style={{color: 'black'}} z-index='1'  onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            {open ? "詳細非表示": "詳細表示"}
                        </IconButton>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>{button}</td>
                    <td>呼戻</td>
                    <td><b>{back}</b></td>
                </tr>
                {open && (
                    <tr>
                        <td colSpan={5}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <ScDetail id={button} />
                            </Collapse>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );};

export const ScTable2 = ({ id, call }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <table align='center'>
            <tbody>
            <tr align='center'>
                <td width="100px" textalign="center">{id}.</td>
                <td width="100px">ボタン{id}</td>
                <td width="500px"><b>{call}</b></td>
                <td width="150px">
                <IconButton style={{color: 'black'}} z-index='1'  onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    {open ? "詳細非表示": "詳細表示"}
                </IconButton>
                </td>
            </tr>
            {open && (
                    <tr style={{backgroundColor: 'white'}}>
                        <td colSpan={5}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <ScDetail id={id} />
                            </Collapse>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};