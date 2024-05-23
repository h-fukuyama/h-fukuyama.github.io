import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme, isHeader, isFirstColumn, isAllOff }) => ({
    textAlign: 'center',
    whiteSpace: 'nowrap',
    minWidth: '8px',
    height: '10px',
    backgroundColor: isAllOff ? 'white' : (isFirstColumn ? 'lightgreen' : 'inherit'),
    color: isHeader ? theme.palette.primary.main : 'inherit',
    position: isHeader ? 'sticky' : 'inherit',
    left: isFirstColumn ? 0 : 'inherit',
  }));

export const renderMatrix = (data, title) => {
    return (
      <>
        <h2>{title}</h2>
        <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: 'auto', maxHeight: '80vh', overflow: 'auto' }}>
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
                {Array.from({ length: 99 }, (_, i) => (
                  <StyledTableCell
                    key={i}
                    align="center"
                    className="MuiTableCell-stickyHeader"
                    sx={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                      backgroundColor: 'black',
                      color: 'white'
                    }}
                  >
                    {i + 1}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  <StyledTableCell
                    isFirstColumn={true}
                    isAllOff={item.value === '全てOFF'}
                    sx={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: item.value === '全てOFF' ? 'white' : 'lightgreen',
                      height: rowIndex === 0 ? '15px' : 'auto',
                      fontWeight: item.value === '全てOFF' ? 'none' : 'bold'
                    }}
                  >
                    {item.property}
                  </StyledTableCell>
                  {Array.from({ length: 99 }, (_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      style={{
                        backgroundColor: item.value.split(', ').includes(`${colIndex + 1}`) ? 'lightgreen' : 'white',
                      }}
                    >
                      {item.value.split(', ').includes(`${colIndex + 1}`) ? '〇' : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };