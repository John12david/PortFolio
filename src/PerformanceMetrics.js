import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PerformanceMetrics = ({ metrics }) => {
  // Debug: Log the metrics to confirm they're received
  console.log('PerformanceMetrics received:', metrics);

  // State to manage visibility of details for each metric
  const [visibleDetails, setVisibleDetails] = useState({});

  // Toggle details visibility for a specific metric
  const toggleDetails = (index) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Fallback if metrics is empty or undefined
  if (!metrics || metrics.length === 0) {
    return <p>No performance data available.</p>;
  }

  return (
    <div className="metrics-container">
      {metrics.map((metric, index) => (
        <div className="metric-card" key={index}>
          <h3>{metric.title}</h3>
          <p>Response Time: <strong>{(metric.responseTime / 1000).toFixed(1)}</strong> s</p>
          <p>Throughput: <strong>{metric.throughput}</strong> req/sec</p>
          <p>Error Rate: <strong>{metric.errorRate}</strong>%</p>
          <p>Load: <strong>{metric.load}</strong> users</p>
          <button
            className="metric-details-button"
            onClick={() => toggleDetails(index)}
          >
            {visibleDetails[index] ? 'Hide Details' : 'View Details'}
          </button>
          {visibleDetails[index] && (
            <div className="metric-details">
              <p>Additional details for {metric.title} coming soon!</p>
              {/* You can add more details here, e.g., optimization steps, tools used, etc. */}
            </div>
          )}
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