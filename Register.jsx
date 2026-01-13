import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    voterId: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.name || !formData.dob || !formData.voterId || !formData.mobile || !formData.password) {
      setError('Please fill all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.mobile.length !== 10) {
      setError('Mobile number must be 10 digits')
      return
    }

    const age = calculateAge(formData.dob)
    if (age < 18) {
      setError('You must be at least 18 years old to register')
      return
    }

    // Demo registration - in real app, save to backend
    const userData = {
      id: Date.now(),
      name: formData.name,
      dob: formData.dob,
      voterId: formData.voterId,
      mobile: formData.mobile,
      role: formData.mobile === '9999999999' ? 'admin' : 'voter'
    }

    // Store user data in localStorage (demo)
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))

    setSuccess('Registration successful! Redirecting to login...')
    setTimeout(() => {
      login(userData)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Voter Registration</h2>
        <p className="auth-subtitle">Register for election support services</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Demo Voter ID *</label>
            <input
              type="text"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
              placeholder="Enter demo voter ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
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

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        <p className="auth-note">
          <small>Note: This is for support services only, not for voting</small>
        </p>
      </div>
    </div>
  )
}

export default Register

