import express from 'express';
import cors from 'cors';
import { getLilithLongitude } from './date.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/lilith', async (req, res) => {
  try {
    const { year, month, day, hour, useTrue } = req.body;

    if (
      typeof year !== 'number' ||
      typeof month !== 'number' ||
      typeof day !== 'number' ||
      typeof hour !== 'number'
    ) {
      return res.status(400).json({ error: 'Invalid input format.' });
    }

    const longitude = await getLilithLongitude(year, month, day, hour, useTrue);
    const normalized = (longitude + 360) % 360;

    // 計算星座
    const signIndex = Math.floor(normalized / 30);
    const signs = [
      '♈ 白羊座', '♉ 金牛座', '♊ 雙子座', '♋ 巨蟹座',
      '♌ 獅子座', '♍ 處女座', '♎ 天秤座', '♏ 天蠍座',
      '♐ 射手座', '♑ 摩羯座', '♒ 水瓶座', '♓ 雙魚座',
    ];
    const sign = signs[signIndex];

    const degrees = Math.floor(normalized % 30);
    const minutes = Math.floor((normalized % 1) * 60);

    res.json({
      longitude: normalized.toFixed(6),
      sign,
      degrees,
      minutes,
      formatted: `${sign} ${degrees}° ${String(minutes).padStart(2, '0')}'`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Lilith API listening at http://localhost:${port}`);
});