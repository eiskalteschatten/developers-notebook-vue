'use strict';

module.exports = {
    returnError,
    setupErrorHandling
};

const translations = {
    en: {
        anErrorOccurred: 'An error occurred.',
        anErrorOccurredSentence: 'An error occurred. Please click the back button in your browser to try again.',
        back: 'Back',
        pageNotFound: 'Page not found',
        pageNotFoundSentence: 'This page could not be found. Please check the URL or try again from the homepage.',
        homepage: 'Homepage'
    },
    de: {
        anErrorOccurred: 'Ein Fehler ist aufgetreten.',
        anErrorOccurredSentence: 'Ein Fehler ist aufgetreten. Bitte klicken Sie auf den Zurück-Knopf von Ihrem Browser, um noch einmal zu probieren.',
        back: 'Zurück',
        pageNotFound: 'Seite nicht gefunden',
        pageNotFoundSentence: 'Diese Seite konnte nicht gefunden werden. Bitte prüfen Sie die URL oder versuchen Sie noch einmal von der Startseite.',
        homepage: 'Startseite'
    }
};

function returnError(error, res, req) {
    if (error.statusCode) {
        res.status(error.statusCode).send(error.message);
    }
    else {
        console.error(error);
        res.status(500).send(translations[req.preferedLanguage].anErrorOccurred);
    }
}

function setupErrorHandling(app) {
    // 404 Page
    app.use((req, res) => {
        res.status(404).send(translations[req.preferedLanguage].pageNotFound);
        // res.status(404).render('error/404.njk', {
        //     translations: translations[req.preferedLanguage]
        // });
    });

    // Development error handler - will print stacktrace
    if (app.get('env') === 'development') {
        app.use((error, req, res) => {
            console.error(error.message);
            res.status(error.status || 500).send(error.message);

            // res.render('error/500.njk', {
            //     message: error.message,
            //     error: error,
            //     translations: translations[req.preferedLanguage]
            // });
        });
    }

    // Production error handler - no stacktraces leaked to user
    app.use((error, req, res) => {
        console.error(error.message);
        res.status(error.status || 500).send(translations[req.preferedLanguage].anErrorOccurred);

        // res.render('error/500.njk', {
        //     translations: translations[req.preferedLanguage]
        // });
    });

    return app;
}
