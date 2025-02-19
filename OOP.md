# OOP Patterns Explanation and Hypothetical “Break” Examples

This document provides:

1. **Code examples** of three classes (`DataManager`, `ReportBuilder`, `UserFactory`) that demonstrate good object-oriented design and certain design patterns.
2. **Explanations** of why these are good OOP applications.
3. **Hypothetical scenarios** showing how each concept could be broken if misused.

---

## 1. Source Code

Below is the **ES2024 (ES Module)** code for the three classes.They follow the UML class diagrams you provided, and each class demonstrates a particular OOP/design pattern concept:

1. **`DataManager`**: A **Singleton** class for in-memory data management.
2. **`ReportBuilder`**: A **Builder** class for step-by-step construction of `Report` objects.
3. **`UserFactory`**: A **Factory** class for creating different user objects based on a type string.

### DataManager.js

```js
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

### ReportBuilder.js

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

### UserFactory.js

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

## 2. Why These Examples Are Good OOP Applications

1. **DataManager (Singleton)**
   * **Encapsulation** : By using private fields and a private constructor, the class hides its internal data structures.
   * **Singleton** : Ensures there is only **one** instance managing the data, preventing inconsistent states or duplication.
   * **OCP** : If we add new data types (e.g., `HealthGoal`), we can add corresponding add/get methods without altering the existing code drastically.
2. **ReportBuilder (Builder Pattern)**
   * **Single Responsibility** : Focuses solely on how to construct a `Report` object step by step, not on the `Report` logic itself.
   * **Open for extension** : We can add new steps (e.g., `setAuthor(authorName)`) without modifying how existing steps work.
   * **Easier Maintenance** : Instead of passing many parameters to a `Report` constructor in a specific order, we can chain calls for clarity.
3. **UserFactory (Factory Pattern)**
   * **Dependency Inversion Principle (DIP)** : High-level code depends on this abstract factory method rather than directly calling `new Doctor(...)` etc.
   * **Single Responsibility** : Centralizes user creation logic in one place, so adding new user types only requires updating the factory, not scattered code.
   * **Polymorphism** : We return different subtypes (`FitnessEnthusiast`, `Patient`, `Doctor`) all referencing the abstract `User` concept.

## 3. Hypothetical Examples Breaking Each Concept

### 3.1 Breaking the **Singleton** Concept

**Good**:

```
// DataManager ensures only one instance
const dm1 = DataManager.getInstance();
const dm2 = DataManager.getInstance();
console.log(dm1 === dm2); // true

```

**Bad** (Hypothetical):

```
// Suppose we remove the private constructor check:
constructor() {
  // no check for DataManager.#instance
  this.#users = new Map();
  ...
}

// Then:
const dm1 = new DataManager(); // first instance
const dm2 = new DataManager(); // second instance
// Now we have 2 different DataManagers => inconsistent data

```

**Result** : We break the Singleton principle by allowing multiple `DataManager` instances, leading to possible data inconsistencies.

### 3.2 Breaking the **Builder** Concept

 **Good**:

```
// Using ReportBuilder
const builder = new ReportBuilder();
const report = builder
  .setReportID("R001")
  .setDateRange("2025-01-01 ~ 2025-01-31")
  .setSummary("Monthly Analysis")
  .setExportStatus(true)
  .build();

```

**Bad** (Hypothetical):

```
// Suppose we just do this:
const report = new Report("R001", "2025-01-01 ~ 2025-01-31", "Monthly Analysis", true, "extraArg1", "extraArg2");

// The constructor is overloaded with many parameters
// It's easy to forget the order or pass the wrong data type
// The build process is no longer step-by-step or flexible

```

**Result** : We lose the clarity and step-by-step construction. Adding more fields or optional parameters becomes messy.

### 3.3 Breaking the **Factory** Concept

**Good** :

```
// Centralized creation logic in UserFactory
const user = UserFactory.createUser("doctor", { userID: "D123", ... });

```

**Bad** (Hypothetical):

```
// Suppose we scatter object creation logic across the code:
function someRandomFunction() {
  return new Doctor("D123", "Dr. Chen", 45, "Male", {...}, "Cardiology", "LIC999", "Dept");
}

function anotherRandomFunction() {
  // We also do new Doctor(...) with different params
}

// Now if we want to add a new user type "admin",
// we must update many scattered places instead of just the factory

```

**Result** : We break the principle of centralized object creation. The code becomes harder to maintain or extend with new user types.

---

## 4. Summary

* **Why OOP** :
* We get **modularity** (each class has a clear focus),
* **extensibility** (adding new subtypes or methods with minimal changes),
* and **maintainability** (clear boundaries and responsibilities).
* **Why Patterns** :
* **Singleton** avoids conflicting data managers,
* **Builder** simplifies complex object creation,
* **Factory** decouples creation from usage and follows DIP.

All three examples show good OOP because they **encapsulate** their logic, **extend** easily without major code changes, and **use polymorphism** or standard design patterns to keep the system flexible and maintainable.

---

 **In summary** , these classes exemplify **strong OOP design** by using recognized patterns (Singleton, Builder, Factory) and adhering to principles like **SRP** (each class focuses on one purpose) and **DIP** (UserFactory). The hypothetical “bad” examples illustrate how ignoring these patterns can lead to more fragile, less maintainable code.
