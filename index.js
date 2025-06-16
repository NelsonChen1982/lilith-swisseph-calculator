import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import 'dotenv/config';
import { getLilithLongitude } from './date.js';

const app = express();
const port = 3000;

const API_KEY = process.env.LILITH_API_KEY || 'super_secret_key_123';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';

app.use(cors());
app.use(express.json());

console.log('API_KEY from env:', API_KEY);
console.log('RECAPTCHA_SECRET_KEY from env:', RECAPTCHA_SECRET_KEY);

// Rate limit 只針對 /lilith
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分鐘
  max: 100, // 每IP最多100次
  message: { error: '觸發次數過高，請稍後' }
});
app.use('/lilith', limiter);

// 只限制 /lilith 這支 API
app.use((req, res, next) => {
  if (req.path === '/lilith') {
    const key = req.headers['x-api-key'];
    console.log('收到的 x-api-key:', key);
    if (!key || key !== API_KEY) {
      return res.status(403).json({ error: 'Invalid API Key' });
    }
  }
  next();
});

app.post('/lilith', async (req, res) => {
  try {
    // reCAPTCHA 驗證
    const recaptchaToken = req.body.recaptchaToken;
    if (!recaptchaToken) {
      return res.status(400).json({ error: 'Missing reCAPTCHA token.' });
    }
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const verifyRes = await axios.post(verifyUrl, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken
      }
    });
    if (!verifyRes.data.success) {
      return res.status(403).json({ error: 'Invalid reCAPTCHA.' });
    }

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