// let firstName: string = "Dylan"; // type string
// let ids: number[] = [1,2,3,4]

// console.log(typeof firstName);

// const concatenateValues = (a: string, b: string): string => {
//   return a + b;
// }
// concatenateValues("Hello", "World");

import express, {Express, Request, Response} from 'express';
const port = 3000;

const app: Express = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// function sayHello(name: string) {
//   // return `Hello ${name}`;
//   console.log(`Hello ${name}`);
// }

// sayHello("Dylan");