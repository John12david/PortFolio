import React from 'react';
import PropTypes from 'prop-types';

const PerformanceMetrics = ({ metrics }) => {
  // Debug: Log the metrics to confirm they're received
  console.log('PerformanceMetrics received:', metrics);

  // Fallback if metrics is empty or undefined
  if (!metrics || metrics.length === 0) {
    return <p>No performance data available.</p>;
  }

  return (
    <div className="metrics-container">
      {metrics.map((metric, index) => (
        <div className="metric-card" key={index}>
          <h3>{metric.title}</h3>
          <p>Response Time: <strong>{metric.responseTime}</strong> ms</p>
          <p>Throughput: <strong>{metric.throughput}</strong> req/sec</p>
          <p>Error Rate: <strong>{metric.errorRate}</strong>%</p>
          <p>Load: <strong>{metric.load}</strong> users</p>
          <button className="metric-details-button">View Details</button>
        </div>
      ))}
    </div>
  );
};

PerformanceMetrics.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      responseTime: PropTypes.number.isRequired,
      throughput: PropTypes.number.isRequired,
      errorRate: PropTypes.number.isRequired,
      load: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PerformanceMetrics;