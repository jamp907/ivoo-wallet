import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, DollarSign as DollarIcon } from 'lucide-react';
import { formatCurrency } from '../utils/walletHelpers';

const TransactionHistory = ({ transactions = [] }) => {
  const DollarSign = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  if (transactions.length === 0) {
    return (
      <motion.div 
        className="bg-white/80 rounded-3xl p-8 text-center shadow-xl border border-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Sin movidas aún</h3>
        <p className="text-gray-500">¡Recarga o convierte para ver tu historial!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white/90 rounded-3xl p-6 shadow-xl border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Historial de Transacciones</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {transactions.slice(0, 10).map((tx, index) => (
            <motion.div
              key={tx.id}
              className={`p-4 rounded-2xl border ${
                tx.type === 'recarga' ? 'bg-green-50 border-green-200' : 'bg-emerald-50 border-emerald-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{tx.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.date).toLocaleDateString('es-VE')} {new Date(tx.date).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right ml-4">
                  {tx.type === 'recarga' ? (
                    <p className="text-lg font-bold text-green-600">{formatCurrency(tx.amount, 'USD')}</p>
                  ) : (
                    <>
                      <p className="text-sm text-emerald-600">-{formatCurrency(tx.usdAmount, 'USD')}</p>
                      <p className="text-sm text-green-600">+{formatCurrency(tx.bsvAmount, 'BSV')}</p>
                      {tx.cashback > 0 && (
                        <p className="text-xs text-emerald-600">+{formatCurrency(tx.cashback, 'USD')} cashback</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionHistory;