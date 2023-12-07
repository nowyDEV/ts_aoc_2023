import input from "./input.txt";

const data = input.split(/\r?\n/);

function getCardScore(cardNumbers: string) {
  const getNumberList = (input: string) =>
    input.split(" ").filter((number) => /\d+/g.test(number));

  const [winningNumbers, ownedNumbers] = cardNumbers.split("|");
  const winningNumbersList = getNumberList(winningNumbers);
  const ownedNumbersList = getNumberList(ownedNumbers);

  let score = 0;
  for (const ownedNumber of ownedNumbersList) {
    if (winningNumbersList.includes(ownedNumber)) {
      score += 1;
    }
  }

  return score;
}

function part1() {
  let sum = 0;
  for (const card of data) {
    const [_, game] = card.split(":");

    const score = getCardScore(game);

    if (score > 0) {
      const cardScore = 2 ** (score - 1);

      sum += cardScore;
    }
  }

  return sum;
}

console.log("part1", part1());

function part2() {
  const splitCard = (card: string) => {
    const [cardDetails, game] = card.split(":");
    const index = cardDetails.split(" ").at(-1);

    return {
      index,
      game,
    };
  };

  const mappedData = data.reduce<{
    [key: number | string]: { score: number; numOf: number };
  }>((acc, card) => {
    const { index, game } = splitCard(card);

    if (index !== undefined) {
      acc[index] = {
        score: getCardScore(game),
        numOf: 1,
      };
    }

    return acc;
  }, {});

  for (const [key, value] of Object.entries(mappedData)) {
    for (let i = 0; i < value.numOf; i++) {
      if (value.score === 0) {
        continue;
      }

      for (let i = 1; i <= value.score; i++) {
        if (mappedData[parseInt(key) + i] !== undefined) {
          mappedData[parseInt(key) + i].numOf += 1;
        }
      }
    }
  }

  const sumOfCards = Object.values(mappedData).reduce(
    (acc, card) => acc + card.numOf,
    0
  );

  return sumOfCards;
}

console.log("part2", part2());
