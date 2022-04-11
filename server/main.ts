import express from 'express';
import cors from 'cors';
import { TodoStore } from '../shared';

const app = express();

app.use(cors());
app.use(express.json());

const todoStore = new TodoStore({
	todos: [
		{
			title: 'First',
			description: 'Do something',
			done: false,
			id: '12345'
		}
	]
});

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

	res.write(
		JSON.stringify({
			initial: todoStore.getState()
		}) + '\n\n'
	);

	const subscription = todoStore.actions$.pipe().subscribe((action) => {
		console.log(todoStore.getState());
		res.write(
			JSON.stringify({
				action
			}) + '\n\n'
		);
	});

	res.on('close', () => {
		console.log('client closed reqeust');
		subscription.unsubscribe();
		res.end();
	});
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Facts Events service listening at http://localhost:${PORT}`);
});
