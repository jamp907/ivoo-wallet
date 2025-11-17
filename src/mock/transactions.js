export const initialTransactions = [
  {
    id: 'TXN_INIT1',
    type: 'recarga',
    amount: 50,
    currency: 'USD',
    date: new Date(Date.now() - 86400000).toISOString(),
    description: 'Recarga inicial de bienvenida'
  },
  {
    id: 'TXN_INIT2',
    type: 'conversion',
    usdAmount: 20,
    bsvAmount: 730,
    cashback: 0.40,
    date: new Date(Date.now() - 172800000).toISOString(),
    description: 'Cambio con cashback jugoso'
  }
];