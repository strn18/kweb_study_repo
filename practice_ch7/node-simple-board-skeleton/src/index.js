require('./env');
const app = require('./app');

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(process.env.PORT);
	console.log(`KWEB Project: Listening on port ${port}.`);
});

// username: kwebuser / password: kwebpw / displayName: kwebname
