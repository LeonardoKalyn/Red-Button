var mongoose = require('mongoose');

module.exports =  function(){

    var emergencySchema = mongoose.Schema({
        patient: {
            name: String,
            healthPlan: String,
            planNumber: String,
            bloodType: String,
            donor: Boolean
        },
        contacts: [
            {
                name: String,
                link: String,
                number: String
            }
        ],
        allergies: [
            {
                name: String,
                checked: Boolean
            }
        ],
        diseases: [
            {
                name: String,
                checked: Boolean
            }
        ],
        coordinates: {
            latitude: String,
            longitude: String
        }
    });


    return mongoose.model('Emergency', emergencySchema);
};
