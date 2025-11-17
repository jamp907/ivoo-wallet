export const EXCHANGE_RATE = 36.5; // Tasa simulada USD a BSV, actualízala cuando quieras
export const CASHBACK_RATE = 0.02; // 2% de cashback en conversiones

export const calculateConversion = (usdAmount) => {
  const bsvAmount = usdAmount * EXCHANGE_RATE;
  const cashbackUSD = usdAmount * CASHBACK_RATE;
  return { bsvAmount, cashbackUSD };
};

export const generateTransactionId = () => {
  return 'TXN_' + Date.now().toString(36).toUpperCase();
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'VES',
    minimumFractionDigits: 2,
  }).format(amount);
};