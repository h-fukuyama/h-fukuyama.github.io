import React, { forwardRef } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableBody, Paper, TableCell } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme, isHeader, isfirstcolumn, isalloff }) => ({
    textAlign: 'center',
    whiteSpace: 'nowrap',
    minWidth: '8px',
    height: '10px',
    backgroundColor: isalloff ? 'white' : (isfirstcolumn ? 'lightgreen' : 'inherit'),
    color: isHeader ? theme.palette.primary.main : 'inherit',
    position: isHeader ? 'sticky' : 'inherit',
    left: isfirstcolumn ? 0 : 'inherit',
  }));

  export const Matrix = forwardRef((props, ref) => {
    const { data, band, title } = props;
  
    // 列ごとに "〇" の有無をチェック
    const columnsWithCircle = [...Array(99).keys()].map(i => data.some(row => row[i] === "〇"));
  
    return (
      <div ref={ref}>
        <h2  style={{ margin: '20px' }}>{title}</h2>
        <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: 'auto', maxHeight: '600px', overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  className="MuiTableCell-stickyHeader MuiTableCell-firstColumn"
                  sx={{
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    zIndex: 2,
                    backgroundColor: 'white',
                  }}
                ></StyledTableCell>
                {band.map((item, index) => (
                  <StyledTableCell
                    align="center"
                    className="MuiTableCell-stickyHeader"
                    sx={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                      backgroundColor: columnsWithCircle[index] ? 'lightgreen' : 'white',
                      maxWidth: '10px'
                    }}
                    key={index}
                  >
                    {item}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(99).keys()].map(i => {
                const isRowHighlighted = data[i] && data[i].includes("〇");
                return (
                  <TableRow key={i + 1}>
                    <StyledTableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        backgroundColor: isRowHighlighted ? 'lightgreen' : 'white',
                        height: 'auto',
                        fontWeight: isRowHighlighted ? 'bold' : 'none'
                      }}
                    >{i + 1}</StyledTableCell>
                    {data.map((item, idx) => (
                      <StyledTableCell
                        key={idx}
                        sx={{
                          backgroundColor: item[i] === "〇" ? 'lightgreen' : 'inherit',
                          maxWidth: '6px'
                        }}
                      >{item[i]}</StyledTableCell>
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
  