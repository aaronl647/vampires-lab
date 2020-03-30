// 1. Require your node modules
const mongoose = require('mongoose');

// 2. Require your model
const Vampire = require('./models/vampire');

// 3. Require your extra data source
const vampireData = require('./populateVampires');

// 4. Connect your database
mongoose.connect('mongodb://localhost:27017/vampires', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', function () {
  console.log('Connected to vampires db');
});

setTimeout(() => {
  mongoose.disconnect();
}, 4000);

// Vampire.deleteMany(() => {
//   console.log('Database Cleared!')
// });


/////////////////////////////////////////////////
//Write your answers to add, query, update, remove, and Hungry for More below.

// Note: Remember to close your connection after you add, update, remove from your database
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// INSERT USING MONGOOSE
// ### Add the vampire data that we gave you

// Vampire.create(vampireData)
//   .then(vampires => {
//     console.log("adding to database")
//     console.log(vampires);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// ### Add some new vampire data

// const vampireToAdd = {
//   name: 'Count Chocula 4',
//   hair_color: 'brown',
//   eye_color: 'brown',
//   dob: new Date(1971, 2, 13, 7, 47),
//   loves: ['cereal', 'marshmallows'],
//   location: 'Minneapolis, Minnesota, US',
//   gender: 'm',
//   victims: 2000
// };

// const addMona = {
//   name: 'Mona the Vampire',
//   hair_color: 'black',
//   eye_color: 'black',
//   dob: new Date(1999, 13, 09, 7, 47),
//   loves: ['Fighting crime', 'friends'],
//   location: 'Toronto, Ontario, Canada',
//   gender: 'f',
//   victims: 2
// };

// const addMorbius = {
//     name: 'Morbius',
//     hair_color: 'black',
//     eye_color: 'red',
//     dob: new Date(1971, 10, 13, 7, 47),
//     loves: ['Dr. Strange', 'defeating Spiderman'],
//     location: 'New York, New York, US',
//     gender: 'm',
//     victims: 300
//   }

//   const addCarmilla = {
//     name: 'Carmilla',
//     hair_color: 'blond',
//     eye_color: 'blue',
//     dob: new Date(1987, 08, 28),
//     loves: ['Dracula', 'blood'],
//     location: 'Styria, Austria',
//     gender: 'f',
//     victims: 2000
//   }

// const mona = new Vampire(addMona)
// const vampire = new Vampire(vampireToAdd);
// const carmilla = new Vampire(addCarmilla);
// const morbius = new Vampire(addMorbius);

// vampire
//   .save()
//   .then(v => {
//     console.log(v);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//   mona
//   .save()
//   .then(v => {
//     console.log(v);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//     morbius
//   .save()
//   .then(v => {
//     console.log(v);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//   carmilla
//   .save()
//   .then(v => {
//     console.log(v);
//   })
//   .catch(err =>{
//     console.log(err)
//   })

/////////////////////////////////////////////////
// ## QUERYING
/////////////////////////////////////////////////
// ### Select by comparison

// Q1 Find all the vampires that that are females

// Vampire.find({gender: 'f'})
//   .then(femaleVampire => {
//     console.log(femaleVampire.length)
//   })
//   .then(function () {
//     process.exit();
//   });

// Q2 have greater than 500 victims

// Vampire.find({ victims: { $gt: 500 } })
//   .then(vampires => {
//     console.log(vampires.length);
//     process.exit();
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Vampire.find()
//   .where('victims')
//   .gt(500)
//   .then(vampires => {
//     console.log(vampires);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Vampire.find()
//   .where('victims')
//   .gt(500)
//   .exec(function(err, vampires) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(vampires);
//   });

// An example of promise chain vs nest callbacks
// This example changes the name of the last vampire in the gt 500 list

