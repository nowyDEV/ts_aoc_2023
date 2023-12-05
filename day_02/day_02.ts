import input from "./input.txt";

const data = input.split(/\r?\n/);

function getGameResult(input: string) {
  const [gameName, subsets] = input.split(":");
  const cubeSubsets = subsets.split(";");

  const gameId = parseInt(gameName.replace("Game ", ""));

  const minRequiredCubes = {
    green: 0,
    red: 0,
    blue: 0,
  } as Record<string, number>;

  for (const subset of cubeSubsets) {
    const subsetSplit = subset.trim().split(", ");

    for (const split of subsetSplit) {
      const [quantity, color] = split.split(" ");

      if (minRequiredCubes[color] < parseInt(quantity)) {
        minRequiredCubes[color] = parseInt(quantity);
      }
    }
  }

  return {
    gameId,
    minRequiredCubes,
  };
}

function part1() {
  const maxAllowedCubes = {
    green: 13,
    red: 12,
    blue: 14,
  };

  let sum = 0;

  for (const game of data) {
    const { gameId, minRequiredCubes } = getGameResult(game);

    if (
      minRequiredCubes.green <= maxAllowedCubes.green &&
      minRequiredCubes.red <= maxAllowedCubes.red &&
      minRequiredCubes.blue <= maxAllowedCubes.blue
    ) {
      sum += gameId;
    }
  }

  return sum;
}

console.log("part1", part1());

function part2() {
  let sum = 0;

  for (const game of data) {
    const { minRequiredCubes } = getGameResult(game);

    sum +=
      minRequiredCubes.green * minRequiredCubes.red * minRequiredCubes.blue;
  }

  return sum;
}

console.log("part2", part2());
