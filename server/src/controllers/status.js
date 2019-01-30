'use strict';

module.exports = router => {
    router.get('/', (req, res) => {
        res.json({
            status: 'ok'
        });
    });

    router.get('/is-dev-notebook', (req, res) => {
        res.send('true');
    });
};
