# OOP Explanation and Hypothetical “Break” ExamplesOOP Demonstration

This document provides:

1. **Code examples** of three classes that demonstrate good object-oriented design SOLID principles and certain design patterns.
2. **Explanations** of why these are good OOP applications.
3. **Counter-example** showing how each concept could be broken if misused.

## OOP Pillars

### 1. Abstraction

**Example:**

```javascript
export class User {
    #userID;
    #name;
    #age;
    #gender;
    #contactInfo;
  
    /**
     * Constructor
     * @param {string} userID - Unique user identifier
     * @param {string} name - User's name
     * @param {number} age - User's age
     * @param {string} gender - User's gender
     * @param {string} contactInfo - User's contact info
     */
    constructor(userID, name, age, gender, contactInfo) {
      if (new.target === User) {
        throw new Error("Cannot instantiate abstract class User directly.");
      }
    // OOP - Abstract class
      this.#userID = userID;
      this.#name = name;
      this.#age = age;
      this.#gender = gender;
      this.#contactInfo = contactInfo;
    }
```

**Explanation:**

* `User` is an abstract class that cannot be instantiated directly.
* This enforces abstraction by ensuring only concrete subclasses (like `Doctor` or `Patient`) can be created.
* Users of the `User` class don’t need to know how `userID`, `name`, etc., are stored internally.

**Counter-example:**

```javascript
const user = new User("U123", "John Doe", 30, "Male", "john@example.com");
// This should not be allowed, as User is meant to be abstract.
```

---

### 2. Encapsulation

**Example:**

```javascript
export class User {
    // Private fields (OOP - Encapsulation)
    #userID;
    #name;
    #age;
    #gender;
    #contactInfo;
  
    /**
     * Constructor
     * @param {string} userID - Unique user identifier
     * @param {string} name - User's name
     * @param {number} age - User's age
     * @param {string} gender - User's gender
     * @param {string} contactInfo - User's contact info
     */
    constructor(userID, name, age, gender, contactInfo) {
      if (new.target === User) {
        throw new Error("Cannot instantiate abstract class User directly.");
      }
```

**Explanation:**

* The `#userID`, `#name`, and `#contactInfo` fields are  **private** .
* This means they **cannot** be accessed directly outside the class.
* Instead, methods like `updateProfile()` must be used to modify data safely.

**Counter-example:**

```javascript
const user = new User("U123", "John Doe", 30, "Male", "john@example.com");
user.name = "Jane Doe";  // Direct modification should not be allowed
```

---

### 3. Inheritance

**Example:**

```javascript
export class Doctor extends User {
  #specialization;
  #licenseNumber;
  #department;
// OOP - Inheritance

  /**
   * Constructor
   * @param {string} userID
   * @param {string} name
   * @param {number} age
   * @param {string} gender
   * @param {string} contactInfo
   * @param {string} specialization - Doctor's specialization
   * @param {string} licenseNumber - Doctor's license number
   * @param {string} department - Doctor's department
   */
  constructor(userID, name, age, gender, contactInfo, specialization, licenseNumber, department) {
    super(userID, name, age, gender, contactInfo);
    this.#specialization = specialization;
    this.#licenseNumber = licenseNumber;
    this.#department = department;
  }
```

**Explanation:**

* `Doctor` **inherits** from `User`, so it automatically gets `userID`, `name`, `age`, etc.
* This allows for **code reuse** instead of redefining these properties in every subclass.

**Counter-example:**

```javascript
export class Doctor {
  constructor(userID, name, age, gender, contactInfo, specialization, licenseNumber, department) {
    this.userID = userID;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.contactInfo = contactInfo;
    this.specialization = specialization;
    this.licenseNumber = licenseNumber;
    this.department = department;
  }
}
```

---

### 4. Polymorphism

**Example:**

```javascript
/**
   * OOP - Polymorphism
   * @override
   * @return {boolean}
   */
  login() {
    console.log(
      `Doctor ${this.userID} (specialization: ${this.#specialization}) logged in.`
    );
    return super.login();
  }