//   Vampire.find()
//   .where('victims')
//   .gt(500)
//   .then(vampires => {
//     // console.log(vampires);
//     let v = vampires[vampires.length - 1];
//     v.name = 'New Vamp';
//     return v.save();
//   })
//   .then(newVamp => {
//     console.log('New Vamp');
//     console.log(newVamp);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Vampire.find()
//   .where('victims')
//   .gt(500)
//   .exec(function(err, vampires) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     let v = vampires[vampires.length - 1];
//     v.name = 'New Vamp';
//     v.save(function(err, newVamp) {

//     });
//   });

// Q3 have fewer than or equal to 150 victims

// Vampire.find({victims: {$lte: 150}})
// .then(vampVictims =>{
//   console.log(vampVictims)
// })
// .then(function() {
//   process.exit();
// });

// Q4 have a victim count is not equal to 210234

// Vampire.find({ victims: {$ne: 210234}})
// .then(bigVictims =>{
//   console.log(bigVictims);
// });

// Q5 have greater than 150 AND fewer than 500 victims

// MongoDB way
// Vampire.find({ $and: [{ victims: { $gt: 150 } }, { victims: { $lt: 500 } }] })
//   .then(vampires => {
//     console.log(vampires);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Mongoose way
// Vampire.find()
//   .where('victims')
//   .gt(150)
//   .where('victims')
//   .lt(500)
//   .then(vampires => {
//     console.log(vampires);
//   })
//   .catch(err => {
//     console.error(err);
//   });

/////////////////////////////////////////////////
// ### Select by exists or does not exist

// Q1 have a title property

// Vampire.find({ title: { $exists: true } })
// .then(vampTitle => {
//   console.log(vampTitle);
// });

//Q2 do not have a victims property

// Vampire.find({ victims : { $exists : false}})
// .then(vampVic => {
//   console.log(vampVic);
// });

// Q3 have a title AND no victims 

// Vampire.find({ $and: [ { title: { $exists: true } }, { victims: { $exists: false } } ] } )
// .then(vampVic => {
//   console.log(vampVic);
// })
// .catch(err => {
//   console.error(err);
// });;

// Q4 have victims AND the victims they have are greater than 1000

// Vampire.find({ $and: [ { victims: { $exists: true, $gt: 1000 } } ] } )
// .then(vampVic => {
//   console.log(vampVic);
// });

/////////////////////////////////////////////////
// ### Select with OR

// Q1 are from New York, New York, US or New Orleans, Louisiana, US

// Vampire.find({ location: { $in: ['New York, New York, US', 'New Orleans, Louisiana, US'] } })
//   .then(vampLocation => {
//     console.log(vampLocation);
//   })
//   .catch(err => {
//     console.error(err);
//   });


// Q2 love brooding or being tragic

// MongoDB
// Vampire.find({ loves: { $in: ['brooding', 'being tragic'] } })
//   .then(vampires => {
//     console.log(vampires);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Mongoose
// Vampire.find()
//   .where('loves')
//   .in(['brooding', 'being tragic'])
// .then(vampires => {
//   console.log(vampires);
// })
// .catch(err => {
//   console.error(err);
// });

// Q3 have more than 1000 victims or love marshmallows

// Vampire.find({ $or: [{ victims: { $gte: 1000 } }, { loves: 'marshmallows' }] })
//   .then(vampires => {
//     console.log(vampires);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Vampire.find()
//   .or([{ victims: { $gte: 1000 } }, { loves: 'marshmallows' }])
//   .then(vampires => {
//     console.log(vampires);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Q4 have red hair or green eyes

// Vampire.find({ eye_color: { $in: ['red', 'green'] } })
//   .then(vampEyes => {
//     console.log(vampEyes);
//   })
//   .catch(err => {
//     console.error(err);
//   });


/////////////////////////////////////////////////
//### Select objects that match one of several values

// Q1 love either frilly shirtsleeves or frilly collars

