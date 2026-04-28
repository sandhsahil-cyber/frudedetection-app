import { Building2, FileSearch, ShieldAlert, IndianRupee, AlertTriangle, ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const recentAlerts = [
    { id: 'INV-TM-891', outlet: 'Delhi South', date: 'Today, 10:30 AM', amount: 150000, reason: 'Amount mismatch' },
    { id: 'INV-TM-885', outlet: 'Mumbai West', date: 'Today, 09:15 AM', amount: 85000, reason: 'Invalid vendor GSTIN' },
    { id: 'INV-TM-870', outlet: 'Rajkot Central', date: 'Yesterday, 04:45 PM', amount: 450000, reason: 'Duplicate invoice' },
    { id: 'INV-TM-862', outlet: 'Bangalore East', date: 'Yesterday, 02:20 PM', amount: 25000, reason: 'Date altered manually' },
    { id: 'INV-TM-855', outlet: 'Chennai North', date: '26 Oct, 11:00 AM', amount: 120000, reason: 'Unregistered vendor' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Global Dashboard</h1>
        <p>Overview of fraud detection metrics across all TATA Motors dealerships.</p>
      </div>

      <div className="summary-cards">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Building2 className="stat-icon" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Outlets Monitored</p>
            <h3 className="stat-value">12</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <FileSearch className="stat-icon" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Docs Processed (This Month)</p>
            <h3 className="stat-value">14,850</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper red">
            <ShieldAlert className="stat-icon" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Fraud Detected (This Month)</p>
            <h3 className="stat-value danger-text">342</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper yellow">
            <IndianRupee className="stat-icon" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Amount at Risk (₹)</p>
            <h3 className="stat-value warning-text">{formatCurrency(8540000)}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <div className="card-header">
            <h3>Fraud Cases by Outlet Name</h3>
          </div>
          <div className="horizontal-bar-chart">
            <div className="hbar-row">
              <span className="hbar-label">Delhi South</span>
              <div className="hbar-track">
                <div className="hbar-fill red" style={{ width: '85%' }}></div>
              </div>
              <span className="hbar-value">85</span>
            </div>
            <div className="hbar-row">
              <span className="hbar-label">Mumbai West</span>
              <div className="hbar-track">
                <div className="hbar-fill red" style={{ width: '65%' }}></div>
              </div>
              <span className="hbar-value">65</span>
            </div>
            <div className="hbar-row">
              <span className="hbar-label">Rajkot Central</span>
              <div className="hbar-track">
                <div className="hbar-fill yellow" style={{ width: '45%' }}></div>
              </div>
              <span className="hbar-value">45</span>
            </div>
            <div className="hbar-row">
              <span className="hbar-label">Chennai North</span>
              <div className="hbar-track">
                <div className="hbar-fill yellow" style={{ width: '38%' }}></div>
              </div>
              <span className="hbar-value">38</span>
            </div>
            <div className="hbar-row">
              <span className="hbar-label">Bangalore East</span>
              <div className="hbar-track">
                <div className="hbar-fill yellow" style={{ width: '22%' }}></div>
              </div>
              <span className="hbar-value">22</span>
            </div>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-header">
            <h3>Document Types Analyzed</h3>
          </div>
          <div className="pie-chart-container">
            <div className="pie-chart"></div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--primary)' }}></span>
                <span>Vehicle Sales (40%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--success)' }}></span>
                <span>Spare Parts (30%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--warning)' }}></span>
                <span>Service (20%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--danger)' }}></span>
                <span>Accounts/Admin (10%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card recent-activity">
          <div className="card-header flex-between">
            <h3>Recent Fraud Alerts (Last 5)</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <ul className="activity-list">
            {recentAlerts.map((alert, index) => (
              <li key={index} className="activity-item premium-row">
                <div className="activity-icon red-pulse"><AlertTriangle size={18} /></div>
                <div className="activity-details flex-1">
                  <div className="alert-header">
                    <div className="alert-title">
                      <span className="alert-badge">{alert.id}</span>
                      <span className="alert-outlet">{alert.outlet}</span>
                    </div>
                    <span className="alert-amount danger-text font-bold">{formatCurrency(alert.amount)}</span>
                  </div>
                  <div className="alert-meta">
                    <span className="reason"><span className="dot"></span>{alert.reason}</span>
                    <span className="time">{alert.date}</span>
                  </div>
                </div>
                <div className="row-action">
                  <ChevronRight size={20} className="chevron-icon" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

