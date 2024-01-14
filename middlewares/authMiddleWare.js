function requireLogin(req, res, next) {
    if (!req.session.user) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/user/login');
    }
    next();
}
function requireLoginMyCart(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/user/login');
    }
    next();
}
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect('/user/home');
    }
    next();
}


module.exports = {
    requireLogin,isAuthenticated, requireLoginMyCart
};