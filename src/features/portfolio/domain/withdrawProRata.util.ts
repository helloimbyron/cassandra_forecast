export function withdrawProRata(grownBalances: number[], monthlyWithdrawal: number) {
  const availableBalance = grownBalances.reduce((sum, balance) => sum + balance, 0);

  if (availableBalance <= monthlyWithdrawal) {

    return grownBalances.map(() => 0);
  }

  const remainingShare = (availableBalance - monthlyWithdrawal) / availableBalance;

  return grownBalances.map((balance) => balance * remainingShare);
}
