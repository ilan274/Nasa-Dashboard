import axios from 'axios'

const NASA_API_URL = process.env.NASA_API_URL
const NASA_API_KEY = process.env.NASA_API_KEY

export class NasaService {
  async getAsteroids(): Promise<any> {
    const today = new Date()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(today.getDate() - 7)

    try {
      const response = await axios.get(`${NASA_API_URL}/feed`, {
        params: {
          start_date: sevenDaysAgo.toISOString().split('T')[0],
          end_date: today.toISOString().split('T')[0],
          api_key: NASA_API_KEY,
        },
      })

      return response.data
    } catch (error) {
      console.error('Error fetching NASA data:', error)
      throw new Error('Failed to fetch data from NASA API')
    }
  }
}
