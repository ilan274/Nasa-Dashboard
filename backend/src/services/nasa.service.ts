import axios from 'axios'
import NodeCache from 'node-cache'

const NASA_API_URL = process.env.NASA_API_URL
const NASA_API_KEY = process.env.NASA_API_KEY

export interface NearEarthObject {
  id: string
  name: string
  size: number
  closeness_to_earth: number
  relative_velocity: number
  close_approach_date: string
}

export class NasaService {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600 })
  }

  async getAsteroids(startDate?: string, endDate?: string): Promise<NearEarthObject[]> {
    const today = new Date()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(today.getDate() - 7)

    const start = startDate || sevenDaysAgo.toISOString().split('T')[0]
    const end = endDate || today.toISOString().split('T')[0]

    const cacheKey = `asteroids_${start}_${end}`
    const cached: NearEarthObject[] | undefined = this.cache.get(cacheKey)
    if (cached) return cached

    try {
      const response = await axios.get(`${NASA_API_URL}/feed`, {
        params: {
          start_date: start,
          end_date: end,
          api_key: NASA_API_KEY,
        },
      })

      const result: NearEarthObject[] = []
      const objects = response.data.near_earth_objects

      Object.keys(objects).forEach(date => {
        objects[date].forEach((neo: any) => {
          const closeData = neo.close_approach_data[0]
          const minDiameter = neo.estimated_diameter.kilometers.estimated_diameter_min
          const maxDiameter = neo.estimated_diameter.kilometers.estimated_diameter_max

          result.push({
            id: neo.id,
            name: neo.name,
            size: (minDiameter + maxDiameter) / 2,
            closeness_to_earth: Number(closeData.miss_distance.kilometers),
            relative_velocity: Number(closeData.relative_velocity.kilometers_per_hour),
            close_approach_date: closeData.close_approach_date,
          })
        })
      })

      this.cache.set(cacheKey, result)
      return result
    } catch (error: unknown) {
      const err = error as any
      console.error('Error fetching NASA data:', err.message)
      throw new Error(err.response?.data?.error_message || err.message)
    }
  }
}
