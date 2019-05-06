# distance_problems
A npm package to find:
1. In range locations(latitude, longitude) if given N kilometers Radious from a given location(latitude, longitude).
2. convert degree's to radian
3. get distance between Point A and Point B in kilometers


## Installation
using npm:
```bash
npm install distance_problem
```

## Methods

### processFileGetNearestUsers:
From given location and list of users in text file(json format) with their location in logitude and latitude filter outs users available in given range (radious in kilometers) in acsending order by given user_id in file.
#### Argument list

##### originLongitutide:
>Origin point longitude value in degrees.

##### originLatitude:
>Origin point latitude value in degrees.

##### inputFilePath:
>Input text file path having json data.

```json
{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}
{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}
```

##### range:
>Integer number denoting distance in kilo meters in which radious users should be present. 

##### callback
>Callback method with two argument error and result.

### getDistanceKm:
Takes longitude and latitude of two locations gives distance among them in kilometers. 

#### Argument list
##### longitude1:
>Longitude of first location

##### lattitude1:
>Latitude of first location

##### longitude2:
>Longitude of second location

##### latitude2:
> Latitude of second location


### convertDegreeToRadians:
Converts given degree value in radians.

#### Argument list
##### degreeValue:
> Float number denoting degree 
 


## Usage
```nodejs
const distanceProblem =  require(distance_problem);

// example data
let inputFilePath = './data/Customers_data.txt';
let originLatitude =  53.339428;
let originLongitude =  -6.257664;
let range = 100;
let latitudePoint2 = 52.986375;
let longitudePoint2 = -6.043701;

let radianVal = distanceProblem.convertDegreeToRadians(originLatitude);

let distanceInKM = distanceProblem.convertDegreeToRadians(originLongitude,     originLatitude, longitudePoint2, latitudePoint2 );

let processFileGetNearestUsers(originLongitude, originLatitude,         inputFilePath, range, (error, results)=>{
    console.log("users in given range are:", results);
    })){
```
