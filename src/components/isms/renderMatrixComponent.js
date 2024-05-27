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

export const Matrix = forwardRef(({ data, band, title }, ref, style) => {
  return (
    <>
      <h2 ref={ref} style={{ margin: '20px' }}>{title}</h2>
      <TableContainer component={Paper} style={style} sx={{ maxWidth: '100%', margin: 'auto', maxHeight: '600px', overflow: 'auto' }}>
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
              {[...Array(99).keys()].map(i => (
                <StyledTableCell
                  align="center"
                  className="MuiTableCell-stickyHeader"
                  sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                    backgroundColor: 'black',
                    color: 'white',
                    maxWidth: '10px'
                  }}
                  key={i + 1}
                >
                  {i + 1}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {band.map((item, index) => {
              const isHighlighted = data[index] && data[index].includes("〇");
              return (
                <TableRow key={item}>
                  <StyledTableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: isHighlighted ? 'lightgreen' : 'white',
                      height: 'auto',
                      fontWeight: isHighlighted ? 'bold' : 'none'
                    }}
                  >{item}チャンネルマスク</StyledTableCell>
                  {data[index] && data[index].map((property, idx) => (
                    <StyledTableCell
                      key={idx}
                      sx={{
                        backgroundColor: property === "〇" ? 'lightgreen' : 'inherit',
                        maxWidth: '6px'
                      }}
                    >{property}</StyledTableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});