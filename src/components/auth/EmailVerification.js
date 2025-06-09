import React, { useState, useEffect } from 'react';
import api from '../Service'; // ✅ Import API service

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    if (isOtpSent) {
      api.sendOtp(email)
        .then(() => console.log(`OTP sent to ${email}`))
        .catch((err) => console.error('OTP sending failed:', err));
    }
  }, [isOtpSent, email]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setIsOtpSent(true);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await api.verifyOtp(email, otp);
      alert('OTP verified successfully!');
    } catch (err) {
      alert('OTP verification failed!');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Email Verification</h2>

        {!isOtpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input
                type="text"
                id="otp"
                className="form-control"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