```

**Explanation:**

* The `login()` method is **overridden** in `Doctor`, while `super.login()` ensures base functionality is still used.
* This allows different subclasses to **customize behavior** while maintaining a common interface.

**Counter-example:**

```javascript
export class Doctor extends User {
  login() {
    console.log("Logging in as Doctor.");
    // Missing super.login(), losing base functionality
  }
}
```

---

## SOLID Principles

### 1. Single Responsibility Principle(SRP)

**Example:**

```javascript
// User.js
// Single Responsibility Principle(SRP)
/**
 * @module User
 * @description Abstract class representing a generic user.
 */

/**
 * @abstract
 */
export class User {
    // Private fields (OOP - Encapsulation)
    #userID;
    #name;
    #age;
    #gender;
    #contactInfo;
  
    /**
     * Constructor
     * @param {string} userID - Unique user identifier
     * @param {string} name - User's name
     * @param {number} age - User's age
     * @param {string} gender - User's gender
     * @param {string} contactInfo - User's contact info
     */
    constructor(userID, name, age, gender, contactInfo) {
      if (new.target === User) {
        throw new Error("Cannot instantiate abstract class User directly.");
      }
    // OOP - Abstract class
      this.#userID = userID;
      this.#name = name;
      this.#age = age;
      this.#gender = gender;
      this.#contactInfo = contactInfo;
    }
  
    /** @return {string} User ID */
    get userID() {
      return this.#userID;
    }
  
    /** @return {string} User name */
    get name() {
      return this.#name;
    }
  
    /** @return {number} User age */
    get age() {
      return this.#age;
    }
  
    /** @return {string} User gender */
    get gender() {
      return this.#gender;
    }
  
    /** @return {string} User contact info */
    get contactInfo() {
      return this.#contactInfo;
    }
  
    /**
   * User login
   * @return {boolean}
   */
  login() {
    // Minimal example: just return true
    console.log(`User ${this.#userID} logged in.`);
    return true;
  }

  /**
   * User logout
   * @return {void}
   */
  logout() {
    console.log(`User ${this.#userID} logged out.`);
  }

  /**
   * Update user profile info
   * @param {ContactInfo} newInfo
   * @return {void}
   */
  updateProfile(newInfo) {
    this.#contactInfo = newInfo;
    console.log(`User ${this.#userID} profile updated.`);
  }

  /**
   * View user profile
   * @return {UserProfile}
   */
  viewProfile() {
    return {
      userID: this.#userID,
      name: this.#name,
      age: this.#age,
      gender: this.#gender,
      contactInfo: this.#contactInfo
    };
  }
}
```

**Explanation:**

* The `Report` class **only** handles report generation.
* **It does not** send emails, store data, or modify user profiles.

**Counter-example:**

```javascript
export class Report {
  generateSummary() {
    console.log("Generating summary...");
  }

  sendEmail() {
    console.log("Sending report via email...");
  }
}
```

---

### 2. Open-Closed Principle(OCP)

**Example:**

```javascript
// Doctor.js
// Open-Closed Principle(OCP)
import { User } from "./User.js";
import { Report } from "./Report.js";

/**
 * @module Doctor
 * @description Represents a doctor, extends User.
 */
export class Doctor extends User {
  #specialization;
  #licenseNumber;
  #department;
// OOP - Inheritance

  /**
   * Constructor
   * @param {string} userID
   * @param {string} name
   * @param {number} age
   * @param {string} gender
   * @param {string} contactInfo
   * @param {string} specialization - Doctor's specialization
   * @param {string} licenseNumber - Doctor's license number
   * @param {string} department - Doctor's department
   */
  constructor(userID, name, age, gender, contactInfo, specialization, licenseNumber, department) {
    super(userID, name, age, gender, contactInfo);
    this.#specialization = specialization;
    this.#licenseNumber = licenseNumber;
    this.#department = department;
  }
  // Liskov Substitution Principle(LSP)

  /** @return {string} Specialization */
  get specialization() {
    return this.#specialization;
  }

  /** @return {string} License number */
  get licenseNumber() {
    return this.#licenseNumber;
  }

  /** @return {string} Department */
  get department() {
    return this.#department;
  }

