import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { calculateConversion, formatCurrency, EXCHANGE_RATE } from '../utils/walletHelpers';

const ConversionSection = ({ usdBalance, onConvert, showNotification }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const numAmount = parseFloat(amount);
  const canConvert = numAmount > 0 && numAmount <= usdBalance;
  const { bsvAmount, cashbackUSD } = calculateConversion(numAmount);

  const handleConvert = (e) => {
    e.preventDefault();
    if (canConvert) {
      onConvert(numAmount);
      showNotification({
        id: Date.now().toString(),
        type: 'success',
        message: '¡Conversión realizada!',
        description: `Obtuviste ${formatCurrency(bsvAmount, 'BSV')} y ${formatCurrency(cashbackUSD, 'USD')} de cashback. ¡Sigue ganando!`
      });
      setAmount('');
      setError('');
    } else if (numAmount > usdBalance) {
      setError(`¡Opa! Solo tienes ${formatCurrency(usdBalance, 'USD')} para cambiar, no te pases de vivo.`);
      showNotification({
        id: Date.now().toString(),
        type: 'error',
        message: '¡Fondo insuficiente!',
        description: 'Revisa tu saldo y vuelve a intentarlo.'
      });
    } else {
      setError('¡Pon un monto válido, genio!');
    }
  };

  return (
    <motion.div 
      className="bg-white/90 rounded-3xl p-6 mb-8 shadow-xl border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Convertir a Bolívares</h2>
      <form onSubmit={handleConvert} className="space-y-4">
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Cuántos dólares cambias?"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            min="0.01"
            max={usdBalance}
            step="0.01"
          />
          {error && (
            <motion.div 
              className="flex items-center gap-2 text-red-600 mt-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </div>
        {canConvert && (
          <motion.div 
            className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-gray-600">Recibirás:</p>
            <div className="flex justify-between text-lg font-semibold">
              <span>{formatCurrency(bsvAmount, 'BSV')}</span>
              <ArrowRight className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-sm text-green-600 flex items-center gap-1">
              + Cashback: {formatCurrency(cashbackUSD, 'USD')} (¡Gratis para ti!)
            </p>
            <p className="text-xs text-gray-500">Tasa: 1 USD = {EXCHANGE_RATE} BSV</p>
          </motion.div>
        )}
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={canConvert ? { scale: 1.02 } : {}}
          whileTap={canConvert ? { scale: 0.98 } : {}}
          disabled={!canConvert}
        >
          <ArrowRight className="w-5 h-5 inline mr-2" />
          Convertir {formatCurrency(numAmount || 0, 'USD')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ConversionSection;