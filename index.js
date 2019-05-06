const fs = require('fs');
const readline = require('readline');
let inputFilePath = './data/Customers_Assignment_Coding_Challenge.txt';
let originLatitude =  53.339428;
let originLongitude =  -6.257664;
let range = 100;

/**
 * converts degree ti radian
 * @param {degree value of latitude or longitude} degreeVal 
 */
let  convertDegreeToRadians = function(degreeVal){
    let pi = Math.PI;
    return parseFloat(degreeVal) * (pi/180);
};

/**
 * getting distance from origin to given point
 * @param {origin longitude in radian} long1 
 * @param {origin latitude in radian} lat1 
 * @param {point longitude in radian} long2 
 * @param {point latitude in radian} lat2 
 */
let getDistanceKm = function(long1, lat1, long2, lat2){
    let dlong = long1 - long2;  
    let dlat = lat1 - lat2; 
    let distanceKm = 6371* 2* Math.asin( Math.sqrt (Math.pow(Math.sin(dlat / 2), 2) 
             + Math.cos(lat2) * Math.cos(lat1) 
             * Math.pow(Math.sin(dlong / 2),2)));
    return distanceKm;        
};

/**
 * 
 * @param {origin longitude} originLong 
 * @param {origin latitude} originLat 
 * @param {input file path} inputFilePath 
 */
let getUserInRange =  function(originLong, originLat, row,  range){
    originLong = convertDegreeToRadians(originLong)
    originLat = convertDegreeToRadians(originLat)
    rowLong = convertDegreeToRadians(row.longitude);
    rowLat = convertDegreeToRadians(row.latitude);
    let distance = getDistanceKm(originLong, originLat, rowLong, rowLat);
    if(distance <= range ){
        let outRow = {
            user_id : row.user_id,
            name : row.name,
        }
        return outRow;
    }
}

/**
 * 
 * @param {user List - Json object {"3": {"user_id": 3, "name":"test name"}, {}, {}} } userList 
 */
let sortUserList = function(userList){
    let userIdArray = Object.keys(userList)
    userIdArray = userIdArray.map((val)=>{return parseInt(val)});
    userIdArray = userIdArray.sort((a, b)=>{return a-b});
    resultUserArray = [];
    for(let i in userIdArray){
        resultUserArray.push(userList[userIdArray[i]])
    }
    return resultUserArray;
}


/**
 * 
 * @param {origin point longitute} originLong 
 * @param {origin point latitude} originLat 
 * @param {file to be processed on} inputFilePath 
 * @param {integer number to check as radious to that point} range 
 * @param {callback method} callBack 
 */
let getUserListInRange = function(originLong, originLat, inputFilePath, range, callBack){
    const readInterface = readline.createInterface({  
        input: fs.createReadStream(inputFilePath),
        console: false
    });
    let UserList = {};
    readInterface.on('line', function(line) { 
        let userObj = getUserInRange(originLong, originLat, JSON.parse(line),  range)
        if(userObj){
            UserList[userObj.user_id] = userObj;
        }
    });
    readInterface.on('close', function() { 
        callBack(UserList);
    });
}


let processFileGetNearestUsers = function(originLong, originLat, inputFilePath, range, callBack){
    getUserListInRange(originLong, originLat, inputFilePath, range, (userList)=>{
        sortedUserList = sortUserList(userList);
        if(sortedUserList){
            callBack(null, sortedUserList);
        }else{
            callBack("Result empty", sortedUserList);
        }
    }); 
}

module.exports = {
    processFileGetNearestUsers: processFileGetNearestUsers,
    getDistanceKm:getDistanceKm,
    convertDegreeToRadians:convertDegreeToRadians
};