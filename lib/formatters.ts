export function formatCurrency(amount: number, currency: string = 'NLe') {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${currency} ${formattedAmount}`;
}
