'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from 'next-themes';

const columns: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'API Key',
    width: 400,
  },
  { field: 'col2', headerName: 'Path', width: 250 },
  { field: 'col3', headerName: 'Recency', width: 250 },
  { field: 'col4', headerName: 'Duration', width: 150 },
  { field: 'col5', headerName: 'Status', width: 150 },
];

const Table = ({ userRequests }: { userRequests: any }) => {
  const { theme: applicationTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === 'light' ? 'light' : 'dark',
    },
  });

  const rows = userRequests.map((request) => ({
    id: request.id,
    col1: request.usedApiKey,
    col2: request.path,
    col3: `${request.timestamp} ago`,
    col4: `${request.duration} ms`,
    col5: request.status,
  }));
  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        style={{
          backgroundColor:
            applicationTheme === 'light' ? 'white' : 'rgba(17 24 39 / 0.3)',
          fontSize: '1rem',
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  );
};

export default Table;
