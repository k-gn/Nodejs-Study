let users = {};

const id = Date.now();
const key = "key";
users[id] = "name"; 
users[key] = {
    name: 'user'
}; 

console.log(users);
