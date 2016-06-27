module.exports = function (app) {

    var emergencies = app.controllers.emergenciesController;

    app.post('/api/emergency/', emergencies.registerEmergency);
};
