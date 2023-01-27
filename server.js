const express = require('express');

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1/blob');

const Article = require('./models/articles');

const app = express();

app.set('view engine', 'ejs');

const articleRouter = require('./routes/articles');

app.use(express.urlencoded({ extended: false}));

app.get('/', async (req, res) => {

	const articles = await Article.find();
	res.render('articles/index', {articles : articles});

	
})

app.use('/articles', articleRouter);

app.listen(5001);