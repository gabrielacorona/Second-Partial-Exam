const mongoose = require('mongoose');

/* 
{
id: 29,
name: "Basketball",
num_players: 5,
}
{
id: 11,
titulo: "Football",
num_players: 11,
Page 3
}
*/
const sportsCollectionSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    num_players: {
        type: Number,
        required: true
    }
});
const sportsCollection = mongoose.model('sports', sportsCollectionSchema);

const Sports = {
    //query that adds a sport
    createSport: function (newSport) {
        return sportsCollection
            .create(newSport)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err;
            });
    }
};





module.exports = {
    Sports
};