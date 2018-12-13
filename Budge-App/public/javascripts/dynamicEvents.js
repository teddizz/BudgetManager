var parser = require('mongodb-query-parser');
var EJSON = require('mongodb-extended-json');

var mongoRecord;

function getData() { 
    $.get( '/finance/', function( data ) {
        mongoRecord = data;
    });

    parseRecord(mongoRecord);
}

function parseRecord(mongoRecord) {
    console.log(mongoRecord);
}
