"use strict";
// let firstName: string = "Dylan"; // type string
// let ids: number[] = [1,2,3,4]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log(typeof firstName);
// const concatenateValues = (a: string, b: string): string => {
//   return a + b;
// }
// concatenateValues("Hello", "World");
const express_1 = __importDefault(require("express"));
const port = 3000;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello World');
});
function sayHello(name) {
    // return `Hello ${name}`;
    console.log(`Hello ${name}`);
}
sayHello(1);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
