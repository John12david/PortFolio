import React from 'react';
import './App.css';
import profilePicture from './assets/ProfilePicture.jpeg';
import yourIcon from './assets/apachejmeter.svg';
import yourIcon2 from './assets/LoadRunner_logo.png';
import yourIcon3 from './assets/selenium.svg';
import yourIcon4 from './assets/appdynamics.png';
import yourIcon5 from './assets/grafana.webp';
import PerformanceMetrics from './PerformanceMetrics';
import TypingEffect from './TypingEffect';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

// Scroll to Section Function
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, null, `#${id}`);
  } else {
    console.error(`Section with id "${id}" not found.`);
  }
}

// Header with Live Metrics Simulator
const Header = () => {
  const [uptime, setUptime] = React.useState(0);
  const [metrics, setMetrics] = React.useState({
    responseTime: 245,
    throughput: 300,
  });

  React.useEffect(() => {
    const uptimeInterval = setInterval(() => setUptime(prev => prev + 1), 1000);
    const metricsInterval = setInterval(() => {
      setMetrics({
        responseTime: Math.floor(Math.random() * 50) + 200, // 200-250ms
        throughput: Math.floor(Math.random() * 100) + 250, // 250-350 req/s
      });
    }, 3000);
    return () => {
      clearInterval(uptimeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">Control Panel: JD</div>
      <div className="system-status">
        Uptime: {uptime}s | Resp: {metrics.responseTime}ms | Thrpt: {metrics.throughput} req/s
      </div>
      <nav className="nav">
        <ul>
          <li><button onClick={() => scrollToSection('about')} className="link-button">About</button></li>
          <li><button onClick={() => scrollToSection('projects')} className="link-button">Projects</button></li>
          <li><button onClick={() => scrollToSection('skills')} className="link-button">Skills</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="link-button">Contact</button></li>
        </ul>
      </nav>
    </header>
  );
};

// Terminal Command Input
const TerminalInput = ({ onCommand }) => {
  const [input, setInput] = React.useState('');

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      onCommand(command);
      setInput('');
    }
  };

  return (
    <div className="terminal-input">
      <span className="prompt">$ </span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleCommand}
        placeholder="Type command (e.g., run test, show skills)"
      />
    </div>
  );
};

// Hero Section with Terminal Boot Sequence
const HeroSection = () => {
  const bootSequence = [
    "Initializing JOHN DAVID...",
    "Role: PERFORMANCE ENGINEER",
    "Domain: Banking Systems",
    "Status: Online",
  ];

  return (
    <section className="hero terminal">
      <img src={profilePicture} alt="Profile" className="profile-picture" loading="lazy" />
      <div className="hero-text">
        {bootSequence.map((line, index) => (
          <p key={index} className="boot-line">
            <TypingEffect text={line} speed={50} loop={false} />
          </p>
        ))}
      </div>
    </section>
  );
};

// About Section as System Log
const AboutSection = () => {
  return (
    <section className="summary log-section" id="about">
      <h2>System Log</h2>
      <div className="log-container">
        <p><span className="timestamp">[2023-05-01]</span> Deployed at Maveric Systems Limited. Role: Test Engineer. Focus: Banking performance testing.</p>
        <p><span className="timestamp">[2022-08-01]</span> Initialized at Revature India. Task: Salesforce performance optimization.</p>
        <p><span className="timestamp">[2021-06-01]</span> System upgrade completed: B.E. in Electronics and Communication.</p>
      </div>
    </section>
  );
};

