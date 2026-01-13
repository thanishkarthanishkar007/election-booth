import React, { useState } from 'react'
import { FaUpload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const VoterValidation = () => {
  const [voters, setVoters] = useState([])
  const [validVoters, setValidVoters] = useState([])
  const [invalidVoters, setInvalidVoters] = useState([])
  const [validationResults, setValidationResults] = useState(null)

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

  const validateVoters = () => {
    if (voters.length === 0) {
      alert('Please add voter data first')
      return
    }

    const valid = []
    const invalid = []
    const voterIdSet = new Set()
    const nameDobSet = new Set()

    voters.forEach((voter, index) => {
      const errors = []
      const voterId = voter.voterId?.trim()
      const name = voter.name?.trim()
      const dob = voter.dob
      const mobile = voter.mobile?.trim()

      // Check incomplete records
      if (!voterId || !name || !dob || !mobile) {
        errors.push('Incomplete record')
      }

      // Check duplicate Voter ID
      if (voterId) {
        if (voterIdSet.has(voterId)) {
          errors.push('Duplicate Voter ID')
        } else {
          voterIdSet.add(voterId)
        }
      }

      // Check age below 18
      if (dob) {
        const age = calculateAge(dob)
        if (age < 18) {
          errors.push(`Age below 18 (${age} years)`)
        }
      }

      // Check same Name + DOB
      if (name && dob) {
        const nameDobKey = `${name.toLowerCase()}_${dob}`
        if (nameDobSet.has(nameDobKey)) {
          errors.push('Duplicate Name + DOB combination')
        } else {
          nameDobSet.add(nameDobKey)
        }
      }

      const voterWithValidation = {
        ...voter,
        id: index + 1,
        errors,
        isValid: errors.length === 0
      }

      if (errors.length === 0) {
        valid.push(voterWithValidation)
      } else {
        invalid.push(voterWithValidation)
      }
    })

    setValidVoters(valid)
    setInvalidVoters(invalid)
    setValidationResults({
      total: voters.length,
      valid: valid.length,
      invalid: invalid.length
    })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target.result
        const lines = text.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',').map(h => h.trim())
        
        const parsedVoters = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim())
          const voter = {}
          headers.forEach((header, i) => {
            voter[header.toLowerCase().replace(/\s+/g, '')] = values[i] || ''
          })
          return voter
        })

        setVoters(parsedVoters)
        alert(`Loaded ${parsedVoters.length} voters from CSV`)
      } catch (error) {
        alert('Error parsing CSV file. Please check the format.')
      }
    }
    reader.readAsText(file)
  }

  const addManualVoter = () => {
    const voter = {
      name: '',
      dob: '',
      voterId: '',
      mobile: ''
    }
    setVoters([...voters, voter])
  }

  const updateVoter = (index, field, value) => {
    const updated = [...voters]
    updated[index][field] = value
    setVoters(updated)
  }

  const removeVoter = (index) => {
    setVoters(voters.filter((_, i) => i !== index))
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Fake & Invalid Voter Identification</h2>
        <div className="alert alert-info">
          <strong>Note:</strong> This module is for data validation only, not vote verification. 
          It helps identify duplicate Voter IDs, age validation, duplicate Name+DOB combinations, and incomplete records.
        </div>
      </div>

      <div className="card">
        <h3>Add Voter Data</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Upload CSV File (Name, DOB, Voter ID, Mobile)
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ marginBottom: '1rem' }}
          />
          <button onClick={addManualVoter} className="btn btn-secondary">
            Add Manual Entry
          </button>
        </div>

        {voters.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h4>Voter Data ({voters.length} entries)</h4>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Voter ID</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {voters.map((voter, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={voter.name || ''}
                          onChange={(e) => updateVoter(index, 'name', e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={voter.dob || ''}
                          onChange={(e) => updateVoter(index, 'dob', e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={voter.voterid || voter.voterId || ''}
                          onChange={(e) => updateVoter(index, 'voterId', e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </td>
                      <td>
                        <input
                          type="tel"
                          value={voter.mobile || ''}
                          onChange={(e) => updateVoter(index, 'mobile', e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => removeVoter(index)}
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem' }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={validateVoters} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Validate Voters
            </button>
          </div>
        )}
      </div>

      {validationResults && (
        <>
          <div className="card">
            <h3>Validation Summary</h3>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
              <div>
                <strong>Total Voters:</strong> {validationResults.total}
              </div>
              <div style={{ color: '#28a745' }}>
                <strong>Valid:</strong> {validationResults.valid}
              </div>
              <div style={{ color: '#dc3545' }}>
                <strong>Invalid:</strong> {validationResults.invalid}
              </div>
            </div>
          </div>

          {validVoters.length > 0 && (
            <div className="card">
              <h3 style={{ color: '#28a745' }}>
                <FaCheckCircle /> Valid Voters ({validVoters.length})
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>Voter ID</th>
                      <th>Mobile</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validVoters.map((voter) => (
                      <tr key={voter.id}>
                        <td>{voter.id}</td>
                        <td>{voter.name}</td>
                        <td>{voter.dob}</td>
                        <td>{voter.voterId || voter.voterid}</td>
                        <td>{voter.mobile}</td>
                        <td><span className="badge badge-success">Valid</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {invalidVoters.length > 0 && (
            <div className="card">
              <h3 style={{ color: '#dc3545' }}>
                <FaTimesCircle /> Invalid Voters ({invalidVoters.length})
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>Voter ID</th>
                      <th>Mobile</th>
                      <th>Errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invalidVoters.map((voter) => (
                      <tr key={voter.id}>
                        <td>{voter.id}</td>
                        <td>{voter.name || 'N/A'}</td>
                        <td>{voter.dob || 'N/A'}</td>
                        <td>{voter.voterId || voter.voterid || 'N/A'}</td>
                        <td>{voter.mobile || 'N/A'}</td>
                        <td>
                          {voter.errors.map((error, idx) => (
                            <span key={idx} className="badge badge-danger" style={{ marginRight: '0.25rem' }}>
                              {error}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default VoterValidation

