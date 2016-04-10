System.config({
    packages: {
        app: {
            defaultExtension: 'js'
        }
    }
});

System.import('./app/main')
    .catch((err) => console.error(err));
