const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    quantity: Number,
    price: Number,
    description: String,
    created_by: {type: Schema.Types.ObjectId, ref: 'User'}
});


// Ensure virtual fields are serialised.
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }

});

ProductSchema.index({name: 'text'});

module.exports = mongoose.model('product', ProductSchema);

