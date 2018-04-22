module.exports = app => {
    app.get('/api/current-user', (req, res)=> {
        (req.user) ? res.send(req.user) : res.send(null);
    });
};