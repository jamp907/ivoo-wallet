import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Clock, DollarSign as DollarIcon } from 'lucide-react';
import { formatCurrency } from '../utils/walletHelpers';

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen) return null;

  const DollarSign = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Comprobante de Pago</h2>
          <motion.button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 rounded-2xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <p className="font-bold text-emerald-600">¡Pago confirmado! Tu saldo se actualizó.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Fecha:</span>
              <span className="font-medium">{new Date().toLocaleDateString('es-VE')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Hora:</span>
              <span className="font-medium">{new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-bold text-emerald-600">
              <DollarIcon className="w-5 h-5" />
              {formatCurrency(receipt.amount, 'USD')}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Referencia:</span> {receipt.reference}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Beneficiario:</span> {receipt.beneficiary}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Transacción procesada en Ivoo-Wallet</span>
            </div>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          className="w-full bg-emerald-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ¡Listo! Cerrar y seguir
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ReceiptModal;