module.exports =  function(app){

    var Emergency = app.models.emergency;

    var controller = {};

    controller.registerEmergency = function (req, res) {
        var emergencyData = req.body;
        Emergency.create(emergencyData, function(err, newReserve){
            if (err){
                return res.send({success: false});
            }
            else{
                return res.send({success: true});
            }
        })
    };

    return controller;
};
