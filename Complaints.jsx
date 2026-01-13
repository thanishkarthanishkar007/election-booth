import React, { useState, useEffect } from 'react'
import { FaExclamationCircle, FaCheckCircle, FaClock } from 'react-icons/fa'

const Complaints = () => {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    // Load existing complaints from localStorage
    const storedComplaints = JSON.parse(localStorage.getItem('userComplaints') || '[]')
    setComplaints(storedComplaints)
  }, [])
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    boothNumber: '',
    officerName: '',
    evmInfo: ''
  })

  const categories = [
    { value: 'booth', label: 'Booth Issue' },
    { value: 'name', label: 'Name Missing from List' },
    { value: 'officer', label: 'Officer Issue' },
    { value: 'evm', label: 'EVM Information' },
    { value: 'other', label: 'Other' }
  ]

  const generateComplaintId = () => {
    return `COMP-${Date.now()}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.category || !formData.description) {
      alert('Please fill all required fields')
      return
    }

    const complaint = {
      id: generateComplaintId(),
      category: formData.category,
      categoryLabel: categories.find(c => c.value === formData.category)?.label,
      description: formData.description,
      location: formData.location,
      boothNumber: formData.boothNumber,
      officerName: formData.officerName,
      evmInfo: formData.evmInfo,
      status: 'Pending',
      submittedDate: new Date().toLocaleString(),
      userId: Date.now() // In real app, use actual user ID
    }

    const updatedComplaints = [...complaints, complaint]
    setComplaints(updatedComplaints)

    // Save to localStorage for user
    localStorage.setItem('userComplaints', JSON.stringify(updatedComplaints))
    
    // Also save to admin storage
    const adminComplaints = JSON.parse(localStorage.getItem('adminComplaints') || '[]')
    adminComplaints.push(complaint)
    localStorage.setItem('adminComplaints', JSON.stringify(adminComplaints))

    // Reset form
    setFormData({
      category: '',
      description: '',
      location: '',
      boothNumber: '',
      officerName: '',
      evmInfo: ''
    })

    alert(`Complaint registered successfully! Complaint ID: ${complaint.id}`)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <span className="badge badge-success"><FaCheckCircle /> Resolved</span>
      case 'In Progress':
        return <span className="badge badge-info"><FaClock /> In Progress</span>
      default:
        return <span className="badge badge-warning"><FaClock /> Pending</span>
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Election Complaints Helpline</h2>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Register your complaints about booth issues, missing names, officer issues, or EVM information
        </p>
      </div>

      <div className="card">
        <h3>Register New Complaint</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Complaint Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your complaint in detail..."
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Polling station location"
            />
          </div>

          {formData.category === 'booth' && (
            <div className="form-group">
              <label>Booth Number</label>
              <input
                type="text"
                name="boothNumber"
                value={formData.boothNumber}
                onChange={handleChange}
                placeholder="Booth number (if applicable)"
              />
            </div>
          )}

          {formData.category === 'officer' && (
            <div className="form-group">
              <label>Officer Name</label>
              <input
                type="text"
                name="officerName"
                value={formData.officerName}
                onChange={handleChange}
                placeholder="Name of the officer (if known)"
              />
            </div>
          )}

          {formData.category === 'evm' && (
            <div className="form-group">
              <label>EVM Information</label>
              <textarea
                name="evmInfo"
                value={formData.evmInfo}
                onChange={handleChange}
                rows="3"
                placeholder="Provide details about EVM issue..."
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Submit Complaint
          </button>
        </form>
      </div>

      {complaints.length > 0 && (
        <div className="card">
          <h3>My Complaints</h3>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {complaints.length === 0 && (
        <div className="card">
          <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            <FaExclamationCircle style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }} />
            <p>No complaints registered yet. Submit a complaint using the form above.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Complaints

