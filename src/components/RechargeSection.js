import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/walletHelpers';
import PaymentOrderModal from './PaymentOrderModal';
import ReceiptModal from './ReceiptModal';

const RechargeSection = ({ onRecharge, showNotification }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleRecharge = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= 10000) {
      // En lugar de recargar directo, mostrar orden
      setPaymentDetails({ amount: numAmount });
      setShowOrderModal(true);
      setError('');
    } else {
      setError('¡Ey, pon un monto entre $1 y $10,000, no seas loco!');
    }
  };

  const handleConfirmPayment = (details) => {
    setShowOrderModal(false);
    // Simular éxito: agregar saldo y mostrar comprobante
    onRecharge(details.amount);
    setPaymentDetails(details);
    setShowReceiptModal(true);
    showNotification({
      id: Date.now().toString(),
      type: 'success',
      message: '¡Pago recibido!',
      description: `Se agregaron ${formatCurrency(details.amount, 'USD')} a tu billetera. ¡Gracias por transferir!`
    });
  };

  return (
    <>
      <motion.div 
        className="bg-white/90 rounded-3xl p-6 mb-8 shadow-xl border border-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recargar Dólares</h2>
        <form onSubmit={handleRecharge} className="space-y-4">
          <div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Cuántos dólares quieres agregar?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              min="1"
              max="10000"
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
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!amount || parseFloat(amount) < 1}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Generar Orden de Pago {formatCurrency(parseFloat(amount) || 0, 'USD')}
          </motion.button>
        </form>
      </motion.div>
      <PaymentOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onConfirmPayment={handleConfirmPayment}
        amount={paymentDetails?.amount || 0}
      />
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        receipt={paymentDetails}
      />
    </>
  );
};

export default RechargeSection;