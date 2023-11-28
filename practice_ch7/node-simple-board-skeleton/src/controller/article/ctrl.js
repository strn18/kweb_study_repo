const { ArticleDAO } = require('../../DAO');

const readArticle = async (req, res, next) => {
  try {
    const { user } = req.session;
    const { articleId } = req.params;

    const article = await ArticleDAO.getById(articleId);

    if (!article) throw new Error('NOT_EXIST');
    return res.render('articles/details.pug', { user, article });
  } catch (err) {
    return next(err);
  }
};

const writeArticleForm = async (req, res, next) => {
  try {
    const { user } = req.session;

    return res.render('articles/editor.pug', { user });
  } catch (err) {
    return next(err);
  }
};

const writeArticle = async (req, res, next) => {
  try {
    const title = req.body.title.trim();
    const content = req.body.content.trim();
    const { user } = req.session;

    if (!title || !content) throw new Error('BAD_REQUEST');
    if (title.length > 50 || content.length > 65000) throw new Error('BAD_REQUEST');

    const articleID = await ArticleDAO.create(title, content, user);

    return res.redirect(`/article/${articleID}`);
  } catch (err) {
    return next(err);
  }
};

const editArticleForm = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { user } = req.session;
    const article = await ArticleDAO.getById(articleId);

    if (!article) throw new Error('NOT_EXIST');

    res.render('articles/editor.pug', { user, article });
  } catch (err) {
    next(err);
  }
};

const editArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { user } = req.session;
    const title = req.body.title.trim();
    const content = req.body.content.trim();

    if (!title || !content || title.length > 50 || content.length > 65000) throw new Error('BAD REQUEST');

    const article = await ArticleDAO.getByIdAndAuthor(articleId, user);
    
    if (!article) throw new Error('NOT_EXIST');

    await ArticleDAO.update(articleId, title, content);

    return res.redirect(`/article/${articleId}`);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { user } = req.session;

    const article = await ArticleDAO.getByIdAndAuthor(articleId, user);

    if (!article) throw new Error('NOT_EXIST');

    ArticleDAO.remove(articleId);

    return res.redirect('/articles/page/1');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  readArticle, 
  writeArticleForm,
  writeArticle,
  editArticleForm,
  editArticle,
  deleteArticle,
};
