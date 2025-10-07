import React from 'react';

const TradeButton = ({ onClick, loading, disabled, text = "Initiate Trade" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`neon-button text-white px-8 py-4 rounded-lg font-bold text-xl w-full transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default TradeButton;