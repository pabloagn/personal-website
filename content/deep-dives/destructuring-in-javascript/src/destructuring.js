// const myObj = {
//     fName: "Emma",
//     lName: "Miller",
//     interests: ["Reading", "Writing", "Sleeping"]
// };

// ------------------
// Indexing method
// ------------------
// const mainInterest = myObj.interests[0];
// const secondaryInterest = myObj.interests[1];
// const tertiaryInterest = myObj.interests[2];

// console.log(mainInterest, secondaryInterest, tertiaryInterest);

// ------------------
// Destructuring (ES6) method
// ------------------
// const [Int1, Int2, Int3] = myObj.interests
// console.log(Int1, Int2, Int3);

// ------------------
// Basic syntax
// ------------------
// Arrays
// const myArr = [1, 2, 3]
// const [val1, val2, val3] = myArr
// console.log(val1, val2, val3);

// Nested Arrays
// const myNestedArr = [[1, 2], [3, 4], [5, 6], [7, 8]]
// const [[val1,], [val2,], [val3,], [val4,]] = myNestedArr
// console.log(val1, val2, val3, val4);

// Objects
// const groundSupportPlane = {
//     model: "A-10 Warthog",
//     dimensions: { len: "53ft", wingspan: "57ft", height: "14ft" },
//     power: { engines: "Twin General Electric TF34-GE-100 turbofans", thrust: "9,065 pounds (40.32 kilonewtons) of thrust per engine" },
//     primaryWeapon: "GAU-8/A Avenger 30mm Gatling"
// };

// const { model, dimensions, power, primaryWeapon } = groundSupportPlane;
// console.log(model, dimensions, power, primaryWeapon);

// Function parameters

// Declaring a simple function
// function getPlaneSpecs(args) {
//     const { model, dimensions, power, primaryWeapon } = args
//     console.log(`The ${model} is a ground support plane built by the US military.`);
//     console.log(`Its dimensions are: ${dimensions.len} by ${dimensions.wingspan} by ${dimensions.height}.`);
//     console.log(`The plane is equipped with a ${primaryWeapon} cannon, and is powered by two ${power.engines}.`);
// }

// Declaring the function parameters object
// const groundSupportPlane = {
//     model: "A-10 Warthog",
//     dimensions: { len: "53ft", wingspan: "57ft", height: "14ft" },
//     power: { engines: "Twin General Electric TF34-GE-100 turbofans", thrust: "9,065 pounds (40.32 kilonewtons) of thrust per engine" },
//     primaryWeapon: "GAU-8/A Avenger 30mm Gatling"
// };

// getPlaneSpecs(groundSupportPlane)

// ------------------
// Selective assignment in destructuring
// ------------------
// const [Int1, , Int3] = myObj.interests
// console.log(Int1, Int3);

// ------------------
// Using predefined values
// ------------------
// const [val1 = "", val2 = "", val3 = "", val4 = ""] = myObj.interests
// console.log(val1, val2, val3, val4);

// const [val1, val2, val3, val4] = myObj.interests
// console.log(val1, val2, val3, val4);

// ------------------
// Default values for objects
// ------------------
// const { fName = "", lName = "", interests = "", favFood = "" } = myObj
// console.log(fName, lName, interests, favFood);

// ------------------
// Default values for function parameters
// ------------------
// function myFun(params) {
//     const { Country = "", City = "", Coords = "", Temp = "" } = params
//     console.log(`Country : ${Country} \nCity: ${City} \nCoordinates: ${Coords} \nTemperature: ${Temp}`);
// }

// const funParams = {
//     Country: "Austria",
//     City: "Vienna",
//     Coords: [48.2082, 16.3738]
// }

// myFun(funParams)

// ------------------
// Renaming Variables in Objects
// ------------------
// const myObj = {
//     val1: "JavaScript",
//     val2: "is",
//     val3: "weird"
// }

// const { word1, word2, word3 } = myObj
// console.log(word1, word2, word3);

// const { val1, val2, val3 } = myObj
// console.log(val1, val2, val3);

// const { val1: word1, val2: word2, val3: word3 } = myObj
// console.log(word1, word2, word3);

// ------------------
// Practical Examples
// ------------------

// Example 1: A deeply nested object

// Define an object
// const clientInfo = {
//     fName: "John Doe",
//     age: 30,
//     contact: {
//         email: "johndoe@example.com",
//         phone: {
//             countryCode: "+1",
//             number: "555-1234"
//         },
//         address: {
//             street: "123 Main Street",
//             city: "New York",
//             state: "NY",
//             zipCode: "10001"
//         }
//     },
//     preferences: {
//         language: "English",
//         theme: "Dark",
//         notifications: {
//             email: true,
//             sms: false
//         }
//     }
// };

// // Deconstruct the object by extracting the most relevant information
// const { fName, age, contact: { email: address }, contact: { phone: { number }, address: { state }, address: { city } }, preferences: { language }, preferences: { notifications: { email: emailContactPermission } } } = clientInfo

// // Log the values
// console.log(fName, age, address, number, state, city, language, emailContactPermission);

// Example 2: Extracting intermittently from an unknown array
const myArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']]
const [[, ...aa], , [, ...bb], , [, ...cc]] = myArr
console.log(aa, bb, cc);

// Example 3: An object containing multiple argument groups

// Define an object
// const person = {
//     fName: "Emma",
//     lName: "Lovelace",
//     birthDate: 1992,
//     address: {
//         street: "36, Obere Amtshausgasse",
//         suburb: "Reinprechtsdorf",
//         city: "Vienna",
//         postCode: 1050, country: "Austria"
//     },
//     occupation: "Artist",
//     family: {
//         husband: "Peter",
//         daughter: "Emma",
//         son: "Christoph"
//     }
// }

// // Defining a function
// function introducePerson(args) {
//     const currYear = new Date().getFullYear();

//     // Since we do not want the person's address, we skip it
//     const { fName, lName, birthDate, occupation, family: { husband } } = args;

//     // Assign a new key-value pair including the person's calculated age
//     const age = currYear - birthDate;
//     person.age = age

//     // Build a template literal
//     const introduction = `Name: ${fName}\nLast Name: ${lName}\nAge: ${age}\nOccupation: ${occupation}\nHusband: ${husband}`
//     console.log(introduction);

//     // Build a new object with interesting fields
//     const cleanPerson = {
//         fName: fName,
//         lName: lName,
//         birthDate: birthDate,
//         occupation: occupation,
//         husband: husband
//     }

//     return cleanPerson
// }

// cleanPerson = introducePerson(person)
// console.log(cleanPerson);