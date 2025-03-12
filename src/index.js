console.log("Main entry file loaded1");
import { greetA } from './moduleA';
import { greetB } from './moduleB';

console.log("Main entry file loaded2");

const output = document.getElementById('output');
output.innerHTML += "Hello from Main entry file!<br/>";

function init() {
  console.log("App initialized");
  greetA();
  greetB();
}

init();
