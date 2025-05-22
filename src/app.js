import express from 'express';
import productRoutes from './routes/products.routes.js';
import devicesRoutes from './routes/devices.routes.js';
import assignRoutes from './routes/assign.routes.js';
import stateRoutes from './routes/state.routes.js'

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(devicesRoutes);
app.use(assignRoutes);
app.use(stateRoutes);

export default app;