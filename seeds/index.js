const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Import models
const LectureHall = require('../models/lectHall');
const Passcode = require('../models/passcode');
const Professor = require('../models/professor');
const Student = require('../models/student');

// Connect to MongoDB using the environment variable
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to mongoose!');

        // Seed lecture halls
        await LectureHall.deleteMany({});
        const lectureHalls = ["G4", "G5", "G6", "G7"];
        for (const name of lectureHalls) {
            await new LectureHall({ name }).save();
        }

        // Seed passcodes
        await Passcode.deleteMany({});
        const passcodes = ["4", "5", "6", "7"];
        for (const name of passcodes) {
            await new Passcode({ name: `${name}`, pass: `${name}${Math.floor(Math.random() * 1000 + 1)}` }).save();
        }

        // Seed professors
        await Professor.deleteMany({});
        const professors = [
            { name: "Arnab Sarkar", password: "p1", uid: "p1", class: "ME231" },
            { name: "Awaneesh", password: "p2", uid: "p2", class: "PHY101" },
            { name: "Rajeev Kumar", password: "p3", uid: "p3", class: "MA201" },
            { name: "Amit Tyagi", password: "p4", uid: "p4", class: "ME104" },
            { name: "M. Vashishth", password: "p5", uid: "p5", class: "ME252" },
        ];
        for (const professor of professors) {
            await new Professor(professor).save();
        }

        // Seed students
        await Student.deleteMany({});
        const students = [
            { name: "Rohan", rollNo: 1, password: "1" },
            { name: "Raj", rollNo: 2, password: "2" },
            { name: "Prem", rollNo: 3, password: "3" },
            { name: "Aditya", rollNo: 4, password: "4" },
        ];
        for (const student of students) {
            await new Student(student).save();
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the Mongoose connection
        await mongoose.connection.close();
        // Exit the process
        process.exit(0);
    }
}

main().catch(err => {
    console.log('There was an error connecting to mongoose :(', err);
    process.exit(1);
});
