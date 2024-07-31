import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import loginRoutes from './routes/loginRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/user.js';

//Atamalar
const app = express();
const port = 5500;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//MongoDB Bağlantısı
mongoose.connect('mongodb://localhost:27017/userinfo');

// Routes
app.get('/', loginRoutes);
app.use('/register', registerRoutes);
app.get('/',authRoutes);
//kullanıcı giriş kontrol
app.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    console.log('Giriş denemesi:', username); // Kullanıcı adını logla
    try {
        const user = await User.findOne({ username });
        console.log('Bulunan kullanıcı:', user); // Bulunan kullanıcıyı logla
        if (user && user.password === password) { // Şifre karşılaştırması (hash kullanmıyorsanız)
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
