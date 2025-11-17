import React from 'react';
import { motion } from 'framer-motion';
import { X, Phone, User, Banknote } from 'lucide-react';
import { formatCurrency } from '../utils/walletHelpers';

const PaymentOrderModal = ({ isOpen, onClose, onConfirmPayment, amount }) => {
  if (!isOpen) return null;

  const paymentDetails = {
    beneficiary: 'Ivoo Payments C.A.',
    ci: 'V-12.345.678',
    phone: '0412-345-6789',
    bank: 'Banco de Venezuela',
    account: '0134-1234-56-78901234',
    reference: `IVOO-${Date.now().toString().slice(-6)}`
  };

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
          <h2 className="text-2xl font-bold text-gray-800">Orden de Pago Móvil</h2>
          <motion.button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl">
            <Banknote className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-gray-800">Monto a pagar</p>
              <p className="text-lg font-bold text-emerald-600">{formatCurrency(amount, 'USD')}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
            <p className="text-sm font-medium text-gray-700">Transfiere vía Pago Móvil:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">A:</span> {paymentDetails.beneficiary}
              </div>
              <div>
                <span className="text-gray-500">C.I.:</span> {paymentDetails.ci}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">Tel:</span> {paymentDetails.phone}
              </div>
              <div>
                <span className="text-gray-500">Banco:</span> {paymentDetails.bank}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Cuenta:</span> {paymentDetails.account}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 font-medium">Ref:</span> {paymentDetails.reference}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Copia estos datos y envía desde tu app bancaria. ¡Rápido!</p>
          </div>
        </div>
        <motion.button
          onClick={() => onConfirmPayment({ ...paymentDetails, amount })}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ¡Ya pagué! Confirmar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentOrderModal;