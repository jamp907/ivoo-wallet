import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WalletHeader from './components/WalletHeader';
import RechargeSection from './components/RechargeSection';
import ConversionSection from './components/ConversionSection';
import TransactionHistory from './components/TransactionHistory';
import Notifications from './components/Notifications';
import { initialTransactions } from './mock/transactions';
import { generateTransactionId, CASHBACK_RATE, calculateConversion } from './utils/walletHelpers';

const App = () => {
  const [usdBalance, setUsdBalance] = useState(100.00);
  const [bsvBalance, setBsvBalance] = useState(3650.00);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [totalCashback, setTotalCashback] = useState(5.00);
  const [notifications, setNotifications] = useState([]);

  const showNotification = (notif) => {
    setNotifications(prev => [...prev, notif]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        setNotifications(prev => prev.slice(1));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [notifications]);

  useEffect(() => {
    const savedUsd = localStorage.getItem('usdBalance');
    const savedBsv = localStorage.getItem('bsvBalance');
    const savedTransactions = localStorage.getItem('transactions');
    const savedCashback = localStorage.getItem('totalCashback');

    if (savedUsd) setUsdBalance(parseFloat(savedUsd));
    if (savedBsv) setBsvBalance(parseFloat(savedBsv));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedCashback) setTotalCashback(parseFloat(savedCashback));
  }, []);

  useEffect(() => {
    localStorage.setItem('usdBalance', usdBalance.toFixed(2));
    localStorage.setItem('bsvBalance', bsvBalance.toFixed(2));
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('totalCashback', totalCashback.toFixed(2));
  }, [usdBalance, bsvBalance, transactions, totalCashback]);

  const handleRecharge = (amount) => {
    setUsdBalance(prev => prev + amount);
    const newTx = {
      id: generateTransactionId(),
      type: 'recarga',
      amount,
      currency: 'USD',
      date: new Date().toISOString(),
      description: `Recarga de ${amount} USD`
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleConvert = (usdAmount) => {
    const { bsvAmount, cashbackUSD } = calculateConversion(usdAmount);
    setUsdBalance(prev => prev - usdAmount + cashbackUSD);
    setBsvBalance(prev => prev + bsvAmount);
    setTotalCashback(prev => prev + cashbackUSD);

    const newTx = {
      id: generateTransactionId(),
      type: 'conversion',
      usdAmount,
      bsvAmount,
      cashback: cashbackUSD,
      date: new Date().toISOString(),
      description: `Conversión de ${usdAmount} USD a BSV + cashback`
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <WalletHeader 
            usdBalance={usdBalance} 
            bsvBalance={bsvBalance} 
            totalCashback={totalCashback} 
          />
          <RechargeSection onRecharge={handleRecharge} showNotification={showNotification} />
          <ConversionSection usdBalance={usdBalance} onConvert={handleConvert} showNotification={showNotification} />
          <TransactionHistory transactions={transactions} />
          <Notifications notifications={notifications} />
        </motion.div>
      </div>
    </div>
  );
};

export default App;