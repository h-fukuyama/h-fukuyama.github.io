import React, { forwardRef } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableBody, Paper, TableCell } from '@mui/material';

const checkColumnHighlight = (data) => {
    return data.map(column => column.includes("〇"));
};

export const Matrix = forwardRef((props, ref) => {
    const { data, band, title } = props;  
    const columnHighlights = checkColumnHighlight(data);

    return (
      <div ref={ref}>
        <h2  style={{ margin: '20px' }}>{title}</h2>
        <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: 'auto', maxHeight: '600px', overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  className="MuiTableCell-stickyHeader MuiTableCell-firstColumn"
                  sx={{
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    zIndex: 2,
                    backgroundColor: 'white',
                  }}
                ></TableCell>
                {band.map((item, index) => (
                  <TableCell
                    align="center"
                    className="MuiTableCell-stickyHeader"
                    sx={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                      backgroundColor: columnHighlights[index] ? 'lightgreen' : 'white',
                      maxWidth: '10px'
                    }}
                    key={index}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(99).keys()].map(i => {
                return (
                  <TableRow key={i + 1}>
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        height: 'auto',
                        backgroundColor: 'black',
                        color: 'white'
                      }}
                    >{i + 1}</TableCell>
                    {data.map((item, idx) => (
                      <TableCell
                        key={idx}
                        sx={{
                          backgroundColor: item[i] === "〇" ? 'lightgreen' : 'inherit',
                          maxWidth: '6px'
                        }}
                      >{item[i]}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
});
