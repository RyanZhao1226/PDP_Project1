// tests/project1.test.js
import { DataManager } from "../solutions/DataManager.js";
import { UserFactory } from "../solutions/UserFactory.js";
import { Doctor } from "../solutions/Doctor.js";
import { Patient } from "../solutions/Patient.js";
import { FitnessEnthusiast } from "../solutions/FitnessEnthusiast.js";
import { HealthData } from "../solutions/HealthData.js";
import { HealthReminder } from "../solutions/HealthReminder.js";
import { HealthAdvice } from "../solutions/HealthAdvice.js";
import { Report } from "../solutions/Report.js";
import { ReportBuilder } from "../solutions/ReportBuilder.js";

describe("Health Data Management System - Unit Tests", () => {
  // If DataManager is a singleton, use DataManager.getInstance().
  // Otherwise, we'll instantiate a new DataManager for each test suite.
  let dm;

  beforeAll(() => {
    // For singleton usage:
    // dm = DataManager.getInstance();
    // For non-singleton usage:
    dm = new DataManager();
  });

  // ========== 1. UserFactory Tests ==========
  describe("UserFactory Tests", () => {
    test("should create a FitnessEnthusiast user", () => {
      const user = UserFactory.createUser("fitness", {
        userID: "F001",
        name: "Alice",
        age: 25,
        gender: "Female",
        contactInfo: { email: "alice@example.com", phone: "123" },
        workoutPreferences: {},
        fitnessGoals: {}
      });
      expect(user).toBeInstanceOf(FitnessEnthusiast);
      expect(user.name).toBe("Alice");
    });

    test("should create a Patient user", () => {
      const user = UserFactory.createUser("patient", {
        userID: "P001",
        name: "Bob",
        age: 50,
        gender: "Male",
        contactInfo: { email: "bob@example.com", phone: "456" },
        medicalHistory: {},
        conditions: [],
        medications: []
      });
      expect(user).toBeInstanceOf(Patient);
      expect(user.name).toBe("Bob");
    });

    test("should create a Doctor user", () => {
      const user = UserFactory.createUser("doctor", {
        userID: "D001",
        name: "Dr. Wang",
        age: 40,
        gender: "Male",
        contactInfo: { email: "drwang@example.com", phone: "789" },
        specialization: "Cardiology",
        licenseNumber: "LIC123456",
        department: "Cardiology Dept"
      });
      expect(user).toBeInstanceOf(Doctor);
      expect(user.name).toBe("Dr. Wang");
    });

    test("should throw error for unknown user type", () => {
      expect(() => {
        UserFactory.createUser("unknown", {});
      }).toThrow();
    });
  });

  // ========== 2. DataManager Tests ==========
  describe("DataManager Tests", () => {
    test("should add and retrieve a user", () => {
      const doctor = new Doctor("D002", "Dr. Lee", 45, "Female", { email: "lee@example.com", phone: "000" }, "Pediatrics", "LIC654321", "Pediatrics Dept");
      dm.addUser(doctor);

      const retrieved = dm.getUser("D002");
      expect(retrieved).toBeInstanceOf(Doctor);
      expect(retrieved.name).toBe("Dr. Lee");
    });

    test("should add and retrieve HealthData", () => {
      const hd = new HealthData("HD001", new Date("2025-01-01"), 70, "120/80", 72, "Running", 8, "Feeling good");
      dm.addHealthData(hd);

      const result = dm.getHealthData("HD001");
      expect(result).toBeInstanceOf(HealthData);
      expect(result.weight).toBe(70);
    });

    test("should add and retrieve a Report", () => {
      const report = new Report("R001", "2025-01-01 ~ 2025-01-31", "Initial summary", false);
      dm.addReport(report);

      const retrieved = dm.getReport("R001");
      expect(retrieved).toBeInstanceOf(Report);
      expect(retrieved.reportID).toBe("R001");
    });

    test("should add and retrieve a HealthReminder", () => {
      const reminder = new HealthReminder("REM001", "Medication", "Take pill at 9 AM", new Date(), false);
      dm.addReminder(reminder);

      const retrieved = dm.getReminder("REM001");
      expect(retrieved).toBeInstanceOf(HealthReminder);
      expect(retrieved.type).toBe("Medication");
    });

    test("should add and retrieve a HealthAdvice", () => {
      const advice = new HealthAdvice("ADV001", "Diet", "Reduce sugar intake");
      dm.addAdvice(advice);

      const retrieved = dm.getAdvice("ADV001");
      expect(retrieved).toBeInstanceOf(HealthAdvice);
      expect(retrieved.category).toBe("Diet");
    });
  });

  // ========== 3. ReportBuilder Tests ==========
  describe("ReportBuilder Tests", () => {
    test("should build a report with chain calls", () => {
      const builder = new ReportBuilder();
      const report = builder
        .setReportID("R100")
        .setDateRange("2025-02-01 ~ 2025-02-28")
        .setSummary("Monthly Summary")
        .setExportStatus(true)
        .build();

      expect(report).toBeInstanceOf(Report);
      expect(report.reportID).toBe("R100");
      expect(report.exportStatus).toBe(true);
    });
  });

  // ========== 4. Doctor, Patient, FitnessEnthusiast Tests ==========
  describe("Doctor Class Tests", () => {
    test("should create a doctor and view patient records", () => {
      const doc = new Doctor("D003", "Dr. Han", 38, "Male", { email: "han@example.com", phone: "999" }, "Neurology", "LIC111222", "Neuro Dept");
      const records = doc.viewPatientRecords("P999");
      // In the sample code, this might return an empty array
      expect(records).toBeInstanceOf(Array);
    });

    test("should generate a report", () => {
      const doc = new Doctor("D004", "Dr. Li", 50, "Female", { email: "lili@example.com", phone: "333" }, "Surgery", "LIC000", "Surgery Dept");
      const rep = doc.generateReport("P100");
      expect(rep).toBeInstanceOf(Report);
    });
  });

  describe("Patient Class Tests", () => {
    test("should record medical history", () => {
      const pat = new Patient("P002", "Jane", 30, "Female", { email: "jane@example.com", phone: "123" }, {}, [], []);
      pat.recordMedicalHistory({ pastIllnesses: ["Flu"] });
      // Check if the internal medicalHistory is updated accordingly
      expect(pat.medicalHistory).toMatchObject({ pastIllnesses: ["Flu"] });
    });
  });

  describe("FitnessEnthusiast Class Tests", () => {
    test("should record workout data", () => {
      const fe = new FitnessEnthusiast("F002", "Mike", 22, "Male", { email: "mike@example.com", phone: "456" }, {}, {});
      const data = new HealthData("HDFE01", new Date(), 75, "120/80", 70, "Cycling", 6, "Good workout");
      fe.recordWorkoutData(data);
      // Just a simple test, checking console output or side effects if needed
    });
  });

  // ========== 5. HealthData, HealthReminder, HealthAdvice Tests ==========
  describe("HealthData Class Tests", () => {
    test("should validate data", () => {
      const hd = new HealthData("HD002", new Date(), 68, "115/75", 70, "Running", 7, "All good");
      const valid = hd.validateData();
      expect(valid).toBe(true);
    });

    test("should update data fields", () => {
      const hd1 = new HealthData("HD003", new Date(), 68, "115/75", 70, "Running", 7, "All good");
      const hd2 = new HealthData("HD004", new Date(), 65, "110/70", 65, "Walking", 8, "Updated remarks");
      hd1.updateData(hd2);
      expect(hd1.weight).toBe(65);
      expect(hd1.exercise).toBe("Walking");
    });
  });

  describe("HealthReminder Class Tests", () => {
    test("should update reminder details", () => {
      const rem = new HealthReminder("REM002", "Exercise", "Morning run", new Date(), false);
      rem.updateReminder({ newContent: "Morning run at 7 AM" });
      expect(rem.content).toBe("Morning run at 7 AM");
    });

    test("should mark as completed", () => {
      const rem = new HealthReminder("REM003", "Medication", "Take pills", new Date(), false);
      rem.markAsCompleted();
      expect(rem.status).toBe(true);
    });
  });

  describe("HealthAdvice Class Tests", () => {
    test("should update advice content", () => {
      const adv = new HealthAdvice("ADV002", "Exercise", "Do more cardio");
      adv.updateAdvice("Focus on HIIT training");
      expect(adv.content).toBe("Focus on HIIT training");
    });
  });
});
