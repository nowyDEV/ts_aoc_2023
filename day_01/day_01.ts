import input from "./input.txt";

const data = input.split(/\r?\n/);

const regexp = /\d+/g;

let sum = 0;

for (const line of data) {
  const match = (line.match(regexp) ?? []).join("");

  const num =
    match === ""
      ? "0"
      : match.length === 1
      ? match + match
      : match[0] + match.at(-1);

  console.log({ num });

  sum += parseInt(num);
}
