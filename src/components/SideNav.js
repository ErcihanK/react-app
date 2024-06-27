import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './SideNav.css';

const SideNav = () => {
  const goals = [
    { name: 'Running', target: '70km/80km', percentage: 87.5, icon: '🏃' },
    { name: 'Sleeping', target: '50hrs/60hrs', percentage: 83.3, icon: '💤' },
    { name: 'Weight Loss', target: '70kg/100kg', percentage: 70, icon: '🔥' },
  ];

  const monthlyProgress = 80;

  return (
    <div className="side-nav">
      <div className="profile">
        <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt="Profile" className="profile-image" />
        <h2>Thomas Fletcher</h2>
        <p>Sydney, Australia</p>
      </div>
      
      <div className="stats">
        <div className="stat-item">
          <span className="stat-value">75</span>
          <span className="stat-label">Weight</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">6.5</span>
          <span className="stat-label">Height</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">25</span>
          <span className="stat-label">Age</span>
        </div>
      </div>
      
      <div className="goals">
        <h3>Your Goals</h3>
        {goals.map((goal, index) => (
          <div className="goal-item" key={index}>
            <div className="goal-icon">{goal.icon}</div>
            <div className="goal-info">
              <span className="goal-name">{goal.name}</span>
              <span className="goal-target">{goal.target}</span>
            </div>
            <div className="goal-progress">
              <CircularProgressbar
                value={goal.percentage}
                text={`${goal.percentage}%`}
                styles={buildStyles({
                  pathColor: goal.percentage >= 80 ? '#00B8D9' : goal.percentage >= 60 ? '#FF5630' : '#6554C0',
                  textColor: '#333',
                  trailColor: '#E0E0E0',
                  backgroundColor: '#fff',
                })}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="monthly-progress">
        <h3>Monthly Progress</h3>
        <div className="progress-circle">
          <CircularProgressbar
            value={monthlyProgress}
            text={`${monthlyProgress}%`}
            styles={buildStyles({
              pathColor: '#FF5630',
              textColor: '#333',
              trailColor: '#E0E0E0',
              backgroundColor: '#fff',
            })}
          />
        </div>
        <p>You have achieved {monthlyProgress}% of your goal this month</p>
      </div>
      
      <div className="scheduled">
        <h3>Scheduled</h3>
        <div className="schedule-item">
          <div className="schedule-icon">🧘</div>
          <div className="schedule-info">
            <span className="schedule-name">Training - Yoga Class</span>
            <span className="schedule-category">Fitness</span>
          </div>
          <span className="schedule-date">22 Mar</span>
        </div>
        <div className="schedule-item">
          <div className="schedule-icon">🏊</div>
          <div className="schedule-info">
            <span className="schedule-name">Training - Swimming</span>
            <span className="schedule-category">Fitness</span>
          </div>
          <span className="schedule-date">22 Mar</span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
