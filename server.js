const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
	res.render('index');
})

app.listen(5000);