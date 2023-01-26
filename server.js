const express = require('express');

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/blob');

const app = express();

app.set('view engine', 'ejs');

const articleRouter = require('./routes/articles');

app.use(express.urlencoded({ extended: false}));

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

app.use('/articles', articleRouter);

app.listen(5000);