// Requiring models
const Student = require('../models/student');
const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');
const Passcode = require('../models/passcode');
const AppError = require('../utility/appError');

function validatedIp(arr, ip) {
    return !arr.includes(ip);
}

function getDistance(point1, point2) {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = toRadians(point1.lat);
    const lat2 = toRadians(point2.lat);
    const latDiff = toRadians(point2.lat - point1.lat);
    const lonDiff = toRadians(point2.lon - point1.lon);

    const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

const g4 = { lat: 25.262618307398068, lon: 82.99195307752026 };
const g5 = { lat: 25.262429775065673, lon: 82.99211496156191 };
const g6 = { lat: 25.262293231167845, lon: 82.99217598068392 };
const g7 = { lat: 25.262193134497135, lon: 82.99221779381561 };

const d_g4g5 = 0.021597932308693058;

module.exports = {
    renderAttendanceForm: async (req, res) => {
        try {
            res.render('students/attendance');
        } catch (err) {
            next(err);
        }
    },

    verify: async (req, res, next) => {
        try {
            const { x } = req.params;
            console.log("Verify route hit");

            if (x == 1) {
                const pg4 = await Passcode.findOne({ name: "pass4" });
                const pg5 = await Passcode.findOne({ name: "pass5" });
                const pg6 = await Passcode.findOne({ name: "pass6" });
                const pg7 = await Passcode.findOne({ name: "pass7" });

                pg4.pass = "4" + Math.floor(Math.random() * 1000 + 1);
                pg5.pass = "5" + Math.floor(Math.random() * 1000 + 1);
                pg6.pass = "6" + Math.floor(Math.random() * 1000 + 1);
                pg7.pass = "7" + Math.floor(Math.random() * 1000 + 1);

                await pg4.save();
                await pg5.save();
                await pg6.save();
                await pg7.save();
            }

            if (x.toString() === "1") {
                return res.render("students/attendanceSuccess");
            } else {
                return next(new AppError("Attendance Marking Failed!!"));
            }
        } catch (err) {
            next(err);
        }
    },

    markAttendance: async (req, res, next) => {
        try {
            const { rollNo, password, passcode, latitude, longitude } = req.body;
            console.log(req.body);

            if (!(latitude && longitude)) {
                return res.redirect(`/students/verify/0`);
            }

            const stud = await Student.findOne({ rollNo, password });
            if (!stud) throw new AppError("Sorry, could not find student!!");

            req.session.studId = stud._id;

            const passcodes = {
                "4": { pass: await Passcode.findOne({ name: "pass4" }), hallName: 'G4', location: g4 },
                "5": { pass: await Passcode.findOne({ name: "pass5" }), hallName: 'G5', location: g5 },
                "6": { pass: await Passcode.findOne({ name: "pass6" }), hallName: 'G6', location: g6 },
                "7": { pass: await Passcode.findOne({ name: "pass7" }), hallName: 'G7', location: g7 },
            };

            const passCodeKey = passcode[0];
            const selectedPasscode = passcodes[passCodeKey];

            if (selectedPasscode && selectedPasscode.pass.pass.toString() === passcode.toString()) {
                const distance = getDistance(selectedPasscode.location, { lat: latitude, lon: longitude });
                if (distance > 200.5 * d_g4g5) {
                    return res.redirect(`/students/verify/0`);
                }

                const hall = await LectureHall.findOne({ name: selectedPasscode.hallName });
                const prof = await Professor.findOne({ name: hall.occupiedBy });

                if (prof) {
                    // Temporarily disabling proxy verification by commenting out the following lines.
                    /*
                    const reqIp = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
                    console.log("IP inside the hall is:", reqIp);

                    if (validatedIp(prof.ip, reqIp)) {
                        prof.att.push(stud._id);
                        prof.ip.push(reqIp.toString());
                        await prof.save();
                        return res.redirect(`/students/verify/1`);
                    } else {
                        console.log("Didn't allow proxy!!!");
                        return res.redirect(`/students/verify/0`);
                    }
                    */

                    // Directly marking attendance without IP check
                    prof.att.push(stud._id);
                    await prof.save();
                    return res.redirect(`/students/verify/1`);
                }
            }
            return res.redirect(`/students/verify/0`);
        } catch (err) {
            next(err);
        }
    }
};
