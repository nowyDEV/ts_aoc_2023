import input from "./input.txt";

// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

const data = input.split(/\r?\n/).map((line) => line.split(""));

let sum = 0;
for (let y = 0; y < data.length; y++) {
  const row = data[y];
  let part = {
    x: -1,
    y: -1,
    value: "",
  };
  const resetPart = () => (part = { x: -1, y: -1, value: "" });

  for (let x = 0; x < row.length; x++) {
    if (/\d/.test(row[x])) {
      if (part.value === "") {
        part.x = x;
        part.y = y;
      }

      part.value = part.value.concat(row[x]);
    } else if (part.value !== "") {
      if (isValidPart(part)) {
        sum += parseInt(part.value);
      }

      resetPart();
    }

    if (x === row.length - 1 && part.value !== "") {
      if (isValidPart(part)) {
        sum += parseInt(part.value);
      }

      resetPart();
    }
  }
}

type Part = {
  x: number;
  y: number;
  value: string;
};

function isValidPart(part: Part) {
  const symbols = /[^0-9|\.]+/;
  const partLength = part.value.length;

  const yCoords = {
    start: part.y - 1 >= 0 ? part.y - 1 : part.y,
    end: part.y + 1 < data.length ? part.y + 1 : part.y,
  };
  const xCoords = {
    start: part.x - 1 >= 0 ? part.x - 1 : part.x,
    end:
      part.x + partLength < data[0].length
        ? part.x + partLength
        : part.x + partLength - 1,
  };

  for (let y = yCoords.start; y <= yCoords.end; y++) {
    for (let x = xCoords.start; x <= xCoords.end; x++) {
      if (symbols.test(data[y][x])) {
        return true;
      }
    }
  }

  return false;
}

console.log({ sum });
