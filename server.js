const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

let yourDate = new Date();

console.log('yourDate', yourDate.toISOString().split('T')[0]);

app.get('/', (req, res) => {
	const articles = [{
		title: 'Test Article',
		createdAt: new Date(),
		description: 'Test description'
	},
	{
		title: 'Test Article 2',
		createdAt: new Date(),
		description: 'Test description 2nd'
	}
	];

	res.render('articles/index', {articles : articles});

	
})

app.listen(5000);