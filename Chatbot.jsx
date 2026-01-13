import React, { useState, useRef, useEffect } from 'react'
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m your Election Support Assistant. I can help you with information about voter ID, polling dates, booth locations, and election rules. How can I assist you today?'
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const faqData = {
    'voter id': [
      'You can apply for a voter ID by submitting Form 6 online through this system.',
      'Required documents include proof of identity, proof of address, and a recent photograph.',
      'You can check your voter ID status in the Voter Forms section after submission.'
    ],
    'polling date': [
      'Polling dates are announced by the Election Commission of India (ECI) before each election.',
      'You can check the official ECI website or your local election office for specific dates.',
      'Polling usually takes place on a single day or multiple phases depending on the election type.'
    ],
    'booth location': [
      'Your polling booth location is mentioned on your voter ID card.',
      'You can also check your booth location on the ECI website using your voter ID number.',
      'Contact your local election office for assistance in finding your polling booth.'
    ],
    'election rules': [
      'You must be 18 years or older to vote.',
      'You can only vote at your designated polling booth.',
      'Carry a valid ID proof (voter ID, Aadhaar, passport, etc.) to the polling station.',
      'Voting is confidential and your choice is secret.',
      'You cannot vote on behalf of someone else.'
    ],
    'form 6': [
      'Form 6 is used for new voter registration.',
      'You can submit Form 6 online through the Voter Forms section.',
      'Required details include personal information, address, and supporting documents.'
    ],
    'form 8': [
      'Form 8 is used for corrections in your existing voter ID.',
      'You can request corrections for name, address, date of birth, or photo.',
      'Submit Form 8 through the Voter Forms section with required documents.'
    ],
    'age': [
      'You must be at least 18 years old to be eligible to vote.',
      'Your age is calculated based on your date of birth.',
      'If you are below 18, you cannot register as a voter.'
    ],
    'complaint': [
      'You can register complaints through the Complaints section.',
      'Complaint categories include booth issues, missing names, officer issues, and EVM information.',
      'Each complaint gets a unique Complaint ID for tracking.'
    ]
  }

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for keywords and return appropriate response
    for (const [keyword, responses] of Object.entries(faqData)) {
      if (lowerMessage.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }

    // Default responses
    const defaultResponses = [
      'I can help you with information about voter ID, polling dates, booth locations, and election rules. Could you please be more specific?',
      'For detailed information, please check the relevant sections: Voter Forms for registration, Complaints for issues, or Voter Validation for data checks.',
      'I\'m here to provide factual information about elections and voting procedures. How can I assist you further?',
      'You can ask me about voter ID registration, polling dates, booth locations, election rules, forms, or complaints. What would you like to know?'
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      type: 'user',
      text: input
    }

    setMessages([...messages, userMessage])
    setInput('')

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(input)
      }
      setMessages(prev => [...prev, botResponse])
    }, 500)
  }

  const quickQuestions = [
    'How to get voter ID?',
    'When is polling date?',
    'Where is my booth?',
    'What are election rules?'
  ]

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>AI Chatbot for Election & ECI Information</h2>
        <div className="alert alert-info">
          <strong>Note:</strong> This chatbot provides factual information about elections and voting procedures. 
          It does not provide political opinions or promote any party.
        </div>
      </div>

      <div className="card" style={{ padding: 0, height: '600px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '1.5rem',
          borderRadius: '12px 12px 0 0'
        }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaRobot /> Election Support Assistant
          </h3>
        </div>

        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1.5rem',
          background: '#f8f9fa'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '1rem'
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: message.type === 'user' ? '#667eea' : 'white',
                  color: message.type === 'user' ? 'white' : '#333',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'flex-start'
                }}
              >
                {message.type === 'bot' && <FaRobot style={{ marginTop: '0.25rem' }} />}
                <div>{message.text}</div>
                {message.type === 'user' && <FaUser style={{ marginTop: '0.25rem' }} />}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid #e0e0e0' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Quick Questions:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(q)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #667eea',
                  background: 'white',
                  color: '#667eea',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#667eea'
                  e.target.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'white'
                  e.target.style.color = '#667eea'
                }}
              >
                {q}
              </button>
            ))}
          </div>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about elections..."
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <FaPaperPlane /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chatbot

