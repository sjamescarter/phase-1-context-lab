/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(record) {
    let employeeRecord = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(array) {
    let employeeRecords = []
    array.map(record => employeeRecords.push(createEmployeeRecord(record)))
    return employeeRecords;
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return this;
}

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return this;
}

function hoursWorkedOnDate(dateStamp) {
    let startTime, endTime, hoursWorked;
    this.timeInEvents.find( function (e) {
        if(e.date === dateStamp){
            startTime = e.hour
        }
    })
    this.timeOutEvents.find( function (e) {
        if(e.date === dateStamp){
            endTime = e.hour
        }
    })
    hoursWorked = (endTime - startTime) / 100
    return hoursWorked;
}

function wagesEarnedOnDate(dateStamp) {
    let payOwed = this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
    return payOwed;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(element => element.firstName === firstName)
}

function calculatePayroll(employeeRecords) {
    let payroll = []
    employeeRecords.forEach(employee => payroll.push(allWagesFor.call(employee)))
    return payroll.reduce((acc, value) => acc + value)
}