function requireLogin(req, res, next) {
    if (!req.session.admin) {
        return res.redirect('/admin/login');
    }
    next();
}
function isAuthenticated(req, res, next) {
    if (req.session && req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    next();
}
module.exports = {
    requireLogin,isAuthenticated
};