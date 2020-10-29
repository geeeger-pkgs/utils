type RateMap = {
  [key: string]: number;
};

const Rate: RateMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

const RateHalf: RateMap = {
  0: 0.5,
  1: 1.5,
  2: 2.5,
  3: 3.5,
  4: 4.5,
};

export default function rate(score: number | string): number {
  let num = 0;
  if (typeof score === 'string') {
    num = Number(score) || 0;
  } else {
    num = score;
  }

  const index = num / 2;
  // const rateIndex = index.toString();

  if (Rate[index] !== undefined) {
    return Rate[index];
  }

  return RateHalf[Math.floor(index)];
}
