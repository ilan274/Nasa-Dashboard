import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import nasaRoutes from './routes/nasa.routes';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api', nasaRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'NASA Dashboard API' });
});

if (!PORT) {
  throw new Error('PORT must be set');
}
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'NASA Dashboard API', version: '1.0.0' },
  },
  apis: ['./dist/routes/*.js'],
};
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve as any);
app.get('/api-docs', swaggerUi.setup(specs) as any);


app.listen(+PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});