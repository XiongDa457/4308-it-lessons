// Simple celsius/farenheit converter

import PromptSync from "prompt-sync";

const prompt = PromptSync({
  sigint: true,
});

function getInput<T>(ask: string, convert: (str: string) => T | null): T {
  let ret: T | null = null;
  while (ret === null) ret = convert(prompt(ask));
  return ret;
}

function parseFloatNullToNan(str: string): number | null {
    let res = parseFloat(str);
    return isNaN(res) ? null : res;
}

while (true) {
  let inputUnit = getInput("Which unit are you converting from? ", (str) => {
    if (str.length === 0) return null;
    str = str.toLowerCase();
    if ("celsius".substring(0, str.length) === str) return "C";
    if ("farenheit".substring(0, str.length) === str) return "F";
    return null;
  });

  if (inputUnit === "C") {
    let celsius = getInput("Enter value in celsius: ", parseFloatNullToNan);
    console.log(`The value in farenheit is: ${(celsius * 9) / 5 + 32}`);
  } else {
    let farenheit = getInput("Enter value in farenheit: ", parseFloatNullToNan);
    console.log(`The value in celsius is: ${((farenheit - 32) * 5) / 9}`);
  }

  if (
    !getInput("Do you want to convert again? ", (str) => {
      if (str.length === 0) return null;
      str = str.toLowerCase();
      if ("yes".substring(0, str.length) === str) return true;
      if ("no".substring(0, str.length) === str) return false;
      return null;
    })
  )
    break;
}
