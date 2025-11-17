import React from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign as DollarIcon, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/walletHelpers';

const WalletHeader = ({ usdBalance = 0, bsvBalance = 0, totalCashback = 0 }) => {
  const DollarSign = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-500 to-emerald-600 rounded-3xl p-8 mb-8 shadow-xl text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <motion.div 
          className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          <Shield className="w-6 h-6" />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold">Ivoo-Wallet</h1>
          <p className="text-blue-100">Tu dinero seguro y con premios</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarIcon className="w-5 h-5" />
            <span className="text-sm opacity-90">Dólares</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(usdBalance, 'USD')}</p>
        </motion.div>
        <motion.div 
          className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm opacity-90">Bolívares</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(bsvBalance, 'BSV')}</p>
        </motion.div>
        <motion.div 
          className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 rotate-180" />
            <span className="text-sm opacity-90">Cashback Total</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totalCashback, 'USD')}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WalletHeader;