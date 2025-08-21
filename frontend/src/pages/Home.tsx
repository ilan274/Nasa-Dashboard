import { useEffect, useState } from 'react'
import { getAsteroids } from '../api/nasa'
import { Card, CardContent, Typography, Container, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

export const Home = () => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAsteroids()
      setData(result)
    }
    fetchData()
  }, [])

  const names: string[] = []
  if (data?.near_earth_objects) {
    Object.values(data.near_earth_objects!).forEach((arr: any) => {
      arr.forEach((obj: any) => {
        names.push(obj.name)
      })
    })
  }

  return (
    <Container
      sx={{
        pt: 10,
        minHeight: 'calc(100vh - 64px)',
        mb: 10,
      }}
    >
      <Typography variant='h5' gutterBottom>
        Home Page - Foundation
      </Typography>

      <Grid container spacing={2} sx={{ display: 'grid', gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)'
        }}}>
        {names.length > 0 ? (
          names.map((name, index) => (
            <Grid key={index}>
              <Card
                sx={{
                  width: '100%',
                  'transition': 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.15)' },
                }}
              >
                <CardContent>
                  <Typography variant='body1'>{name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Container>
  )
}
