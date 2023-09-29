const fs = require('fs');
const express = require('express');
const { createClient } = require('webdav');

const { PORT, ...config } = require('./common/config');

const client = createClient(config.REMOTE_URL, {
    username: config.USERNAME,
    password: config.PASSWORD
});

const app = express();

app.post('/md/:name', async (req, res) => {
    const dirPath = '/' + req.params.name;

    try {
        const isExists = await client.exists(dirPath);
        if (isExists) {
            res.status(408).json({ error: 'Such directory already exists' });
        } else {
            await client.createDirectory(dirPath);
            res.status(201).json({ message: 'Directory has been created' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/rd/:name', async (req, res) => {
    const dirPath = '/' + req.params.name;

    try {
        const isExists = await client.exists(dirPath);
        if (isExists) {
            await client.deleteFile(dirPath);
            res.status(204).json({ message: 'Directory has been deleted' });
        } else {
            res.status(404).json({ error: 'There is no such folder' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

app.post('/up/:name', (req, res) => {
    const filePath = './files/' + req.params.name;

    try {
        if (fs.existsSync(filePath)) {
            const rs = fs.createReadStream(filePath);
            const ws = client.createWriteStream(req.params.name);
            rs.pipe(ws);

            res.json({ message: 'File\'s been uploaded' });
        } else {
            throw new Error('Invalid name')
        }

    } catch (err) {
        res.status(408).json({ error: err.toString() })
    }
});

app.post('/down/:name', async (req, res) => {
    const filePath = '/' + req.params.name;

    try {
        const isExists = await client.exists(filePath);
        if (isExists) {
            const rs = client.createReadStream(filePath);
            const ws = fs.createWriteStream('./files/' + Date.now() + req.params.name);
            rs.pipe(ws);
            //Связать потоки чтения-записи для отображения в ответе
            rs.pipe(res);
        } else {
            res.status(404).json({ error: 'There is no such file' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

app.post('/del/:name', async (req, res) => {
    const filePath = '/' + req.params.name;

    try {
        const isExists = await client.exists(filePath);
        if (isExists) {
            await client.deleteFile(filePath);
            res.status(204).json({ message: 'File has been created' });
        } else {
            res.status(404).json({ error: 'There is no such file' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

app.post('/copy/:source/:destination', async (req, res) => {
    const sourceFilePath = '/' + req.params.source;
    const destinationFilePath = '/' + req.params.destination;

    try {
        const isExistsSourceFile = await client.exists(sourceFilePath);
        if (isExistsSourceFile) {
            await client.copyFile(sourceFilePath, destinationFilePath);
            res.status(200).json({ message: 'File\'s been copied' });
        } else {
            res.status(404).json({ error: 'There is no such source file' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.post('/move/:source/:destination', async (req, res) => {
    const sourceFilePath = '/' + req.params.source;
    const destinationFilePath = '/' + req.params.destination;

    try {
        const isExistsSourceFile = await client.exists(sourceFilePath);
        if (isExistsSourceFile) {
            await client.moveFile(sourceFilePath, destinationFilePath);
            res.status(200).json({ message: 'File\'s been moved' });
        } else {
            res.status(404).json({ error: 'There is no such source file' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));