function checkVisitor(req, res, next) {
    if (req.user) {
        res.redirect('/');
    }
    next();
}

function checkLogin(req, res, next) {
    if (req.user === undefined) {
        res.redirect('/');
    }
    next();
}

module.exports = {
    checkVisitor: checkVisitor,
    checkLogin: checkLogin
};