import input from "./input.txt";

// const input = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`;

const [directions, , ...network] = input.split(/\r?\n/);

const networkMap: Record<string, { L: string; R: string }> = {};
const start = "AAA";
const destination = "ZZZ";

for (const row of network) {
  const [[key], [left], [right]] = [...row.matchAll(/\w+/g)];
  networkMap[key] = { L: left, R: right };
}

function findDestination(startPoint: string, numOfMoves = 0) {
  let moves = numOfMoves;
  let currentPoint = startPoint;

  for (const move of directions.split("") as ("L" | "R")[]) {
    currentPoint = networkMap[currentPoint][move];
    moves += 1;

    if (currentPoint === destination) {
      return moves;
    }
  }

  return findDestination(currentPoint, moves);
}

// console.log("part1", findDestination(start));

const startNodes = Object.keys(networkMap).filter((key) => key.endsWith("A"));
const isDestinationNode = (node: string) => node.endsWith("Z");

function findConcurrentDestinations(startPoints: string[], numOfMoves = 0) {
  console.log({ startPoints });
  let moves = numOfMoves;
  let currentPoints = startPoints;

  for (const move of directions.split("") as ("L" | "R")[]) {
    let nextPoints = [];

    for (const point of currentPoints) {
      nextPoints.push(networkMap[point][move]);
    }
    currentPoints = nextPoints;
    moves += 1;

    if (currentPoints.every(isDestinationNode)) {
      return moves;
    }
  }

  return findConcurrentDestinations(currentPoints, moves);
}
