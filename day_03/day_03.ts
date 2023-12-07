import input from "./input.txt";

const data = input.split(/\r?\n/).map((line) => line.split(""));

let partsSum = 0;
const gears: Record<string, { adjacentParts: number; value: number }> = {};

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
        partsSum += parseInt(part.value);
      }

      resetPart();
    }

    if (x === row.length - 1 && part.value !== "") {
      if (isValidPart(part)) {
        partsSum += parseInt(part.value);
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
      const cell = data[y][x];

      if (symbols.test(cell)) {
        if (cell === "*") {
          if (gears[`${y}-${x}`] !== undefined) {
            gears[`${y}-${x}`].adjacentParts += 1;
            gears[`${y}-${x}`].value *= parseInt(part.value);
          } else {
            gears[`${y}-${x}`] = {
              adjacentParts: 1,
              value: parseInt(part.value),
            };
          }
        }

        return true;
      }
    }
  }

  return false;
}

const gearSum = Object.values(gears)
  .filter((gear) => gear.adjacentParts === 2)
  .reduce((acc, gear) => acc + gear.value, 0);

console.log("part1", partsSum);
console.log("part2", gearSum);
