import express, { Request, Response, Router } from 'express';
import { NasaService } from '../services/nasa.service';

const router: Router = express.Router();
const nasaService = new NasaService();

/**
 * @openapi
 * /api/asteroids:
 *   get:
 *     summary: Get raw asteroids feed from NASA
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
router.get('/asteroids', async (req: Request, res: Response) => {
  try {
    const data = await nasaService.getAsteroids();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching asteroid data:', error);
    return res.status(500).json({
      error: 'Failed to fetch asteroid data'
    });
  }
});

export default router;
