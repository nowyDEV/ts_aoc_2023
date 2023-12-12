import input from "./input.txt";

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

console.log("part1", findDestination(start));

const startNodes = Object.keys(networkMap).filter((key) => key.endsWith("A"));
const isDestinationNode = (node: string) => node.endsWith("Z");
const dirLength = directions.length;

function logAllDestinations(node: string, moves: number = 0) {
  let currentNode = node;
  let currentMoves = moves;

  for (const move of directions.split("") as ("L" | "R")[]) {
    currentMoves += 1;
    currentNode = networkMap[currentNode][move];

    if (
      isDestinationNode(currentNode) &&
      (currentMoves - moves) % dirLength === 0
    ) {
      return currentMoves;
    }
  }

  return logAllDestinations(currentNode, currentMoves);
}
console.log(
  "part2",
  leastCommonMultiple(startNodes.map((node) => logAllDestinations(node)))
);

function leastCommonMultiple(numbers: number[]) {
  function gcd(a: number, b: number): number {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a: number, b: number) {
    return (a * b) / gcd(a, b);
  }

  let multiple = numbers.sort().at(0) ?? -1;
  numbers.forEach(function (n) {
    multiple = lcm(multiple, n);
  });

  return multiple;
}
