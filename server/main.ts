import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/streaming', (req, res) => {
	res.set({
		'Cache-Control': 'no-cache',
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive'
	});

	res.flushHeaders();

	let counter = 0;
	const interValID = setInterval(() => {
		counter++;
		if (counter >= 20) {
			clearInterval(interValID);
			res.end();
			return;
		}
		res.write(`hello friend ${counter}\n\n`);
	}, 500);

	res.on('close', () => {
		console.log('client closed reqeust');
		clearInterval(interValID);
		res.end();
	});
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Facts Events service listening at http://localhost:${PORT}`);
});
