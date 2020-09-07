const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let typeValidator = {
    values : ['VEGAN', 'VEGETARIAN', 'ALL', 'DESSERT'],
    message: '{VALUE} no es un type valido'
};

let recetaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El name es requerido']
    },
    difficulty: {
        type: String,
        required: [true, 'El difficulty es requerido']
    },
    time: {
        type: String,
        required: [true, 'El time es requerido']
    },
    ingredients: {
        type: String,
        required: [true, 'El ingredients es requerido']
    },
    type: {
        type: [String],
        required: [true, 'El tipo es requerido '],
        enum: typeValidator
    },
    steps: {
        type: String,
        default: ""
    },
    glutenFree: {
        type: Boolean,
        required: [true, 'Requiere que aclares si es glutenFree ']
    }
});

module.exports = mongoose.model('Receta', recetaSchema);
