export function moneyWeightedMonthlyReturn(
  initialValue: number,
  finalValue: number,
  monthlyContribution: number,
  months: number,
): number | null {
  if (
    !Number.isInteger(months) ||
    months <= 0 ||
    finalValue <= 0 ||
    initialValue + monthlyContribution * months <= 0
  ) {

    return null;
  }

  const projectedValue = (monthlyRate: number) => {
    let balance = initialValue;
    for (let month = 0; month < months; month += 1) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }

    return balance;
  };

  let low = -0.999999;
  let high = 1;
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const middle = (low + high) / 2;
    if (projectedValue(middle) < finalValue) {
      low = middle;
    } else {
      high = middle;
    }
  }

  return (low + high) / 2;
}
