import express, { Request, Response, Router } from 'express';
import { NasaService } from '../services/nasa.service';

const router: Router = express.Router();
const nasaService = new NasaService();

/**
 * @openapi
 * /api/asteroids:
 *   get:
 *     summary: Get processed asteroids feed from NASA
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
router.get('/asteroids', async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.query as { start_date: string, end_date: string }

    const data = await nasaService.getAsteroids(start_date, end_date)
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching asteroid data:', error);
    return res.status(500).json({ error: (error as Error).message })
  }
});

export default router;
