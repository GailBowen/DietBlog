const express = require('express');
const Article = require('./../models/articles');
const router = express.Router();

router.get('/new', (req, res) => {
	res.render('articles/new', { article: new Article() })
});

router.get('/:id', async (req, res) => {
	const article = await Article.findById(req.params.id);

	console.log('req.params.id', req.params.id);

	console.log('req.params', req.params);

	if (article == null) res.redirect('/');
	console.log('just before show***', article);
	res.render('articles/show', { article: article });
});

router.post('/', async (req, res) => {
	let article = new Article({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown
	})

	try {
		article = await article.save();
		res.redirect(`/articles/${article.id}`)
	} catch (e) {
		console.log('still broken! *********:', e)
		console.log('article in catch**&&&&&&&', article)
		res.render('articles/new', {article: article});
	}
	
})


module.exports = router;