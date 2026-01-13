import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FaUserCheck,
  FaFileAlt,
  FaExclamationTriangle,
  FaRobot,
  FaShieldAlt
} from 'react-icons/fa'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const modules = [
    {
      id: 1,
      title: 'Voter Validation',
      description: 'Detect duplicate Voter IDs, age validation, and incomplete records. Data validation only, not vote verification.',
      icon: <FaShieldAlt />,
      path: '/voter-validation',
      color: '#667eea'
    },
    {
      id: 2,
      title: 'Digital Voter ID Forms',
      description: 'Submit Form 6 (new voter) and Form 8 (correction). Upload documents and track status.',
      icon: <FaFileAlt />,
      path: '/voter-forms',
      color: '#28a745'
    },
    {
      id: 3,
      title: 'Election Complaints',
      description: 'Register complaints about booth issues, missing names, officer issues, or EVM information.',
      icon: <FaExclamationTriangle />,
      path: '/complaints',
      color: '#dc3545'
    },
    {
      id: 4,
      title: 'AI Chatbot',
      description: 'Get answers about voter ID, polling dates, booth locations, and election rules.',
      icon: <FaRobot />,
      path: '/chatbot',
      color: '#ffc107'
    }
  ]

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome, {user?.name}!</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0' }}>
          Smart Election Support & Voter Assistance System
        </p>
      </div>

      <div className="grid">
        {modules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            onClick={() => navigate(module.path)}
          >
            <div className="module-icon" style={{ color: module.color }}>
              {module.icon}
            </div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Quick Information</h2>
        <ul style={{ marginTop: '1rem' }}>
          <li>✓ This system is for voter support and assistance only</li>
          <li>✓ Data validation helps identify potential issues</li>
          <li>✓ All forms are for demonstration purposes</li>
          <li>✓ Complaints are tracked and managed by administrators</li>
          <li>✓ Chatbot provides information about election procedures</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard

