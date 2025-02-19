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
    this.reset();
    return report;
  }
}
