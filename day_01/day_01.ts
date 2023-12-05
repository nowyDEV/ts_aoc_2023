import input from "./input.txt";

const data = input.split(/\r?\n/);

// Part 1

function buildNumber(input: string) {
  const digitRegexp = /\d+/g;
  const match = (input.match(digitRegexp) ?? []).join("");

  const num =
    match === ""
      ? "0"
      : match.length === 1
      ? match + match
      : match[0] + match.at(-1);

  return parseInt(num);
}

function sum(data: string[], lineSumGetter: (line: string) => number) {
  let sum = 0;

  for (const line of data) {
    const num = lineSumGetter(line);

    sum += num;
  }

  return sum;
}

console.log("part1", sum(data, buildNumber));

// Part 2

// <3 StackOverflow
String.prototype.match_overlap = function (regexp: RegExp) {
  if (!regexp.global) {
    regexp = new RegExp(
      regexp.source,
      "g" + (regexp.ignoreCase ? "i" : "") + (regexp.multiline ? "m" : "")
    );
  }

  let matches = [];
  let result;

  while ((result = regexp.exec(this as string))) {
    matches.push(result), (regexp.lastIndex = result.index + 1);
  }
  return matches.length ? matches : null;
};

function replaceCharacter(input: String, index: number, replacement: String) {
  return input.slice(0, index) + replacement + input.slice(index + 1);
}

function replaceWordDigits(input: string) {
  const digitNameRegexp = /one|two|three|four|five|six|seven|eight|nine/g;
  const digitMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  } as Record<string, string>;

  const matches = input.match_overlap(digitNameRegexp) ?? [];

  const wordDigitMappings = matches.map(([match]) => {
    const foundIndexes = [...input.matchAll(new RegExp(match, "g"))].map(
      (match) => match.index
    );

    return {
      indexes: foundIndexes,
      digit: digitMap[match],
    };
  });

  for (const { indexes, digit } of wordDigitMappings) {
    for (const index of indexes) {
      input = replaceCharacter(input, index, digit);
    }
  }

  return input;
}

console.log(
  "part2",
  sum(data, (line: string) => buildNumber(replaceWordDigits(line)))
);
