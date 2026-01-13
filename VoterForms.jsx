import React, { useState, useEffect } from 'react'
import { FaFileUpload, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'

const VoterForms = () => {
  const [activeForm, setActiveForm] = useState(null) // 'form6' or 'form8'
  const [forms, setForms] = useState([])
  const [formData, setFormData] = useState({
    formType: '',
    name: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    mobile: '',
    email: '',
    correctionField: '',
    correctionDetails: '',
    document: null
  })

  useEffect(() => {
    if (activeForm) {
      setFormData(prev => ({ ...prev, formType: activeForm }))
    }
  }, [activeForm])

  useEffect(() => {
    // Load existing forms from localStorage
    const storedForms = JSON.parse(localStorage.getItem('userForms') || '[]')
    setForms(storedForms)
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const generateFormId = (type) => {
    const prefix = type === 'form6' ? 'F6' : 'F8'
    return `${prefix}-${Date.now()}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.formType) {
      alert('Please select a form type')
      return
    }

    const newForm = {
      id: generateFormId(formData.formType),
      formType: formData.formType,
      formTypeName: formData.formType === 'form6' ? 'Form 6 (New Voter)' : 'Form 8 (Correction)',
      ...formData,
      status: 'Pending',
      submittedDate: new Date().toLocaleDateString(),
      documentName: formData.document ? formData.document.name : 'No document'
    }

    const updatedForms = [...forms, newForm]
    setForms(updatedForms)
    
    // Save to localStorage for user
    localStorage.setItem('userForms', JSON.stringify(updatedForms))
    
    // Also save to admin storage
    const adminForms = JSON.parse(localStorage.getItem('adminForms') || '[]')
    adminForms.push(newForm)
    localStorage.setItem('adminForms', JSON.stringify(adminForms))
    
    // Reset form
    setFormData({
      formType: '',
      name: '',
      fatherName: '',
      motherName: '',
      dob: '',
      gender: '',
      address: '',
      district: '',
      state: '',
      pincode: '',
      mobile: '',
      email: '',
      correctionField: '',
      correctionDetails: '',
      document: null
    })
    setActiveForm(null)
    
    alert(`Form submitted successfully! Form ID: ${newForm.id}`)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="badge badge-success"><FaCheckCircle /> Approved</span>
      case 'Rejected':
        return <span className="badge badge-danger"><FaTimesCircle /> Rejected</span>
      default:
        return <span className="badge badge-warning"><FaClock /> Pending</span>
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Digital Voter ID Forms</h2>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Submit Form 6 for new voter registration or Form 8 for corrections
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <div className="module-card" onClick={() => setActiveForm('form6')}>
          <div className="module-icon" style={{ color: '#28a745' }}>
            <FaFileUpload />
          </div>
          <h3>Form 6 - New Voter</h3>
          <p>Register as a new voter</p>
        </div>

        <div className="module-card" onClick={() => setActiveForm('form8')}>
          <div className="module-icon" style={{ color: '#ffc107' }}>
            <FaFileUpload />
          </div>
          <h3>Form 8 - Correction</h3>
          <p>Request corrections to existing voter ID</p>
        </div>
      </div>

      {activeForm && (
        <div className="card">
          <h3>{activeForm === 'form6' ? 'Form 6: New Voter Registration' : 'Form 8: Voter ID Correction'}</h3>
          
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="formType" value={activeForm} />

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mother's Name *</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
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
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>District *</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength="6"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {activeForm === 'form8' && (
              <>
                <div className="form-group">
                  <label>Field to Correct *</label>
                  <select
                    name="correctionField"
                    value={formData.correctionField}
                    onChange={handleChange}
                    required={activeForm === 'form8'}
                  >
                    <option value="">Select Field</option>
                    <option value="Name">Name</option>
                    <option value="Date of Birth">Date of Birth</option>
                    <option value="Address">Address</option>
                    <option value="Photo">Photo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Correction Details *</label>
                  <textarea
                    name="correctionDetails"
                    value={formData.correctionDetails}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe what needs to be corrected"
                    required={activeForm === 'form8'}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Upload Document (Dummy) *</label>
              <input
                type="file"
                name="document"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <small style={{ color: '#666', display: 'block', marginTop: '0.5rem' }}>
                Accepted formats: PDF, JPG, PNG (Demo only)
              </small>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary">
                Submit Form
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveForm(null)
                  setFormData({
                    formType: '',
                    name: '',
                    fatherName: '',
                    motherName: '',
                    dob: '',
                    gender: '',
                    address: '',
                    district: '',
                    state: '',
                    pincode: '',
                    mobile: '',
                    email: '',
                    correctionField: '',
                    correctionDetails: '',
                    document: null
                  })
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {forms.length > 0 && (
        <div className="card">
          <h3>Submitted Forms</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Form ID</th>
                  <th>Form Type</th>
                  <th>Name</th>
                  <th>Submitted Date</th>
                  <th>Document</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id}>
                    <td>{form.id}</td>
                    <td>{form.formTypeName}</td>
                    <td>{form.name}</td>
                    <td>{form.submittedDate}</td>
                    <td>{form.documentName}</td>
                    <td>{getStatusBadge(form.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoterForms

