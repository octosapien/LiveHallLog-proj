// Requiring models
const Passcode = require('../models/passcode');

async function refreshPasscode() {
  try {
    const pg4 = await Passcode.findOne({ name: "4" });
    const pg5 = await Passcode.findOne({ name: "5" });
    const pg6 = await Passcode.findOne({ name: "6" });
    const pg7 = await Passcode.findOne({ name: "7" });

    if (pg4) {
      pg4.pass = "4" + Math.floor(Math.random() * 1000 + 1);
      await pg4.save();
    } else {
      console.warn('Passcode with name "pass4" not found');
    }

    if (pg5) {
      pg5.pass = "5" + Math.floor(Math.random() * 1000 + 1);
      await pg5.save();
    } else {
      console.warn('Passcode with name "pass5" not found');
    }

    if (pg6) {
      pg6.pass = "6" + Math.floor(Math.random() * 1000 + 1);
      await pg6.save();
    } else {
      console.warn('Passcode with name "pass6" not found');
    }

    if (pg7) {
      pg7.pass = "7" + Math.floor(Math.random() * 1000 + 1);
      await pg7.save();
    } else {
      console.warn('Passcode with name "pass7" not found');
    }

  } catch (error) {
    console.error('Error updating passcodes:', error);
  }
}

module.exports = refreshPasscode;
