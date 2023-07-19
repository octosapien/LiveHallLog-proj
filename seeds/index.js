const mongoose = require('mongoose');
// This will contain list of classes
const LectureHall = require('../models/lectHall');
const Passcode = require('../models/passcode');
const Professor = require('../models/professor');
const Student = require('../models/student');

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/proj1');
    console.log('Sucessfully connected to mongoose!')

    //seed lecture halls
    await LectureHall.deleteMany({});

    let g4 = new LectureHall({
        name: "G4",
    });
    await g4.save();

    let g5 = new LectureHall({
        name: "G5",
    });
    await g5.save();

    let g6 = new LectureHall({
        name: "G6",
    });
    await g6.save();

    let g7 = new LectureHall({
        name: "G7",
    });
    await g7.save();


    //seed passcodes
    
    await Passcode.deleteMany({});

    let pg4 = new Passcode({
        name: "pass4",
        pass: "4" + Math.floor(Math.random() * 1000 + 1),
    });
    await pg4.save();

    let pg5 = new Passcode({
        name: "pass5",
        pass: "5" + Math.floor(Math.random() * 1000 + 1),
    });
    await pg5.save();

    let pg6 = new Passcode({
        name: "pass6",
        pass: "6" + Math.floor(Math.random() * 1000 + 1),
    });
    await pg6.save();

    let pg7 = new Passcode({
        name: "pass7",
        pass: "7" + Math.floor(Math.random() * 1000 + 1),
    });
    await pg7.save();


    //seed professors
    await Professor.deleteMany({});

    let p1 = new Professor({
        name: "Arnab Sarkar",
        password: "p1",
        uid: "p1",
        class: "ME231"
    });
    await p1.save();

    let p2 = new Professor({
        name: "Awaneesh",
        password: "p2",
        uid: "p2",
        class: "PHY101"
    });
    await p2.save();

    let p3 = new Professor({
        name: "Rajeev Kumar",
        password: "p3",
        uid: "p3",
        class: "MA201"
    });
    await p3.save();

    let p4 = new Professor({
        name: "Amit Tyagi",
        password: "p4",
        uid: "p4",
        class: "ME104"
    });
    await p4.save();

    let p5 = new Professor({
        name: "M. Vashishth",
        password: "p5",
        uid: "p5",
        class: "ME252"
    });
    await p5.save();

    //seed students

    
    await Student.deleteMany({});

    let stud1 = new Student({
        name: "Rohan",
        rollNo: 1,
        password: "1"
    });
    await stud1.save();

    let stud2 = new Student({
        name: "Raj",
        rollNo: 2,
        password: "2"
    });
    await stud2.save();

    let stud3 = new Student({
        name: "Prem",
        rollNo: 3,
        password: "3"
    });
    await stud3.save();

    let stud4 = new Student({
        name: "Aditya",
        rollNo: 4,
        password: "4"
    });
    await stud4.save();

};