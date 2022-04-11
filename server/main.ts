import express, { type Response } from 'express';
import cors from 'cors';
import { TodoStore } from '../shared';
import { setState } from '../shared';

const app = express();

app.use(cors());
app.use(express.json());

const todoStore = new TodoStore();
todoStore.dispatch(
    setState({
        todos: [
            {
                title: 'Chores',
                description: 'Do the dishes',
                done: false,
                id: '12345'
            }
        ]
    })
);

app.post('/command', (req, res) => {
    todoStore.dispatch(req.body);
    res.status(201);
    res.send();
});

app.get('/stream', (req, res) => {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive'
    });

    res.flushHeaders();

    const writer = newWriter(res);

    const initialState = setState(todoStore.getState());
    writer.write(initialState);

    const subscription = todoStore.actions$.pipe().subscribe((action) => {
        writer.write(action);
    });

    res.on('close', () => {
        console.log('client closed reqeust');
        subscription.unsubscribe();
        res.end();
    });
});

function newWriter(res: Response) {
    return {
        write(data: any) {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    };
}

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`);
});