  /**
   * OOP - Polymorphism
   * @override
   * @return {boolean}
   */
  login() {
    console.log(
      `Doctor ${this.userID} (specialization: ${this.#specialization}) logged in.`
    );
    return super.login();
  }

   /**
   * View a patient's health records
   * @param {string} patientID
   * @return {import("./HealthData.js").HealthData[]}
   */
   viewPatientRecords(patientID) {
    console.log(`Doctor ${this.userID} is viewing records for patient ${patientID}.`);
    return [];
  }

    /**
     * Generate a health report for a patient
     * @param {string} patientID
     * @return {Report}
     */
    generateReport(patientID) {
      console.log(`Doctor ${this.userID} generating report for patient ${patientID}.`);
      const report = new Report("R001", "2025-01-01 ~ 2025-01-31", "Initial Summary", false);
      return report;
    }

    /**
     * Update a patient's health record
     * @param {string} patientID
     * @param {import("./HealthData.js").HealthData} data
     */
    updatePatientRecord(patientID, data) {
      console.log(`Doctor ${this.userID} updating record for patient ${patientID} with data:`, data);
    }

    // Interface Segregation Principle(ISP) - Doctor class does not implement recordWorkoutData()
}
```

**Explanation:**

This class **can be extended** to add new features but  **does not require modification** .

**Counter-example:**

```javascript
export class Doctor {
  prescribeMedication(patient, medication) {
    if (medication === "Antibiotics") {
      console.log("Special handling for antibiotics...");
    }
  }
}
```

---

### 3. Liskov Substitution Principle (LSP)

**Example:**

```javascript
// Doctor.js
// Open-Closed Principle(OCP)
import { User } from "./User.js";
import { Report } from "./Report.js";

/**
 * @module Doctor
 * @description Represents a doctor, extends User.
 */
export class Doctor extends User {
  #specialization;
  #licenseNumber;
  #department;
// OOP - Inheritance

