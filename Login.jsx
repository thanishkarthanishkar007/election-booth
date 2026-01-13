import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaLock, FaPhone } from 'react-icons/fa'
import './Auth.css'

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('password') // 'password' or 'otp'
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    otp: ''
  })
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const generateOTP = () => {
    // Demo OTP generation
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendOTP = () => {
    if (!formData.mobile || formData.mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }
    const otp = generateOTP()
    alert(`Demo OTP sent to ${formData.mobile}: ${otp}`)
    setOtpSent(true)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (loginMethod === 'otp') {
      if (!otpSent) {
        sendOTP()
        return
      }
      if (!formData.otp) {
        setError('Please enter OTP')
        return
      }
      // Demo login - in real app, verify OTP
      const userData = {
        id: Date.now(),
        name: 'Demo User',
        mobile: formData.mobile,
        role: formData.mobile === '9999999999' ? 'admin' : 'voter'
      }
      login(userData)
      navigate('/dashboard')
    } else {
      if (!formData.mobile || !formData.password) {
        setError('Please fill all fields')
        return
      }
      // Demo login - in real app, verify credentials
      const userData = {
        id: Date.now(),
        name: 'Demo User',
        mobile: formData.mobile,
        role: formData.mobile === '9999999999' ? 'admin' : 'voter'
      }
      login(userData)
      navigate('/dashboard')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="auth-subtitle">Access your voter account</p>

        <div className="auth-tabs">
          <button
            className={loginMethod === 'password' ? 'active' : ''}
            onClick={() => {
              setLoginMethod('password')
              setOtpSent(false)
              setError('')
            }}
          >
            <FaLock /> Password
          </button>
          <button
            className={loginMethod === 'otp' ? 'active' : ''}
            onClick={() => {
              setLoginMethod('otp')
              setOtpSent(false)
              setError('')
            }}
          >
            <FaPhone /> OTP
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              required
            />
          </div>

          {loginMethod === 'password' ? (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
          ) : (
            <>
              {!otpSent ? (
                <button type="button" onClick={sendOTP} className="btn btn-secondary">
                  Send OTP
                </button>
              ) : (
                <div className="form-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    required
                  />
                </div>
              )}
            </>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {loginMethod === 'otp' && !otpSent ? 'Send OTP' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="auth-note">
          <small>Note: Use mobile 9999999999 for admin access</small>
        </p>
      </div>
    </div>
  )
}

export default Login

