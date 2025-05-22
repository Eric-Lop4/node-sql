import express from 'express';
import productRoutes from './routes/products.routes.js';
import devicesRoutes from './routes/devices.routes.js';

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(devicesRoutes);

export default app;