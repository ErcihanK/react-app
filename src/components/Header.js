import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="top-bar">
        <span className="good-morning">Good Morning</span>
        <div className="right-buttons">
          <button className="subscribe-button">Subscribe</button>
          <button className="icon-button">🔔</button>
          <button className="icon-button">+</button>
        </div>
      </div>
      <h1 className="welcome-back">Welcome Back 🎉</h1>
      <div className="stats-container">
        <StatCard 
          icon="🚶‍♂️" 
          title="Steps" 
          value="2,500" 
          subtext="Steps" 
          progress="50%" 
          color="#4ECDC4"
        />
        <StatCard 
          icon="💧" 
          title="Water" 
          value="1.25" 
          subtext="Liters" 
          progress="75%" 
          color="#FF6B6B"
        />
        <StatCard 
          icon="🔥" 
          title="Calories" 
          value="" 
          subtext="Today Under" 
          progress="10%" 
          color="#FF70A6"
        />
        <StatCard 
          icon="❤️" 
          title="Heart Rate" 
          value="110" 
          subtext="bpm" 
          showGraph={true} 
          color="#9B59B6"
        />
      </div>
    </header>
  );
};

const StatCard = ({ icon, title, value, subtext, progress, color, showGraph }) => {
  return (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <div className="stat-content">
        <span className="stat-icon">{icon}</span>
        <span className="stat-title">{title}</span>
        <div className="stat-value">{value}</div>
        <div className="stat-subtext">{subtext}</div>
      </div>
      {progress && <div className="progress-bar" style={{ width: progress }}></div>}
      {showGraph && <div className="graph">📈</div>}
    </div>
  );
};

export default Header;
