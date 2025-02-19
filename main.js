// main.js
import { DataManager } from "./solutions/DataManager.js";
import { UserFactory } from "./solutions/UserFactory.js";
import { HealthData } from "./solutions/HealthData.js";
import { HealthReminder } from "./solutions/HealthReminder.js";
import { HealthAdvice } from "./solutions/HealthAdvice.js";
import { ReportBuilder } from "./solutions/ReportBuilder.js";

/**
 * Get the singleton instance of DataManager
 */
const dm = DataManager.getInstance();

console.log("=== Health Data Management System: Main Demo ===\n");

/* ------------------------------------------------------------------
 * 1. Create different types of users and add them to DataManager
 * ------------------------------------------------------------------ */
const doctor = UserFactory.createUser("doctor", {
  userID: "D100",
  name: "Dr. Chen",
  age: 45,
  gender: "Male",
  contactInfo: { email: "drchen@example.com", phone: "123456" },
  specialization: "Cardiology",
  licenseNumber: "LIC987654",
  department: "Cardiology Dept"
});
dm.addUser(doctor);

const patient = UserFactory.createUser("patient", {
  userID: "P100",
  name: "Alice Patient",
  age: 30,
  gender: "Female",
  contactInfo: { email: "alicep@example.com", phone: "654321" },
  medicalHistory: { pastIllnesses: ["Flu"] },
  conditions: ["High Blood Pressure"],
  medications: ["Amlodipine"]
});
dm.addUser(patient);

const fitUser = UserFactory.createUser("fitness", {
  userID: "F100",
  name: "Bob Fitness",
  age: 25,
  gender: "Male",
  contactInfo: { email: "bobfit@example.com", phone: "987654" },
  workoutPreferences: { favoriteExercises: ["Running", "Cycling"] },
  fitnessGoals: { targetWeight: 68 }
});
dm.addUser(fitUser);

console.log("Users created and added to DataManager:");
console.log("Doctor:", dm.getUser("D100"));
console.log("Patient:", dm.getUser("P100"));
console.log("FitnessEnthusiast:", dm.getUser("F100"));

/* ------------------------------------------------------------------
 * 2. Create multiple HealthData records and add them to DataManager
 * ------------------------------------------------------------------ */
const hd1 = new HealthData("HD101", new Date("2025-01-10"), 70, "120/80", 75, "Running", 7, "Good condition");
dm.addHealthData(hd1);

const hd2 = new HealthData("HD102", new Date("2025-01-11"), 71, "130/85", 78, "Swimming", 8, "Slightly elevated BP");
dm.addHealthData(hd2);

console.log("\nHealthData added:");
console.log("HD101:", dm.getHealthData("HD101"));
console.log("HD102:", dm.getHealthData("HD102"));

/* ------------------------------------------------------------------
 * 3. Demonstrating Patient Usage
 * ------------------------------------------------------------------ */
console.log("\n=== Demonstrating Patient Usage ===");
const patUser = dm.getUser("P100");
if (patUser) {
  // Record new medical history
  patUser.recordMedicalHistory({ surgeries: ["Appendectomy"] });
  // Update conditions
  patUser.updateConditions(["High Blood Pressure", "Seasonal Allergies"]);
  // Update medications
  patUser.updateMedications(["Amlodipine", "Cetirizine"]);

  // Add a new HealthData record for the patient
  const patHD = new HealthData("HD_P100_01", new Date("2025-02-01"), 69, "125/85", 74, "Walking", 6, "Slight improvement");
  patUser.addHealthRecord(patHD);
  dm.addHealthData(patHD);

  console.log("Patient's updated profile:", patUser.viewProfile());
  console.log("Patient's health records:", patUser.viewHealthRecords());
} else {
  console.log("No Patient user found with ID P100.");
}

/* ------------------------------------------------------------------
 * 4. Demonstrating Doctor Usage
 * ------------------------------------------------------------------ */
console.log("\n=== Demonstrating Doctor Usage ===");
const docUser = dm.getUser("D100");
if (docUser) {
  // Doctor views patient health records
  const records = docUser.viewPatientRecords("P100");
  console.log("Doctor sees patient P100's records (demo array):", records);

  // Doctor updates some records (demo output)
  const newDataForPatient = dm.getHealthData("HD_P100_01");
  if (newDataForPatient) {
    newDataForPatient.remarks = "Doctor updated remarks: keep monitoring BP.";
    docUser.updatePatientRecord("P100", newDataForPatient);
  }

  // Doctor generates a new report
  const newReport = docUser.generateReport("P100");
  dm.addReport(newReport);
  console.log("Doctor generated and added new report:", newReport);
} else {
  console.log("No Doctor user found with ID D100.");
}

/* ------------------------------------------------------------------
 * 5. Demonstrating FitnessEnthusiast Usage
 * ------------------------------------------------------------------ */
console.log("\n=== Demonstrating FitnessEnthusiast Usage ===");
if (fitUser) {
  console.log("Before updating preferences/goals:", fitUser.viewProfile());

  // Update workout preferences and fitness goals
  fitUser.setWorkoutPreferences({
    favoriteExercises: ["Running", "Cycling"],
    preferredTimes: ["Morning"]
  });
  fitUser.updateFitnessGoals({
    targetWeight: 64,
    muscleGain: true
  });

  // View updated profile
  console.log("After updating preferences/goals:", fitUser.viewProfile());

  // Record new workout data
  const workoutData = new HealthData(
    "HD_F100_01",
    new Date(),
    70,
    "120/80",
    75,
    "Running",
    7,
    "Felt good today"
  );
  fitUser.recordWorkoutData(workoutData);
  dm.addHealthData(workoutData);

  console.log("Newly recorded workout data in DataManager:", dm.getHealthData("HD_F100_01"));
} else {
  console.log("No FitnessEnthusiast user found with ID F100.");
}

/* ------------------------------------------------------------------
 * 6. Demonstrating ReportBuilder Usage
 * ------------------------------------------------------------------ */
console.log("\n=== Demonstrating ReportBuilder ===");
const builder = new ReportBuilder();
const monthlyReport = builder
  .setReportID("R100")
  .setDateRange("2025-01-01 ~ 2025-01-31")
  .setSummary("Initial monthly analysis for patient P100")
  .setExportStatus(false)
  .build();
dm.addReport(monthlyReport);
console.log("Report R100 added to DataManager:", dm.getReport("R100"));

/* ------------------------------------------------------------------
 * 7. Adding HealthReminder and HealthAdvice
 * ------------------------------------------------------------------ */
console.log("\n=== Adding Reminders and Advice ===");
const reminder = new HealthReminder(
  "REM100",
  "Medication",
  "Take pill at 9 AM",
  new Date("2025-01-12T09:00:00"),
  false
);
dm.addReminder(reminder);

const advice = new HealthAdvice("ADV100", "Diet", "Reduce sodium intake");
dm.addAdvice(advice);

console.log("Reminder REM100:", dm.getReminder("REM100"));
console.log("Advice ADV100:", dm.getAdvice("ADV100"));

/* ------------------------------------------------------------------
 * 8. Displaying all reports in the system
 * ------------------------------------------------------------------ */
console.log("\n=== Displaying all current reports in the system ===");
console.log("R100:", dm.getReport("R100"));
// If the doctor generates another report, retrieve it as well
const generatedRep = docUser?.generateReport("P100");
if (generatedRep) {
  dm.addReport(generatedRep);
  console.log(`New doctor-generated report ID: ${generatedRep.reportID}`, dm.getReport(generatedRep.reportID));
}
