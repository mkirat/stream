import express from 'express';
import cors from 'cors';
import router from './routes';
import { db } from './models';

db.sync({ alter: false });
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(
  express.json({
    verify: (req: any, res: any, buf: any) => {
      if (buf && buf.length) {
        req.rawBody = buf;
      }
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use('/v1', router);
app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