  /**
   * Constructor
   * @param {string} userID
   * @param {string} name
   * @param {number} age
   * @param {string} gender
   * @param {string} contactInfo
   * @param {string} specialization - Doctor's specialization
   * @param {string} licenseNumber - Doctor's license number
   * @param {string} department - Doctor's department
   */
  constructor(userID, name, age, gender, contactInfo, specialization, licenseNumber, department) {
    super(userID, name, age, gender, contactInfo);
    this.#specialization = specialization;
    this.#licenseNumber = licenseNumber;
    this.#department = department;
  }
  // Liskov Substitution Principle(LSP)
```

**Explanation:**

`Doctor` can **replace** `User` without breaking functionality.

**Counter-example:**

```javascript
export class User {
  requestAppointment() {
    console.log("User requests an appointment.");
  }
}

export class Doctor extends User {
  requestAppointment() {
    throw new Error("Doctors can’t make their own appointments!");
  }
}
```

---

### 4. Interface Segregation Principle(ISP)

**Example:**

```javascript
export class FitnessEnthusiast extends User {
  recordWorkoutData() {
    console.log("Recording workout data...");
  }
}
```

**Explanation:**

* `FitnessEnthusiast` **only implements** what it needs.
* It **does not** include unnecessary doctor/patient methods.

**Counter-example:**

```javascript
export class FitnessEnthusiast extends User {
  prescribeMedication() {
    console.log("Prescribing medication..."); 
  }
}
```

---

### 5. Dependency Inversion Principle (DIP)

**Example:**

```javascript
/**
 * Demonstrates the Factory design pattern.
 * Creates user objects based on a type string.
 */
// Dependency Inversion Principle(DIP)
export class UserFactory {
  /**
   * Create a user object of the specified type.
   * @param {string} type - "fitness", "patient", or "doctor"
   * @param {object} options - An object containing constructor parameters
   * @return {FitnessEnthusiast | Patient | Doctor}
   */
  static createUser(type, options) {
    switch (type.toLowerCase()) {
      case "fitness":
        return new FitnessEnthusiast(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.workoutPreferences,
          options.fitnessGoals
        );

      case "patient":
        return new Patient(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.medicalHistory,
          options.conditions,
          options.medications
        );

      case "doctor":
        return new Doctor(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.specialization,
          options.licenseNumber,
          options.department
        );

      default:
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}

```

**Explanation:**

High-level code **does not depend** on low-level details.

**Counter-example:**

```javascript
export class Hospital {
  createDoctor() {
    return new Doctor("D001", "Dr. Smith");
  }
}
```

---

## Design Patterns

### 1. Singleton

**Example:**

```javascript
// DataManager.js
/**
 * @module DataManager
 * @description A singleton class to manage and store different entities in memory (Users, HealthData, Reports, etc.).
 */

import { User } from "./User.js";
import { HealthData } from "./HealthData.js";
import { Report } from "./Report.js";
import { HealthReminder } from "./HealthReminder.js";
import { HealthAdvice } from "./HealthAdvice.js";

/**
 * Demonstrates the Singleton design pattern for data management.
 */
export class DataManager {
  // Private static field to hold the single instance
  static #instance = null;

  // Private fields for storing entities
  #users;
  #healthDataRecords;
  #reports;
  #reminders;
  #advices;

  /**
   * Private constructor to prevent direct instantiation.
   */
  constructor() {
    if (DataManager.#instance) {
      throw new Error("Use DataManager.getInstance() to get the singleton instance.");
    }
    this.#users = new Map();
    this.#healthDataRecords = new Map();
    this.#reports = new Map();
    this.#reminders = new Map();
    this.#advices = new Map();
  }

  /**
   * Retrieve the single instance of DataManager.
   * @return {DataManager}
   */
  static getInstance() {
    if (!DataManager.#instance) {
      DataManager.#instance = new DataManager();
    }
    return DataManager.#instance;
  }

  /**
   * Add a user to the system.
   * @param {User} user
   */
  addUser(user) {
    this.#users.set(user.userID, user);
  }

  /**
   * Get a user by userID.
   * @param {string} userID
   * @return {User | undefined}
   */
  getUser(userID) {
    return this.#users.get(userID);
  }

  /**
   * Add a HealthData record.
   * @param {HealthData} data
   */
  addHealthData(data) {
    this.#healthDataRecords.set(data.dataID, data);
  }

  /**
   * Get a HealthData record by dataID.
   * @param {string} dataID
   * @return {HealthData | undefined}
   */
  getHealthData(dataID) {
    return this.#healthDataRecords.get(dataID);
  }

  /**
   * Add a Report.
   * @param {Report} report
   */
  addReport(report) {
    this.#reports.set(report.reportID, report);
  }

  /**
   * Get a Report by reportID.
   * @param {string} reportID
   * @return {Report | undefined}
   */
  getReport(reportID) {
    return this.#reports.get(reportID);
  }

  /**
   * Add a HealthReminder.
   * @param {HealthReminder} reminder
   */
  addReminder(reminder) {
    this.#reminders.set(reminder.reminderID, reminder);
  }

  /**
   * Get a HealthReminder by reminderID.
   * @param {string} reminderID
   * @return {HealthReminder | undefined}
   */
  getReminder(reminderID) {
    return this.#reminders.get(reminderID);
  }

  /**
   * Add a HealthAdvice.
   * @param {HealthAdvice} advice
   */
  addAdvice(advice) {
    this.#advices.set(advice.adviceID, advice);
  }

  /**
   * Get a HealthAdvice by adviceID.
   * @param {string} adviceID
   * @return {HealthAdvice | undefined}
   */
  getAdvice(adviceID) {
    return this.#advices.get(adviceID);
  }
}

```

**Explanation:**

* **Encapsulation** : By using private fields and a private constructor, the class hides its internal data structures.
* **Singleton** : Ensures there is only **one** instance managing the data, preventing inconsistent states or duplication.
* **OCP** : If we add new data types (e.g., `HealthGoal`), we can add corresponding add/get methods without altering the existing code drastically.

**Counter-example:**

```javascript
export class DataManager {
  constructor() {
    this.users = new Map();
    this.healthDataRecords = new Map();
  }
}
const dm1 = new DataManager();
const dm2 = new DataManager();
```

---

### 2. Builder

**Example:**

```javascript
// ReportBuilder.js
/**
 * @module ReportBuilder
 * @description A builder class for constructing Report objects step by step.
 */

import { Report } from "./Report.js";

/**
 * Demonstrates the Builder design pattern.
 * Allows step-by-step construction of a Report object.
 */
export class ReportBuilder {
  /**
   * Constructor initializes temporary fields for building a Report.
   */
  constructor() {
    this.reset();
  }

  /**
   * Reset the builder to its initial state.
   * @return {ReportBuilder}
   */
  reset() {
    this._reportID = "";
    this._dateRange = "";
    this._summary = "";
    this._exportStatus = false;
    return this;
  }

  /**
   * Set the report ID.
   * @param {string} reportID
   * @return {ReportBuilder}
   */
  setReportID(reportID) {
    this._reportID = reportID;
    return this;
  }

  /**
   * Set the date range for the report.
   * @param {string} dateRange
   * @return {ReportBuilder}
   */
  setDateRange(dateRange) {
    this._dateRange = dateRange;
    return this;
  }

  /**
   * Set the summary text of the report.
   * @param {string} summary
   * @return {ReportBuilder}
   */
  setSummary(summary) {
    this._summary = summary;
    return this;
  }

  /**
   * Set whether the report is exported.
   * @param {boolean} exportStatus
   * @return {ReportBuilder}
   */
  setExportStatus(exportStatus) {
    this._exportStatus = exportStatus;
    return this;
  }

  /**
   * Finalize and build the Report object, then reset the builder.
   * @return {Report}
   */
  build() {
    const report = new Report(
      this._reportID,
      this._dateRange,
      this._summary,
      this._exportStatus
    );
    this.reset(); // Reset for potential next use
    return report;
  }
}


```

**Explanation:**

* **Single Responsibility** : Focuses solely on how to construct a `Report` object step by step, not on the `Report` logic itself.
* **Open for extension** : We can add new steps (e.g., `setAuthor(authorName)`) without modifying how existing steps work.
* **Easier Maintenance** : Instead of passing many parameters to a `Report` constructor in a specific order, we can chain calls for clarity.

**Counter-example:**

```javascript
const report = new Report("R100", "2025-01-01 ~ 2025-01-31", "Monthly Analysis", false);
```

### 3. Factory

**Example:**

```javascript
// UserFactory.js
/**
 * @module UserFactory
 * @description Factory class to create different types of User objects.
 */

import { FitnessEnthusiast } from "./FitnessEnthusiast.js";
import { Patient } from "./Patient.js";
import { Doctor } from "./Doctor.js";

/**
 * Demonstrates the Factory design pattern.
 * Creates user objects based on a type string.
 */
// Dependency Inversion Principle(DIP)
export class UserFactory {
  /**
   * Create a user object of the specified type.
   * @param {string} type - "fitness", "patient", or "doctor"
   * @param {object} options - An object containing constructor parameters
   * @return {FitnessEnthusiast | Patient | Doctor}
   */
  static createUser(type, options) {
    switch (type.toLowerCase()) {
      case "fitness":
        return new FitnessEnthusiast(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.workoutPreferences,
          options.fitnessGoals
        );

      case "patient":
        return new Patient(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.medicalHistory,
          options.conditions,
          options.medications
        );

      case "doctor":
        return new Doctor(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.specialization,
          options.licenseNumber,
          options.department
        );

      default:
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}
```

**Explanation:**

* **Dependency Inversion Principle (DIP)** : High-level code depends on this abstract factory method rather than directly calling `new Doctor(...)` etc.
* **Single Responsibility** : Centralizes user creation logic in one place, so adding new user types only requires updating the factory, not scattered code.
* **Polymorphism** : We return different subtypes (`FitnessEnthusiast`, `Patient`, `Doctor`) all referencing the abstract `User` concept.

**Counter-example:**

```javascript
const doctor = new Doctor("D100", "Dr. Chen", 45, "Male", "drchen@example.com", "Cardiology", "LIC987654", "Dept");
const patient = new Patient("P100", "Alice", 30, "Female", "alice@example.com", ["Flu"], ["BP"], ["Amlodipine"]);
```