// Vampire.find({ loves: { $in: ['frilly shirtsleeves', 'frilly collars'] } })
//   .then(frillyVamps => {
//     console.log(frillyVamps);
//   })
//   .catch(err => {
//     console.error(err);
//   });

  // Q2 love brooding

  // Vampire.find({ loves: 'brooding' })
  // .then(broodingVamps => {
  //   console.log(broodingVamps);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  //  ? Q3 love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music

  // Vampire.find({loves: {$regex: 'lurking'}})
  // .then(vampsLove => {
  //   console.log(vampsLove);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  // ? Q4 love fancy cloaks but not if they also love either top hats or virgin blood * Hint-You will also have to use $nin *

  // Vampire.find({ loves: 'fancy cloaks', loves: { $nin: 'top hats'}, loves: {$nin: 'virgin blood'}})
  // .then(lovesCloaks => {
  //   console.log(lovesCloaks)
  // })
  
/////////////////////////////////////////////////
//### Negative Selection

// Q1 love ribbons but do not have brown eyes

// Vampire.find({ loves: 'ribbons', eye_color: { $nin: 'brown' }})
// .then(notBrown => {
//   console.log(notBrown)
// });

// Q2 are not from Rome

// Vampire.find({ location: { $nin: 'Rome' }})
// .then(notItalian => {
//   console.log(notItalian)
// });

// Q3 do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]

// Vampire.find({ loves: { $nin: ['fancy cloaks', 'frilly shirtsleeves', 'appearing innocent', 'being tragic', 'brooding'] }})
// .then(pickyVamps => {
//   console.log(pickyVamps)
// });

// Q4 have not killed more than 200 people

// Vampire.find({ victims: {$lte: 200}})
// .then(deaths => {
//   console.log(deaths)
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## REPLACE

// Q1 Replace the vampire called 'Claudia' with a vampire called 'Eve'.

// Vampire.findOneAndUpdate({name:'Claudia'}, {$set:{name:'Eve'}}, {new : true})
//   .then(nameChange =>{
//     console.log(nameChange)
//   })
//   .catch(function(err){
//     console.error(err)
//   })

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## UPDATE

// Q2 Update 'Eve' to have a gender of 'm'

// Vampire.findByIdAndUpdate(
//   '5e823b437bc95c29b02e9ed7', 
//   { $set: { gender: 'm' } },
//   {new: true},
//   )
//   .then(function(toMale){
//     console.log(toMale)
//   })
//   .catch(function(err){
//     console.error(err)
//   })

// ? Q3 Rename 'Eve's' name field to 'moniker'

// Vampire.findOneAndModify({name:'Eve'}, {$set:{name:'Moniker'}}, {new : true})
//   .then(nameChange =>{
//     console.log(nameChange)
//   })
//   .catch(function(err){
//     console.error(err)
//   })

// Q4 We now no longer want to categorize female gender as "f", but rather as fems. Update all females so that the they are of gender "fems".

// Vampire.updateMany(
//   {gender:'f'},{gender:'fem'}) 
//   .then(function(toFems){
//     console.log(toFems)
//   })
//   .catch(function(err){
//     console.error(err)
//   }) 

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## REMOVE

// Q1 Remove a single document wherein the hair_color is 'brown'

// Vampire.findOneAndRemove({hair_color:'brown'})
// .then(function(noBrown){
//   console.log(noBrown)
// }).catch(function(err){
//   console.error(err)
// });
    
//Q2 We found out that the vampires with the blue eyes were just fakes! Let's remove all the vampires who have blue eyes from our database.

// Vampire.deleteMany({eye_color:'blue'})
// .then(function(phonyVamps){
//   console.log(phonyVamps)
// })
// .catch(function(err){
//   console.error(err)
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// ## HUNGRY FOR MORE
/////////////////////////////////////////////////
//## Select objects that match one of several values

/////////////////////////////////////////////////
//## Negative Selection

/////////////////////////////////////////////////