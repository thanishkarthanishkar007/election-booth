# Smart Election Support & Voter Assistance System

A comprehensive React-based web application for election support and voter assistance services.

## Features

### Module 1: User Registration & Login
- Voter registration using Name, DOB, Demo Voter ID, and Mobile number
- OTP / Password based login
- Security purpose only (no voting functionality)

### Module 2: Fake & Invalid Voter Identification (Data Validation)
- Detect duplicate Voter IDs
- Detect age below 18
- Detect same Name + DOB combinations
- Detect incomplete records
- Output valid and invalid voter lists
- **Note:** This is data validation only, not vote verification

### Module 3: Digital Voter ID Forms
- Online Form 6 (new voter registration) – demo
- Online Form 8 (correction requests)
- Document upload (dummy)
- Status tracking (Pending / Approved / Rejected)

### Module 4: Election Complaints Helpline
- Complaint categories:
  - Booth Issue
  - Name Missing from List
  - Officer Issue
  - EVM Information
  - Other
- Complaint ID generation
- Status tracking by admin

### Module 5: AI Chatbot for Election & ECI Information
- Answer questions about:
  - Voter ID
  - Polling dates
  - Booth locations
  - Election rules
- No political opinion or party promotion
- Uses FAQ + NLP-based keyword matching

### Module 6: Admin Dashboard
- View voter records
- View invalid voter reports
- Approve/reject forms
- Handle complaints (update status)
- Update chatbot FAQs

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

### For Regular Users:
1. Register a new account or login
2. Access various modules from the dashboard
3. Submit forms, register complaints, or chat with the AI assistant

### For Admin:
- Login with mobile number: `9999999999` (any password/OTP)
- Access the Admin Dashboard to manage:
  - Voter records
  - Form approvals
  - Complaint handling
  - Chatbot FAQ updates

## Technology Stack

- **React 18** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool
- **React Icons** - Icon library
- **LocalStorage** - Data persistence (demo)

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, ProtectedRoute)
├── context/         # Auth context for state management
├── pages/           # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── VoterValidation.jsx
│   ├── VoterForms.jsx
│   ├── Complaints.jsx
│   ├── Chatbot.jsx
│   └── AdminDashboard.jsx
├── App.jsx          # Main app component with routing
└── main.jsx         # Entry point
```

## Important Notes

- This is a **demonstration system** for election support services
- **No actual voting functionality** is implemented
- Data validation is for **support purposes only**, not vote verification
- All data is stored in browser localStorage (demo purposes)
- In production, this would connect to a secure backend API

## Demo Credentials

- **Admin Login:** Mobile: `9999999999` (any password/OTP)
- **Regular User:** Register a new account or use any mobile number

## License

This project is for demonstration purposes only.

