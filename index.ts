// En aquesta entrega crearem un servidor utilitzant Express.js, per proporcionar servei a l'API REST de la llista de tasques (TODO-LIST), aplicant l'arquitectura hexagonal. Implementarem les funcionalitats següents:

// - Afegir una tasca a la llista: Implementarem una ruta i un controlador per permetre als usuaris afegir noves tasques a la seva llista.

// - Marcar una tasca com a completada: Crearem una ruta i un controlador per a permetre als usuaris marcar una tasca com a completada.

// - Eliminar una tasca de la llista: Implementarem una funcionalitat per eliminar tasques de la llista utilitzant una ruta i un controlador adequats.

// - Mostrar la llista de tasques: Crearem una ruta i un controlador per obtenir i mostrar la llista completa de tasques als usuaris.

// Nivell 1: Documenta i adjunta les comprovacions amb una plataforma com Postman o Insomnia al teu projecte.

// Nivell 2: - Inclou un middleware que afegeixi la capçalera Cache-control: no-cache. Habiliti CORS (Cross-Origin Resource Sharing) en les respostes, sigui mitjançant Express o mitjançant un altre middleware.

// - Afegeix un middleware retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari/ària i contrasenya).

// Nivell 3: Afegeix testing per comprovar el correcte funcionament de cadascun.

import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const PORT = 8000;
const FILE_PATH = 'tasques.json';

app.use(express.json());

interface Task {
    id: number;
    description: string;
    completed: boolean;
}

function readTasksFromFile(): Task[] {
    try {
        const fileContents = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(fileContents);
    } catch (error) {
        return [];
    }
}

function writeTasksToFile(tasks: Task[]): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}

app.get('/tasks', (req: Request, res: Response) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

app.post('/tasks', (req: Request, res: Response) => {
    const tasks = readTasksFromFile();
    const newTask: Task = {
        id: tasks.length + 1,
        description: req.body.description,
        completed: false,
    };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req: Request, res: Response) => {
    const tasks = readTasksFromFile();
    const taskId = parseInt(req.params.id);
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask) {
        updatedTask.completed = req.body.completed;
        writeTasksToFile(tasks);
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
    const tasks = readTasksFromFile();
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1);
        writeTasksToFile(tasks);
        res.json({message: `Task number ${deletedTask} was deleted`});
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press Ctrl + C to cancel`);
});