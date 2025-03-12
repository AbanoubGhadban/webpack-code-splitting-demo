console.log("Module B loaded");

const output = document.getElementById('output');
output.innerHTML += "Hello from Module B!<br/>";

export function greetB() {
  console.log("Hello from Module B!");
}
