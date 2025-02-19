// HealthReminder.js
/**
 * @module HealthReminder
 * @description Represents a health reminder.
 */
export class HealthReminder {
    #reminderID;
    #type;
    #content;
    #time;
    #status;
  
    /**
     * Constructor
     * @param {string} reminderID - Unique identifier for the reminder
     * @param {string} type - Type of reminder (e.g., "Medication", "Exercise")
     * @param {string} content - Reminder content
     * @param {Date} time - Reminder time
     * @param {boolean} status - Whether the reminder has been handled
     */
    constructor(reminderID, type, content, time, status = false) {
      this.#reminderID = reminderID;
      this.#type = type;
      this.#content = content;
      this.#time = time;
      this.#status = status;
    }
  
    /** @return {string} Reminder ID */
    get reminderID() {
      return this.#reminderID;
    }
  
    /** @return {string} Reminder type */
    get type() {
      return this.#type;
    }
  
    /** @return {string} Reminder content */
    get content() {
      return this.#content;
    }
  
    /** @return {Date} Reminder time */
    get time() {
      return this.#time;
    }
  
    /** @return {boolean} Whether the reminder is handled */
    get status() {
      return this.#status;
    }
  
    /**
     * Set a reminder time
     * @param {DateTime} time
     */
    setReminder(time) {
      this.#time = time;
      console.log(`Reminder ${this.#reminderID} time set to ${time}`);
    }

    /**
     * Update reminder details
     * @param {ReminderDetails} details
     */
    updateReminder(details) {
      if (details.newContent) {
        this.#content = details.newContent;
      }
      if (details.newTime) {
        this.#time = details.newTime;
      }
      console.log(`Reminder ${this.#reminderID} updated.`);
    }

    /**
     * Mark reminder as completed
     */
    markAsCompleted() {
      this.#status = true;
      console.log(`Reminder ${this.#reminderID} marked as completed.`);
    }

    /**
     * Cancel the reminder
     */
    cancelReminder() {
      console.log(`Reminder ${this.#reminderID} canceled.`);
    }
}