// Projects Section as Test Reports
const ProjectsSection = () => {
  const [openIndex, setOpenIndex] = React.useState(null);
  const projects = [
    {
      title: "Bank ABC - Bahrain",
      description: "Optimized banking app under high load.",
      tools: "JMeter, AppDynamics, Grafana",
      results: ["Response Time: -30%", "Throughput: +50%"],
    },
    {
      title: "Bank ABC - Egypt",
      description: "Scaled app for regional traffic.",
      tools: "JMeter, AppDynamics",
      results: ["Scalability: +20%", "Error Rate: -5%"],
    },
  ];

  return (
    <section className="projects" id="projects">
      <h2>Test Reports</h2>
      <div className="projects-container">
        {projects.map((proj, idx) => (
          <div key={idx} className="project-card test-report">
            <h3 onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
              {proj.title} {openIndex === idx ? "[-]" : "[+]"}
            </h3>
            {openIndex === idx && (
              <div className="report-details">
                <p>{proj.description}</p>
                <ul>
                  <li>Tools: {proj.tools}</li>
                  {proj.results.map((res, i) => <li key={i}>{res}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  return (
    <section className="experience">
      <h2>Experience</h2>
      <div className="experience-container">
        <div className="experience-card">
          <h3>Maveric Systems Limited</h3>
          <p className="job-title">Test Engineer</p>
          <p className="duration"><strong>May 2023 - Present</strong> (1 year 6 months)</p>
          <ul>
            <li>Led performance testing for web-based banking applications using JMeter.</li>
            <li>Collaborated with development teams to identify performance bottlenecks.</li>
            <li>Utilized Dynatrace for monitoring and analyzing application performance.</li>
          </ul>
        </div>
        <div className="experience-card">
          <h3>Revature India</h3>
          <p className="job-title">Associate Testing Engineer</p>
          <p className="duration"><strong>August 2022 - April 2023</strong> (9 months)</p>
          <ul>
            <li>Conducted manual and automated testing on Salesforce applications.</li>
            <li>Assisted in developing test scripts using Selenium and TestNG.</li>
            <li>Participated in Agile ceremonies to enhance team collaboration.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// Performance Dashboard (Animated Chart with Load Levels)
const PerformanceDashboard = ({ runStressTestRef }) => {
  const [chartData, setChartData] = React.useState([{ time: '0s', responseTime: 500 }]);
  const [isTesting, setIsTesting] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const runStressTest = (loadLevel = 'medium') => {
    setIsTesting(true);
    setChartData([{ time: '0s', responseTime: 500 }]);
    const baseResponse = loadLevel === 'low' ? 200 : loadLevel === 'medium' ? 300 : 500;
    const testSteps = Array.from({ length: 5 }, (_, i) => ({
      time: `${i + 1}s`,
      responseTime: baseResponse + Math.random() * 100 - 50,
    }));

    testSteps.forEach((step, index) => {
      setTimeout(() => {
        setChartData(prev => [...prev, step]);
        if (index === testSteps.length - 1) setIsTesting(false);
      }, (index + 1) * 1000);
    });
  };

  React.useImperativeHandle(runStressTestRef, () => ({
    run: () => runStressTest('medium'),
  }));

  const legendIconSize = isMobile ? 10 : 14;

  return (
    <section className="performance-metrics" id="performance-metrics">
      <h2>Performance Dashboard</h2>
      <div className="load-test-buttons">
        <button onClick={() => runStressTest('low')} disabled={isTesting}>Low Load (50 users)</button>
        <button onClick={() => runStressTest('medium')} disabled={isTesting}>Medium Load (200 users)</button>
        <button onClick={() => runStressTest('high')} disabled={isTesting}>High Load (1000 users)</button>
      </div>
      <LineChart width={isMobile ? 300 : 600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="time" stroke="#00ff00" />
        <YAxis stroke="#00ff00" />
        <Tooltip
          contentStyle={{ background: '#1a1a1a', border: '1px solid #00ff00', color: '#00ff00' }}
          labelStyle={{ color: '#ffcc00' }}
        />
        <Legend
          iconSize={legendIconSize}
          iconType="line"
          wrapperStyle={{ color: '#ff4500', fontSize: isMobile ? '0.8rem' : '1rem' }}
        />
        <Line
          type="monotone"
          dataKey="responseTime"
          stroke="#ff4500"
          strokeWidth={2}
          dot={{ r: 4, fill: '#ff4500' }}
          activeDot={{ r: 6, fill: '#ff4500' }}
          legendType="line"
        />
      </LineChart>
    </section>
  );
};

// Skills Section as Resource Monitor
const SkillsSection = () => {
  const skills = [
    { name: "JMeter", icon: yourIcon, level: 90 },
    { name: "LoadRunner", icon: yourIcon2, level: 85 },
    { name: "Selenium", icon: yourIcon3, level: 80 },
    { name: "AppDynamics", icon: yourIcon4, level: 90 },
    { name: "Grafana", icon: yourIcon5, level: 85 },
  ];

  return (
    <div className="skills-section" id="skills">
      <h2>Resource Monitor</h2>
      <div className="skills-container">
        {skills.map((skill, idx) => (
          <div key={idx} className="skill-item">
            <img src={skill.icon} alt={skill.name} loading="lazy" />
            <p>{skill.name}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Section as Ping Command
const ContactSection = () => (
  <footer className="contact terminal" id="contact">
    <h2>$ ping John David</h2>
    <p>Reply from john12david05@gmail.com: status=active</p>
    <p>
      LinkedIn: <a href="https://www.linkedin.com/in/john-david-8a7237222" target="_blank" rel="noopener noreferrer">
        john-david [64 bytes]
      </a>
    </p>
  </footer>
);

// Main App Component
const App = () => {
  const stressTestRef = React.useRef();
  const [theme, setTheme] = React.useState('dark');

  const handleCommand = (command) => {
    switch (command) {
      case 'run test':
      case 'stress':
        if (stressTestRef.current) stressTestRef.current.run();
        break;
      case 'show skills':
      case 'monitor resources':
        scrollToSection('skills');
        break;
      case 'show projects':
      case 'analyze bottlenecks':
        scrollToSection('projects');
        break;
      case 'show about':
        scrollToSection('about');
        break;
      case 'show contact':
        scrollToSection('contact');
        break;
      case 'reboot':
        window.location.reload();
        break;
      default:
        console.log(`Unknown command: ${command}`);
    }
  };

  const performanceMetrics = [
    {
      title: 'Before Optimization (Banking App)',
      responseTime: 500,
      throughput: 100,
      errorRate: 10,
      load: 50,
    },
    {
      title: 'After Optimization (Banking App)',
      responseTime: 150,
      throughput: 300,
      errorRate: 2,
      load: 200,
    },
  ];

  return (
    <div className={`app ${theme}`}>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <Header />
      <TerminalInput onCommand={handleCommand} />
      <HeroSection />
      <AboutSection />
      <section className="projects-experience-wrapper">
        <ProjectsSection />
        <ExperienceSection />
      </section>
      <section className="performance-metrics" id="performance-dashboard">
        <PerformanceDashboard runStressTestRef={stressTestRef} />
        <h2>Performance Summary</h2>
        <PerformanceMetrics metrics={performanceMetrics} />
      </section>
      <SkillsSection />
      <ContactSection />
    </div>
  );
};

export default App;