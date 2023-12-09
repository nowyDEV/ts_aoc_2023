import input from "./input.txt";

const data = input.split(/\r?\n/);
const [times, distances] = data;

function part1() {
  const races: { timeMs: number; distanceMm: number }[] = [];
  const timeMatches = [...times.matchAll(/\d+/g)];
  for (const [, match] of timeMatches.entries()) {
    races.push({ timeMs: parseInt(match[0]), distanceMm: 0 });
  }

  const distanceMatches = [...distances.matchAll(/\d+/g)];
  for (const [index, match] of distanceMatches.entries()) {
    races[index].distanceMm = parseInt(match[0]);
  }

  let sum = 1;
  for (const race of races) {
    const validDistances = [];
    for (let i = 1; i < race.timeMs; i++) {
      const distance = (race.timeMs - i) * i;

      if (distance > race.distanceMm) {
        validDistances.push(distance);
      }
    }

    sum *= validDistances.length;
  }

  return sum;
}

console.log("part1", part1());

function part2() {
  const timeMs = parseInt([...times.matchAll(/\d+/g)].join(""));
  const distanceMm = parseInt([...distances.matchAll(/\d+/g)].join(""));

  let sum = 0;

  for (let i = 1; i < timeMs; i++) {
    const distance = (timeMs - i) * i;

    if (distance > distanceMm) {
      sum += 1;
    }
  }

  return sum;
}

console.log("part2", part2());
