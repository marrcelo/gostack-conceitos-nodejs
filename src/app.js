const express = require('express');
const cors = require('cors');

const { uuid, isUuid } = require('uuidv4');
const { mergeObjects } = require('./app.utils');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
    return response.status(200).json(repositories);
});

app.post('/repositories', (request, response) => {
    const { url, title, techs } = request.body;

    const repository = {
        id: uuid(),
        url,
        title,
        techs,
        likes: 0,
    };
    repositories.push(repository);

    return response.status(201).json(repository);
});

app.put('/repositories/:id', (request, response) => {
    const { url, title, techs } = request.body;
    const { id } = request.params;

    if (!isUuid(id)) return response.status(400).json({ msg: 'Invalid id.' });

    const repositoryIndex = repositories.findIndex((repository) => repository.id === id);

    const repository = mergeObjects(repositories[repositoryIndex], { url, title, techs });
    repositories.splice(repositoryIndex, 1, repository);

    return response.status(200).json(repository);
});

app.delete('/repositories/:id', (request, response) => {
    const { id } = request.params;

    if (!isUuid(id)) return response.status(400).json({ msg: 'Invalid id.' });

    const repositoryIndex = repositories.findIndex((repository) => repository.id === id);

    repositories.splice(repositoryIndex, 1);

    return response.status(204).json({ msg: 'Repository deleted.' });
});

app.post('/repositories/:id/like', (request, response) => {
    const { id } = request.params;

    if (!isUuid(id)) return response.status(400).json({ msg: 'Invalid id.' });

    let repository;

    repositories.forEach((rep) => {
        if (rep.id === id) {
            rep.likes++;
            repository = rep;
        }
    });

    if (!repository) return response.status(400).json({ msg: 'Repository not found.' });

    return response.status(200).json(repository);
});

module.exports = app;
