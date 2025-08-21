import { useState } from 'react';
import { getAsteroids } from '../api/nasa';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (s?: Date, e?: Date) => {
    if (s && e && e < s) {
      setError('End date cannot be before start date.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await getAsteroids(
        s ? s.toISOString().split('T')[0] : undefined,
        e ? e.toISOString().split('T')[0] : undefined
      );
      setData(result);
    } catch (error) {
      const err = error as any
      setError(err.response?.data?.error || err.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, disableColumnMenu: true, sortable: false, filterable: false },
    { field: 'size', headerName: 'Size', flex: 1, type: 'number' },
    { field: 'closeness_to_earth', headerName: 'Closeness to Earth', flex: 1, type: 'number' },
    { field: 'relative_velocity', headerName: 'Relative Velocity', flex: 1, type: 'number' },
  ];

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Asteroids Dashboard
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue: Date | null) => setStartDate(newValue)}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue: Date | null) => setEndDate(newValue)}
          />
          <Button
            variant="contained"
            onClick={() => fetchData(startDate || undefined, endDate || undefined)}
            disabled={!startDate || !endDate}
          >
            Search
          </Button>
        </Stack>
      </LocalizationProvider>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : data.length > 0 ? (
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10]}
            paginationModel={{ pageSize: 10, page: 0 }}
          />
        </Box>
      ) : (
        !loading && (
          <Typography variant="body1" color="text.secondary">
            Please select a start and end date to search for asteroids.
          </Typography>
        )
      )}
    </Container>
  );
};
