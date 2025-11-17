import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, DollarSign as DollarIcon } from 'lucide-react';

const Notifications = ({ notifications = [] }) => {
  const DollarSign = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
              notif.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-900' 
                : 'bg-red-500/20 border border-red-500/30 text-red-900'
            }`}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-3">
              {notif.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <div>
                <p className="font-semibold">{notif.message}</p>
                {notif.description && <p className="text-sm opacity-80">{notif.description}</p>}
              </div>
              <DollarIcon className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;