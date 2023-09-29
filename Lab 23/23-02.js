const path = require('path');
const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const { MySqlUserRepository } = require('./utils/auth');
const { PORT } = require("./common/config");
const { strict } = require('assert');

const secret = 'secret-key';

const redisClient = redis.createClient({ url: 'redis://localhost:6379/' });
(async () => {
    await redisClient.connect();
})();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/resource', (req, res, next) => {
    const accessToken = req.cookies['access-token'];

    if (accessToken) {
        jwt.verify(accessToken, secret, (err, payload) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.redirect('/refresh-token');
                }
            } else if (payload) {
                req.payload = payload;
            }
        })
    }
    else { res.status(401).send('Пользователь не авторизован'); }
    next();
});

app.get('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies['refresh-token'];

    if (refreshToken) {
        const rc = await redisClient.get(refreshToken)

        if (rc == 1) {
            console.log(`refresh-токен "${refreshToken}" - находится в черном списке`);
            res.redirect('/login');
        } else {
            jwt.verify(refreshToken, secret, async (err, payload) => {
                if (err) {
                    res.redirect('/login');
                } else if (payload) {
                    await redisClient.set(refreshToken, 1);
                    res.cookie('access-token', jwt.sign({ id: payload.id, username: payload.username }, secret, { expiresIn: '10m' }, { httpOnly: true, sameSite: 'strict' }));
                    res.cookie('refresh-token', jwt.sign({ id: payload.id, username: payload.username }, secret, { expiresIn: '24h' }, { httpOnly: true, sameSite: 'strict' }));
                    res.redirect('/resource');
                }
            });
        }
    } else {
        res.redirect('/login');
    }
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res,) => {
    res.status(401);
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await MySqlUserRepository.findUser(username);

    if (user?.password === password) {
        res.cookie('access-token', jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '10m' }), { httpOnly: true, sameSite: 'strict' });
        res.cookie('refresh-token', jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '24h' }, { httpOnly: true, sameSite: 'strict' }));
        res.redirect('/resource');
    } else {

        res.redirect('/login');
    }
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        await MySqlUserRepository.addUser({ username, password });
        res.redirect('/login');
    } catch (err) {
        res.send(err.message);
    }
});

app.get('/resource', (req, res) => {
    if (req.payload) {
        res.sendFile(path.join(__dirname, './views/resource.html'));
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    res.redirect('/login');
})

app.use((req, res) => {
    res.status(404).send('Not Found');
})

app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`));