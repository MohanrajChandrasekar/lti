'use strict';

module.exports = {

    // Server port
    port: 8081,

    //Morgon
    morgon: {
        showInConsole: true,
        writeInFile: true
    },

    ishttps: false,
    host: 'localhost',
    database: 'lti',
    dbPort: 27017,
    SALT_WORK_FACTOR: 10,

    //Auditlog
    format: {
        time: 'HH:mm',
        dateTime: 'DD/MM/YYYY HH:mm:ss',
        day: 'dddd',
        date: 'DD/MM/YYYY',
        hour: 'hh',
        changeDate: 'MM-DD-YYYY',
        dayTrim: 'ddd',
        dateYr: "YYYY-MM-DD",
        dateYrTime: "YYYY-MM-DD hh:mm:ss",
        date12Hr: 'DD/MM/YYYY HH:mm A'
    },

    invalidLogInAttemptCount: 3,

    maxlockingDay: 30,


};
