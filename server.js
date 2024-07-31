import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/user.js';

// Atamalar
const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Bağlantısı
mongoose.connect('mongodb://localhost:27017/userinfo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  console.log('Giriş denemesi:', username);
  try {
    const user = await User.findOne({ username });
    console.log('Bulunan kullanıcı:', user);
    if (user && user.password === password) {
      res.json({ status: true, user: { username: user.username } });
    } else {
      res.status(401).json({ status: false, message: 'Geçersiz kullanıcı adı veya şifre' });
    }
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ status: false, message: 'Sunucu hatası' });
  }
});

// Sunucuyu Başlatma
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});