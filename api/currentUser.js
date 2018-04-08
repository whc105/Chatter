module.exports = app => {
    app.get('/api/current-user', (req, res)=> {
        if (req.user) {
            res.send(req.user);
        } else {
            res.send(null);
        }
    });
};