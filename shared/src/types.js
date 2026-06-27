"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTO_INVOICE_CONFIDENCE_THRESHOLD = exports.DEFAULT_VALIDATION_RULES = exports.TIMELINE_EVENTS = exports.QueryStatus = exports.InvoiceStatus = exports.TimesheetStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["CLIENT"] = "CLIENT";
    UserRole["FINOPS"] = "FINOPS";
    UserRole["FINANCE"] = "FINANCE";
})(UserRole || (exports.UserRole = UserRole = {}));
var TimesheetStatus;
(function (TimesheetStatus) {
    TimesheetStatus["UPLOADED"] = "UPLOADED";
    TimesheetStatus["OCR_PROCESSING"] = "OCR_PROCESSING";
    TimesheetStatus["OCR_COMPLETED"] = "OCR_COMPLETED";
    TimesheetStatus["EXTRACTING"] = "EXTRACTING";
    TimesheetStatus["EXTRACTED"] = "EXTRACTED";
    TimesheetStatus["MATCHING"] = "MATCHING";
    TimesheetStatus["MATCHED"] = "MATCHED";
    TimesheetStatus["VALIDATING"] = "VALIDATING";
    TimesheetStatus["VALIDATED"] = "VALIDATED";
    TimesheetStatus["FRAUD_CHECKING"] = "FRAUD_CHECKING";
    TimesheetStatus["FRAUD_CHECKED"] = "FRAUD_CHECKED";
    TimesheetStatus["PENDING_REVIEW"] = "PENDING_REVIEW";
    TimesheetStatus["APPROVED"] = "APPROVED";
    TimesheetStatus["REJECTED"] = "REJECTED";
    TimesheetStatus["INVOICE_GENERATED"] = "INVOICE_GENERATED";
    TimesheetStatus["PENDING_FINANCE_APPROVAL"] = "PENDING_FINANCE_APPROVAL";
    TimesheetStatus["FINANCE_APPROVED"] = "FINANCE_APPROVED";
    TimesheetStatus["DISPATCHED"] = "DISPATCHED";
    TimesheetStatus["DELIVERED"] = "DELIVERED";
    TimesheetStatus["PAID"] = "PAID";
    TimesheetStatus["EXCEPTION"] = "EXCEPTION";
})(TimesheetStatus || (exports.TimesheetStatus = TimesheetStatus = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "DRAFT";
    InvoiceStatus["PENDING_CLIENT_APPROVAL"] = "PENDING_CLIENT_APPROVAL";
    InvoiceStatus["CLIENT_APPROVED"] = "CLIENT_APPROVED";
    InvoiceStatus["CLIENT_REJECTED"] = "CLIENT_REJECTED";
    InvoiceStatus["PENDING_FINANCE_APPROVAL"] = "PENDING_FINANCE_APPROVAL";
    InvoiceStatus["FINANCE_APPROVED"] = "FINANCE_APPROVED";
    InvoiceStatus["FINANCE_REJECTED"] = "FINANCE_REJECTED";
    InvoiceStatus["MODIFIED"] = "MODIFIED";
    InvoiceStatus["DISPATCHED"] = "DISPATCHED";
    InvoiceStatus["DELIVERED"] = "DELIVERED";
    InvoiceStatus["PAID"] = "PAID";
    InvoiceStatus["CANCELLED"] = "CANCELLED";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var QueryStatus;
(function (QueryStatus) {
    QueryStatus["OPEN"] = "OPEN";
    QueryStatus["IN_PROGRESS"] = "IN_PROGRESS";
    QueryStatus["RESOLVED"] = "RESOLVED";
    QueryStatus["CLOSED"] = "CLOSED";
})(QueryStatus || (exports.QueryStatus = QueryStatus = {}));
exports.TIMELINE_EVENTS = [
    'UPLOADED',
    'OCR_COMPLETED',
    'VALIDATED',
    'INVOICE_GENERATED',
    'APPROVED',
    'DISPATCHED',
    'DELIVERED',
    'PAID',
];
exports.DEFAULT_VALIDATION_RULES = [
    { ruleKey: 'max_working_days', ruleValue: { value: 31 }, severity: 'error' },
    { ruleKey: 'max_overtime_hours', ruleValue: { value: 80 }, severity: 'warning' },
    { ruleKey: 'required_fields', ruleValue: { fields: ['employeeId', 'workingDays', 'payrollPeriod'] }, severity: 'error' },
    { ruleKey: 'currency', ruleValue: { value: 'USD' }, severity: 'error' },
];
exports.AUTO_INVOICE_CONFIDENCE_THRESHOLD = 95;
//# sourceMappingURL=types.js.map