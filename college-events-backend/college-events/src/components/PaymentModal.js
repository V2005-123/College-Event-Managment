import React, { useState } from 'react';
import { X, Lock, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import './PaymentModal.css';

const PaymentModal = ({ event, user, onSuccess, onClose }) => {
  const [paymentState, setPaymentState] = useState('idle'); // idle, processing, success
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentState('processing');

    // Simulate payment processing delay (2 seconds)
    setTimeout(() => {
      setPaymentState('success');
      // Trigger success callback after showing success screen briefly
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="ticket-modal-overlay" onClick={paymentState !== 'processing' ? onClose : null}>
      <div className="payment-modal-container glass" onClick={(e) => e.stopPropagation()}>
        {paymentState !== 'processing' && (
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        )}

        <div className="payment-header">
          <div className="secure-badge">
            <Lock size={14} /> Secure Checkout
          </div>
          <h2>Payment Details</h2>
          <p>Complete your registration for <strong>{event.title}</strong></p>
        </div>

        <div className="payment-amount">
          <span>Total Amount</span>
          <h3>₹{event.price}</h3>
        </div>

        {paymentState === 'idle' && (
          <form onSubmit={handlePayment} className="payment-form">
            <div className="payment-method-tabs">
              <div className="tab active"><CreditCard size={16} /> Card</div>
              <div className="tab">UPI</div>
              <div className="tab">Net Banking</div>
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="0000 0000 0000 0000" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label>Expiry Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="MM/YY" 
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength="5"
                  required 
                />
              </div>
              <div className="form-group half">
                <label>CVV</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="•••" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength="3"
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-lg full-width pay-btn">
              Pay ₹{event.price} securely
            </button>
          </form>
        )}

        {paymentState === 'processing' && (
          <div className="payment-processing">
            <Loader2 size={48} className="spinner" color="var(--primary)" />
            <h3>Processing Payment...</h3>
            <p>Please do not close this window or press back.</p>
          </div>
        )}

        {paymentState === 'success' && (
          <div className="payment-success">
            <CheckCircle size={64} color="#10b981" />
            <h3>Payment Successful!</h3>
            <p>Your payment of ₹{event.price} was received.</p>
          </div>
        )}
        
        <div className="payment-footer">
          <p>Powered by <strong>SimulatedPay</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
