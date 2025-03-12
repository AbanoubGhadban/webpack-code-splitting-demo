console.log("Module A loaded");

const output = document.getElementById('output');
output.innerHTML += "Hello from Module A!<br/>";

export function greetA() {
  console.log("Hello from Module A!");
}
