export const formatCurrency = (ammount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(ammount)
}

export const toBoolean = (str: string) => {
  return str.toLowerCase() === "true"
}
