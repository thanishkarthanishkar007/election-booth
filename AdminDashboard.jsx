import React, { useState, useEffect } from 'react'
import { FaUsers, FaFileAlt, FaExclamationTriangle, FaRobot, FaCheck, FaTimes } from 'react-icons/fa'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('voters')
  const [voters, setVoters] = useState([])
  const [forms, setForms] = useState([])
  const [complaints, setComplaints] = useState([])
  const [faqs, setFaqs] = useState([
    { id: 1, keyword: 'voter id', response: 'You can apply for a voter ID by submitting Form 6 online through this system.' },
    { id: 2, keyword: 'polling date', response: 'Polling dates are announced by the Election Commission of India (ECI) before each election.' },
    { id: 3, keyword: 'booth location', response: 'Your polling booth location is mentioned on your voter ID card.' },
    { id: 4, keyword: 'election rules', response: 'You must be 18 years or older to vote. Carry a valid ID proof to the polling station.' }
  ])
  const [newFaq, setNewFaq] = useState({ keyword: '', response: '' })

  useEffect(() => {
    // Load data from localStorage (demo)
    const storedVoters = JSON.parse(localStorage.getItem('users') || '[]')
    setVoters(storedVoters)

    // Load forms (in real app, from backend)
    const storedForms = JSON.parse(localStorage.getItem('adminForms') || '[]')
    setForms(storedForms)

    // Load complaints (in real app, from backend)
    const storedComplaints = JSON.parse(localStorage.getItem('adminComplaints') || '[]')
    setComplaints(storedComplaints)
  }, [])

  const updateFormStatus = (formId, status) => {
    const updatedForms = forms.map(form =>
      form.id === formId ? { ...form, status } : form
    )
    setForms(updatedForms)
    localStorage.setItem('adminForms', JSON.stringify(updatedForms))
  }

  const updateComplaintStatus = (complaintId, status) => {
    const updatedComplaints = complaints.map(complaint =>
      complaint.id === complaintId ? { ...complaint, status } : complaint
    )
    setComplaints(updatedComplaints)
    localStorage.setItem('adminComplaints', JSON.stringify(updatedComplaints))
  }

  const addFaq = () => {
    if (!newFaq.keyword || !newFaq.response) {
      alert('Please fill both keyword and response')
      return
    }
    const faq = {
      id: Date.now(),
      keyword: newFaq.keyword.toLowerCase(),
      response: newFaq.response
    }
    setFaqs([...faqs, faq])
    setNewFaq({ keyword: '', response: '' })
    alert('FAQ added successfully!')
  }

  const deleteFaq = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter(faq => faq.id !== id))
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
      case 'Resolved':
        return <span className="badge badge-success"><FaCheck /> {status}</span>
      case 'Rejected':
        return <span className="badge badge-danger"><FaTimes /> {status}</span>
      case 'In Progress':
        return <span className="badge badge-info">In Progress</span>
      default:
        return <span className="badge badge-warning">Pending</span>
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Manage voter records, forms, complaints, and chatbot FAQs
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeTab === 'voters' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('voters')}
        >
          <FaUsers /> Voter Records
        </button>
        <button
          className={`btn ${activeTab === 'forms' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('forms')}
        >
          <FaFileAlt /> Forms ({forms.filter(f => f.status === 'Pending').length})
        </button>
        <button
          className={`btn ${activeTab === 'complaints' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('complaints')}
        >
          <FaExclamationTriangle /> Complaints ({complaints.filter(c => c.status === 'Pending').length})
        </button>
        <button
          className={`btn ${activeTab === 'faq' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('faq')}
        >
          <FaRobot /> Chatbot FAQs
        </button>
      </div>

      {activeTab === 'voters' && (
        <div className="card">
          <h3>Voter Records</h3>
          {voters.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Voter ID</th>
                    <th>Mobile</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {voters.map((voter, index) => (
                    <tr key={voter.id || index}>
                      <td>{voter.id || index + 1}</td>
                      <td>{voter.name}</td>
                      <td>{voter.dob || 'N/A'}</td>
                      <td>{voter.voterId || 'N/A'}</td>
                      <td>{voter.mobile}</td>
                      <td><span className="badge badge-info">{voter.role || 'voter'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              No voter records found
            </p>
          )}
        </div>
      )}

      {activeTab === 'forms' && (
        <div className="card">
          <h3>Voter Forms Management</h3>
          {forms.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Form ID</th>
                    <th>Form Type</th>
                    <th>Name</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form) => (
                    <tr key={form.id}>
                      <td><strong>{form.id}</strong></td>
                      <td>{form.formTypeName}</td>
                      <td>{form.name}</td>
                      <td>{form.submittedDate}</td>
                      <td>{getStatusBadge(form.status)}</td>
                      <td>
                        {form.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => updateFormStatus(form.id, 'Approved')}
                              className="btn btn-success"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateFormStatus(form.id, 'Rejected')}
                              className="btn btn-danger"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              No forms pending approval
            </p>
          )}
        </div>
      )}

      {activeTab === 'complaints' && (
        <div className="card">
          <h3>Complaints Management</h3>
          {complaints.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Complaint ID</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id}>
                      <td><strong>{complaint.id}</strong></td>
                      <td>{complaint.categoryLabel}</td>
                      <td style={{ maxWidth: '300px' }}>{complaint.description}</td>
                      <td>{complaint.location || 'N/A'}</td>
                      <td>{complaint.submittedDate}</td>
                      <td>{getStatusBadge(complaint.status)}</td>
                      <td>
                        {complaint.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => updateComplaintStatus(complaint.id, 'In Progress')}
                              className="btn btn-info"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            >
                              In Progress
                            </button>
                            <button
                              onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
                              className="btn btn-success"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            >
                              Resolve
                            </button>
                          </div>
                        )}
                        {complaint.status === 'In Progress' && (
                          <button
                            onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
                            className="btn btn-success"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              No complaints to manage
            </p>
          )}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="card">
          <h3>Chatbot FAQ Management</h3>
          
          <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Add New FAQ</h4>
            <div className="form-group">
              <label>Keyword</label>
              <input
                type="text"
                value={newFaq.keyword}
                onChange={(e) => setNewFaq({ ...newFaq, keyword: e.target.value })}
                placeholder="e.g., voter id, polling date"
              />
            </div>
            <div className="form-group">
              <label>Response</label>
              <textarea
                value={newFaq.response}
                onChange={(e) => setNewFaq({ ...newFaq, response: e.target.value })}
                rows="3"
                placeholder="Enter the response for this keyword"
              />
            </div>
            <button onClick={addFaq} className="btn btn-primary">
              Add FAQ
            </button>
          </div>

          <h4>Existing FAQs</h4>
          {faqs.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Response</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => (
                    <tr key={faq.id}>
                      <td><strong>{faq.keyword}</strong></td>
                      <td>{faq.response}</td>
                      <td>
                        <button
                          onClick={() => deleteFaq(faq.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              No FAQs configured
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard

