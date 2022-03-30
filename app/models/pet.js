
// PET --> has many toys & has owner that is user

const mongoose = require('mongoose')
const toySchema = require('./toy')

const { Schema, model } = mongoose

const petSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        adoptable: {
            type: Boolean,
            required: true,
        },
        toys: [toySchema],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
    timestamps: true,
    //  we're going to add virtuals to our model
    // these lines ensure that the virtual will be included
    // whenever we turn our document to an object or JSON
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)

// virtuals go here(we'll build these later)
// a virtual is a virtual property, that uses the data that's saved in teh database, to add a property whenever we retrieve that document & convert it to an object
// using classic function to be able to use 'this.' in the function
// arrow function would go up in scope outside of object
petSchema.virtual('fullTitle').get(function () {
    // we can do whatever javascripty things we want in here
    // we just need to make sure that we return some value
    // fullTitle is going to tcombine the name & type to build a title
    return `${this.name} the ${this.type}`
})

petSchema.virtual('isABaby').get(function () {
    if (this.age < 5) {
        return 'Yeah theyre just a baby'
    } else if (this.age >= 5 && this.age < 10) {
        return 'not really a baby, but still a baby'
    } else {
        return 'a good old pet (definitely still a baby'
    }
})

module.exports = model('Pet', petSchema)