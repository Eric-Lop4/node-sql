import express from 'express';
import productRoutes from './routes/products.routes.js';
import devicesRoutes from './routes/devices.routes.js';
import assignRoutes from './routes/assign.routes.js';
import stateRoutes from './routes/state.routes.js'
import hardwareRoutes from './routes/hardware.routes.js'
import officeRoutes from './routes/office.routes.js'
import soRoutes from './routes/so.routes.js'
import ubiRoutes from './routes/ubi.routes.js'
import typeDispRoutes from './routes/typeDisp.routes.js'
import empleadosRoutes from './routes/empleados.routes.js'

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(devicesRoutes);
app.use(assignRoutes);
app.use(stateRoutes);
app.use(hardwareRoutes);
app.use(officeRoutes);
app.use(soRoutes);
app.use(ubiRoutes);
app.use(typeDispRoutes);
app.use(empleadosRoutes);

export default app;