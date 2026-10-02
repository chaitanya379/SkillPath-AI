import { useEffect, useState } from "react";
import "./App.css";
import { roleRequirements as rawRoles, careers as rawCareers } from "./data/roles";

// Fallback safety if roles file has import mismatch
const roleRequirements = rawRoles || {};
const careers = (rawCareers && rawCareers.length > 0) 
  ? rawCareers 
  : Object.keys(roleRequirements).length > 0 
  ? Object.keys(roleRequirements) 
  : ["ML Engineer", "Data Scientist", "Full Stack Developer"];

/* =========================================================
   LEARNING CONTENT & SYLLABUS
========================================================= */

const learningContent = {
  Python: {
    title: "Strengthen Python",
    description: "Practice Python fundamentals, functions, OOP, libraries and problem solving.",
  },
  SQL: {
    title: "Improve SQL",
    description: "Learn queries, joins, aggregation, subqueries and database concepts.",
  },
  "Machine Learning": {
    title: "Learn Machine Learning",
    description: "Study supervised and unsupervised learning and build ML models.",
  },
  Pandas: {
    title: "Practice Pandas",
    description: "Learn data cleaning, preprocessing and exploratory data analysis.",
  },
  "Scikit-learn": {
    title: "Practice Scikit-learn",
    description: "Train, evaluate and improve machine learning models.",
  },
  "Deep Learning": {
    title: "Learn Deep Learning",
    description: "Understand neural networks and build basic deep learning models.",
  },
  Docker: {
    title: "Learn Docker",
    description: "Understand containers and package applications using Docker.",
  },
  "Model Deployment": {
    title: "Learn Model Deployment",
    description: "Deploy ML models using APIs and cloud deployment concepts.",
  },
  NLP: {
    title: "Learn NLP",
    description: "Learn text preprocessing, embeddings and NLP applications.",
  },
  PyTorch: {
    title: "Practice PyTorch",
    description: "Build and train neural networks using PyTorch.",
  },
  TensorFlow: {
    title: "Learn TensorFlow",
    description: "Build and train neural networks using TensorFlow and Keras.",
  },
  Statistics: {
    title: "Revise Statistics",
    description: "Practice probability, distributions and statistical concepts.",
  },
  Mathematics: {
    title: "Improve Mathematics",
    description: "Practice linear algebra, probability, calculus and mathematical reasoning.",
  },
  "Data Visualization": {
    title: "Improve Data Visualization",
    description: "Create meaningful charts, dashboards and data stories.",
  },
  Excel: {
    title: "Improve Excel",
    description: "Practice formulas, pivot tables, charts and data analysis.",
  },
  "Power BI": {
    title: "Learn Power BI",
    description: "Create dashboards, reports and interactive business analytics.",
  },
  Tableau: {
    title: "Learn Tableau",
    description: "Build interactive dashboards and visual analytics.",
  },
  JavaScript: {
    title: "Strengthen JavaScript",
    description: "Practice modern JavaScript, ES6 and asynchronous programming.",
  },
  Java: {
    title: "Strengthen Java",
    description: "Practice Java fundamentals, OOP, collections and problem solving.",
  },
  "Data Structures": {
    title: "Practice DSA",
    description: "Practice arrays, strings, stacks, queues, trees and algorithms.",
  },
  Algorithms: {
    title: "Practice Algorithms",
    description: "Learn searching, sorting, recursion, dynamic programming and graphs.",
  },
  Git: {
    title: "Learn Git & GitHub",
    description: "Practice repositories, commits, branches and GitHub workflows.",
  },
  APIs: {
    title: "Learn APIs",
    description: "Understand REST APIs, JSON and application communication.",
  },
  Testing: {
    title: "Learn Software Testing",
    description: "Practice testing, debugging and quality assurance.",
  },
  HTML: {
    title: "Learn HTML",
    description: "Build semantic and accessible web pages using HTML.",
  },
  CSS: {
    title: "Improve CSS",
    description: "Practice responsive layouts, flexbox, grid and modern CSS.",
  },
  React: {
    title: "Learn React",
    description: "Build component-based applications using React.",
  },
  NodeJS: {
    title: "Learn Node.js",
    description: "Build backend applications and APIs using Node.js.",
  },
  C: {
    title: "Strengthen C Programming",
    description: "Practice C programming, pointers, arrays, functions and memory.",
  },
  Cpp: {
    title: "Learn C++",
    description: "Practice C++, OOP, STL and problem solving.",
  },
  Cloud: {
    title: "Learn Cloud Computing",
    description: "Understand cloud services, deployment and scalable applications.",
  },
  Linux: {
    title: "Learn Linux",
    description: "Practice Linux commands, processes, permissions and administration.",
  },
  Networking: {
    title: "Learn Networking",
    description: "Understand TCP/IP, HTTP, DNS, routing and network security.",
  },
  Kubernetes: {
    title: "Learn Kubernetes",
    description: "Understand containers, pods, deployments and orchestration.",
  },
  "CI/CD": {
    title: "Learn CI/CD",
    description: "Understand automated build, testing and deployment pipelines.",
  },
  Cybersecurity: {
    title: "Learn Cybersecurity",
    description: "Understand security fundamentals, threats and defensive techniques.",
  },
  Security: {
    title: "Improve Security Skills",
    description: "Study authentication, authorization, vulnerabilities and security practices.",
  },
  SIEM: {
    title: "Learn SIEM",
    description: "Understand security monitoring, logs and incident detection.",
  },
  Selenium: {
    title: "Learn Selenium",
    description: "Automate browser testing using Selenium.",
  },
  Automation: {
    title: "Learn Automation",
    description: "Build automated workflows and testing processes.",
  },
  Figma: {
    title: "Learn Figma",
    description: "Design interfaces, prototypes and reusable UI components.",
  },
  Communication: {
    title: "Improve Communication",
    description: "Practice professional communication, presentations and interviews.",
  },
};

/* =========================================================
   PRACTICE TEST QUESTIONS
========================================================= */

const practiceQuestions = {
  Python: [
    {
      q: "Which of the following data types is mutable in Python?",
      options: ["Tuple", "List", "String", "Integer"],
      correct: 1,
    },
    {
      q: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "function"],
      correct: 2,
    },
  ],
  SQL: [
    {
      q: "Which clause is used to eliminate duplicate rows from a query result?",
      options: ["UNIQUE", "DISTINCT", "DIFFERENT", "FILTER"],
      correct: 1,
    },
    {
      q: "Which clause is used to filter records after aggregation with GROUP BY?",
      options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
      correct: 1,
    },
  ],
  "Machine Learning": [
    {
      q: "Which of the following is a supervised learning algorithm?",
      options: ["K-Means", "Linear Regression", "PCA", "Apriori"],
      correct: 1,
    },
    {
      q: "Which technique helps prevent a model from overfitting to training data?",
      options: ["Regularization", "Underfitting", "Removing test data", "Zero epochs"],
      correct: 0,
    },
  ],
  Docker: [
    {
      q: "What is the primary file used to define steps for building a Docker image?",
      options: ["Dockerfile", "DockerCompose", "DockerHub", "Containerfile.yml"],
      correct: 0,
    },
    {
      q: "Which command runs a container from an image?",
      options: ["docker start", "docker run", "docker execute", "docker build"],
      correct: 1,
    },
  ],
};

/* =========================================================
   DEMO OPPORTUNITIES
========================================================= */

const demoOpportunities = [
  {
    company: "TechNova",
    role: "Machine Learning Intern",
    location: "Remote",
    type: "Internship",
    match: 91,
    deadline: "15 Oct 2026",
    skills: ["Python", "Machine Learning", "SQL"],
    applyLink: "#",
  },
  {
    company: "DataSphere",
    role: "AI/ML Intern",
    location: "Hybrid",
    type: "Internship",
    match: 86,
    deadline: "20 Oct 2026",
    skills: ["Python", "Deep Learning", "PyTorch"],
    applyLink: "#",
  },
  {
    company: "Innovate Labs",
    role: "Junior ML Engineer",
    location: "On-site",
    type: "Job",
    match: 79,
    deadline: "25 Oct 2026",
    skills: ["Python", "Docker", "Model Deployment"],
    applyLink: "#",
  },
  {
    company: "FutureAI",
    role: "Data Science Intern",
    location: "Remote",
    type: "Internship",
    match: 76,
    deadline: "30 Oct 2026",
    skills: ["Python", "Pandas", "Statistics"],
    applyLink: "#",
  },
];

/* =========================================================
   CORE LOGIC & RESUME PARSER
========================================================= */

async function extractKeywordsFromFile(file, career) {
  const requirements = roleRequirements[career] || {};
  const requiredSkillNames = Object.keys(requirements);

  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result || "").toString().toLowerCase();
        const detectedScores = {};

        requiredSkillNames.forEach((skill) => {
          const normalizedSkill = skill.toLowerCase();
          if (text.includes(normalizedSkill)) {
            detectedScores[skill] = Math.max((requirements[skill] || 70) - 10, 65);
          } else {
            detectedScores[skill] = 0;
          }
        });
        resolve(detectedScores);
      };

      reader.onerror = () => resolve({});
      reader.readAsText(file);
    } catch {
      resolve({});
    }
  });
}

function calculateSkillAnalysis(career, extractedSkills = {}) {
  const requirements = roleRequirements[career] || {
    Python: 80,
    SQL: 70,
    "Machine Learning": 75,
  };

  const skills = Object.entries(requirements).map(([name, required]) => {
    const current = Number(extractedSkills[name] || 0);
    const gap = Math.max(required - current, 0);

    let priority = "Ready";
    if (gap >= 30) priority = "High";
    else if (gap >= 15) priority = "Medium";
    else if (gap > 0) priority = "Low";

    return {
      name,
      required,
      score: current,
      gap,
      priority,
      available: current >= required,
    };
  });

  const totalRequired = skills.reduce((sum, skill) => sum + skill.required, 0);
  const totalCurrent = skills.reduce(
    (sum, skill) => sum + Math.min(skill.score, skill.required),
    0
  );

  const readiness = totalRequired
    ? Math.round((totalCurrent / totalRequired) * 100)
    : 0;

  const gaps = skills
    .filter((skill) => skill.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  return { skills, gaps, readiness };
}

function createDailyPlan(gaps = [], studyTime = "2 hours/day") {
  const hours =
    studyTime === "1 hour/day"
      ? 1
      : studyTime === "2 hours/day"
      ? 2
      : studyTime === "3 hours/day"
      ? 3
      : 4;

  const daysPerSkill = hours >= 3 ? 2 : 3;
  const plan = [];
  let day = 1;

  gaps.forEach((skill) => {
    for (let i = 0; i < daysPerSkill; i++) {
      const content = learningContent[skill.name];
      plan.push({
        id: `task-${day}`,
        day,
        skill: skill.name,
        title: content?.title || `Learn ${skill.name}`,
        description:
          content?.description ||
          `Practice and improve your ${skill.name} skills.`,
        hours,
        status: day === 1 ? "Today" : "Upcoming",
        completed: false,
      });
      day++;
    }
  });

  plan.push({
    id: `task-${day}`,
    day,
    skill: "Portfolio",
    title: "Build a Career Project",
    description: "Build one project using the skills learned in your roadmap.",
    hours,
    status: "Upcoming",
    completed: false,
  });

  day++;

  plan.push({
    id: `task-${day}`,
    day,
    skill: "Interview",
    title: "Prepare for Interviews",
    description:
      "Practice technical questions, resume explanation and HR questions.",
    hours,
    status: "Upcoming",
    completed: false,
  });

  return plan;
}

/* =========================================================
   UI TOAST ALERT
========================================================= */

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "rgba(15, 23, 42, 0.95)",
        border: "1px solid rgba(96, 165, 250, 0.4)",
        color: "#f8fafc",
        padding: "14px 20px",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        zIndex: 9999,
        fontSize: "14px",
      }}
      className="slide-up"
    >
      <span>✦</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: 0,
          color: "#94a3b8",
          cursor: "pointer",
          marginLeft: "8px",
        }}
      >
        ✕
      </button>
    </div>
  );
}

/* =========================================================
   PRACTICE ASSESSMENT MODAL (ENGLISH)
========================================================= */

function PracticeModal({ skill, onClose, onPassTest }) {
  const questions = practiceQuestions[skill] || [
    {
      q: `What is the core foundational concept of ${skill}?`,
      options: ["Syntax & Structure", "Compilation", "Data Flow", "All of the above"],
      correct: 3,
    },
    {
      q: `Which application area primarily utilizes ${skill}?`,
      options: ["Problem Solving", "System Architecture", "Application Development", "All of the above"],
      correct: 3,
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    let updatedScore = score;
    if (selectedOpt === questions[currentQ].correct) {
      updatedScore += 1;
      setScore(updatedScore);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
    } else {
      setFinished(true);
      if (updatedScore >= Math.ceil(questions.length / 2)) {
        onPassTest();
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2, 6, 23, 0.85)",
        backdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        className="form-card slide-up"
        style={{ maxWidth: "520px", width: "100%", padding: "28px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <span className="badge">🎯 {skill} Practice Assessment</span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: 0,
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>

        {!finished ? (
          <div>
            <small style={{ color: "#67e8f9", fontWeight: "700" }}>
              Question {currentQ + 1} of {questions.length}
            </small>
            <h3 style={{ margin: "12px 0 18px", fontSize: "17px" }}>
              {questions[currentQ].q}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {questions[currentQ].options.map((opt, idx) => (
                <button
                  key={opt}
                  type="button"
                  className={selectedOpt === idx ? "primary-button" : "button-outline"}
                  style={{ textAlign: "left", justifyContent: "flex-start", padding: "12px 16px" }}
                  onClick={() => setSelectedOpt(idx)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
              <button
                className="primary-button"
                disabled={selectedOpt === null}
                onClick={handleNext}
              >
                {currentQ + 1 === questions.length ? "Finish Assessment →" : "Next Question →"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>Assessment Completed! 🎉</h2>
            <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
              Your Score: <strong>{score} / {questions.length}</strong>
            </p>
            {score >= Math.ceil(questions.length / 2) ? (
              <span className="badge" style={{ borderColor: "#22d3ee", color: "#22d3ee" }}>
                ✓ Skill Verified & Completed
              </span>
            ) : (
              <span className="badge" style={{ borderColor: "#f87171", color: "#f87171" }}>
                Revise concepts and retake the test
              </span>
            )}
            <div style={{ marginTop: "25px" }}>
              <button className="primary-button" onClick={onClose} style={{ width: "100%" }}>
                Close Practice Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function Header({ onHome, onStart, user, onLogin, onLogout, showToast }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <button className="brand" onClick={onHome}>
          <span className="brand-icon">✦</span>
          <span className="brand-name">
            SkillPath <span className="brand-ai">AI</span>
          </span>
        </button>

        <nav className="nav">
          <button onClick={onHome}>Home</button>
          <button
            onClick={() =>
              showToast("SkillPath AI maps your skills to industry job standards.")
            }
          >
            How It Works
          </button>
          <button onClick={onStart}>Start Analysis</button>
        </nav>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", opacity: 0.8 }}>👋 {user.name}</span>
            <button className="button-outline" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="primary-button" onClick={onLogin}>
            Login / Sign Up →
          </button>
        )}
      </div>
    </header>
  );
}

function Landing({ onStart }) {
  return (
    <section className="hero">
      <div className="hero-orb orb-one"></div>
      <div className="hero-orb orb-two"></div>
      <div className="container hero-content fade-in">
        <div className="badge">✦ AI-POWERED CAREER READINESS</div>
        <h1>
          Know Your Gap.
          <br />
          <span className="gradient-text">Build Your Career.</span>
        </h1>
        <p>
          Upload your resume, choose your target career, discover your missing
          skills, get a personalized daily learning plan, practice assessments,
          and find verified opportunities.
        </p>

        <div className="hero-actions">
          <button className="primary-button hero-main-button" onClick={onStart}>
            Start Career Analysis →
          </button>
          <button className="secondary-button" onClick={onStart}>
            Explore SkillPath AI
          </button>
        </div>

        <div className="hero-features">
          <div>
            <span>📄</span> Resume Analysis
          </div>
          <div>
            <span>🎯</span> Skill Gap
          </div>
          <div>
            <span>📚</span> Daily Roadmap
          </div>
          <div>
            <span>💼</span> Opportunities
          </div>
        </div>
      </div>
    </section>
  );
}

function AuthPage({ onLogin, showToast }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      showToast("Please enter email and password.");
      return;
    }
    if (mode === "signup" && !name) {
      showToast("Please enter your name.");
      return;
    }

    const user = {
      name: name || email.split("@")[0],
      email,
    };

    localStorage.setItem("skillpath_user", JSON.stringify(user));
    onLogin(user);
  };

  return (
    <section className="page">
      <div className="container form-page">
        <div className="form-header slide-up" style={{ textAlign: "center" }}>
          <div className="badge">✦ SKILLPATH AI</div>
          <h1>
            {mode === "login" ? "Welcome back." : "Create your account."}
            <br />
            <span className="gradient-text">Build your career with AI.</span>
          </h1>
          <p>
            Track your skills, learning roadmap, practice progress and career
            opportunities in one place.
          </p>
        </div>

        <div
          className="form-card slide-up"
          style={{ maxWidth: "520px", margin: "0 auto" }}
        >
          <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
            <button
              type="button"
              className={mode === "login" ? "primary-button" : "button-outline"}
              style={{ flex: 1 }}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "signup" ? "primary-button" : "button-outline"}
              style={{ flex: 1 }}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={submit}>
            {mode === "signup" && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-select"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-select"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-select"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="info-box">
              <span>🔐</span>
              <p>
                Your SkillPath profile will store your career goal, skill
                analysis, learning roadmap and progress.
              </p>
            </div>

            <button type="submit" className="primary-button form-submit">
              {mode === "login" ? "Login to SkillPath AI →" : "Create SkillPath Account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "700",
              }}
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

function AnalysisForm({ onAnalyze, showToast }) {
  const [resume, setResume] = useState(null);
  const [mode, setMode] = useState("resume");
  const [career, setCareer] = useState(careers[0] || "ML Engineer");
  const [studyTime, setStudyTime] = useState("2 hours/day");
  const [scanning, setScanning] = useState(false);

  const submit = async () => {
    if (mode === "resume" && !resume) {
      showToast("Please upload your resume first.");
      return;
    }

    setScanning(true);
    let extractedScores = {};

    if (mode === "resume" && resume) {
      extractedScores = await extractKeywordsFromFile(resume, career);
    }

    setScanning(false);

    onAnalyze({
      resume,
      career,
      studyTime,
      mode,
      extractedScores,
    });
  };

  return (
    <section className="page">
      <div className="container form-page">
        <div className="form-header slide-up">
          <div className="badge">CAREER ANALYSIS</div>
          <h1>
            Build your
            <br />
            <span className="gradient-text">personalized career path.</span>
          </h1>
          <p>Freshers can start directly by selecting their target career.</p>
        </div>

        <div className="form-card slide-up">
          <div className="form-group">
            <label>1. How do you want to start?</label>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "10px" }}>
              <button
                type="button"
                className={mode === "resume" ? "primary-button" : "button-outline"}
                onClick={() => setMode("resume")}
              >
                📄 Upload Resume
              </button>
              <button
                type="button"
                className={mode === "fresher" ? "primary-button" : "button-outline"}
                onClick={() => setMode("fresher")}
              >
                🎓 Fresher / No Resume
              </button>
            </div>
          </div>

          {mode === "resume" && (
            <div className="form-group">
              <label>2. Upload your resume</label>
              <div className="resume-upload">
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                />
                <label htmlFor="resume" className="resume-upload-label">
                  <div className="resume-icon">📄</div>
                  <strong>
                    {resume ? resume.name : "Click here to upload your resume"}
                  </strong>
                  <span>PDF, DOC, DOCX or TXT</span>
                  {resume && <small>✓ Resume selected successfully</small>}
                </label>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="career">
              {mode === "resume" ? "3" : "2"}. What career are you targeting?
            </label>
            <select
              id="career"
              className="form-select"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            >
              {careers.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="studyTime">
              {mode === "resume" ? "4" : "3"}. How much time can you study every day?
            </label>
            <select
              id="studyTime"
              className="form-select"
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
            >
              <option>1 hour/day</option>
              <option>2 hours/day</option>
              <option>3 hours/day</option>
              <option>4+ hours/day</option>
            </select>
          </div>

          <button
            className="primary-button form-submit"
            onClick={submit}
            disabled={scanning}
          >
            {scanning ? "Scanning Resume..." : "Analyze My Career →"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Loading({ onComplete }) {
  const [step, setStep] = useState(0);

  const steps = [
    "Reading career profile",
    "Extracting skills",
    "Checking target career requirements",
    "Finding skill gaps",
    "Prioritizing missing skills",
    "Building learning plan",
    "Preparing opportunity matches",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) => {
        if (current >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 700);
          return current;
        }
        return current + 1;
      });
    }, 550);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <section className="loading-page">
      <div className="loading-content slide-up">
        <div className="ai-scanner">
          <div className="scanner-core">✦</div>
          <div className="scanner-ring scanner-ring-one"></div>
          <div className="scanner-ring scanner-ring-two"></div>
        </div>
        <h1>
          AI is analyzing your
          <span className="gradient-text"> career profile...</span>
        </h1>
        <div className="analysis-steps">
          {steps.map((item, index) => (
            <div
              key={item}
              className={`analysis-step ${index <= step ? "active" : ""}`}
            >
              <span>{index <= step ? "✓" : "○"}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard({ career, analysis, resumeName, mode, onNext }) {
  const readySkills = (analysis?.skills || []).filter((skill) => skill.available);

  return (
    <section className="page">
      <div className="container">
        <div className="dashboard-header slide-up">
          <div>
            <div className="badge">AI ANALYSIS COMPLETE</div>
            <h1>
              Your Career <span className="gradient-text">Dashboard</span>
            </h1>
            <p>
              Profile: <strong>{mode === "resume" ? resumeName : "Fresher Mode"}</strong>
            </p>
            <p>
              Target career: <strong>{career}</strong>
            </p>
          </div>
          <div className="readiness-box">
            <span>CAREER READINESS</span>
            <strong>{analysis?.readiness || 0}%</strong>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-title">Skills Analysis</div>
            <div className="skills-grid">
              {(analysis?.skills || []).map((skill) => (
                <div className="skill-card" key={skill.name}>
                  <div className="skill-card-top">
                    <span className="skill-card-name">
                      {skill.available ? "✓" : "○"} {skill.name}
                    </span>
                    <span className="skill-score">{skill.score}%</span>
                  </div>
                  <div className="skill-progress">
                    <div
                      className="skill-progress-fill"
                      style={{ width: `${Math.min(skill.score, 100)}%` }}
                    ></div>
                  </div>
                  <small>Required: {skill.required}%</small>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-title">Priority Skill Gaps</div>
            {(analysis?.gaps || []).length > 0 ? (
              <div className="gap-list">
                {analysis.gaps.map((skill) => (
                  <div className="gap-item" key={skill.name}>
                    <div>
                      <span className="gap-name">{skill.name}</span>
                      <small
                        style={{
                          display: "block",
                          opacity: 0.65,
                          marginTop: "4px",
                        }}
                      >
                        Current: {skill.score}% · Required: {skill.required}%
                      </small>
                    </div>
                    <span className="gap-priority">{skill.priority}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>You currently meet all listed skill requirements for this role.</p>
            )}
          </div>
        </div>

        <div className="plan-summary" style={{ marginTop: "24px" }}>
          <div>
            <span>Skills Ready</span>
            <strong>{readySkills.length}</strong>
          </div>
          <div>
            <span>Skill Gaps</span>
            <strong>{(analysis?.gaps || []).length}</strong>
          </div>
          <div>
            <span>High Priority</span>
            <strong>
              {(analysis?.gaps || []).filter((s) => s.priority === "High").length}
            </strong>
          </div>
        </div>

        <div className="center-button">
          <button className="primary-button" onClick={onNext}>
            Show My Learning Plan →
          </button>
        </div>
      </div>
    </section>
  );
}

function Roadmap({ plan = [], studyTime, onToggleTask, onNext, user, showToast }) {
  const totalDays = plan.length;
  const completedCount = plan.filter((p) => p.completed).length;

  const [activeQuizSkill, setActiveQuizSkill] = useState(null);
  const [activeQuizTaskId, setActiveQuizTaskId] = useState(null);

  const handleSendReminder = () => {
    if (!user || !user.email) {
      showToast("Please login first to activate daily email reminders.");
      return;
    }
    showToast(`✓ Daily task reminder dispatched to ${user.email}!`);
  };

  return (
    <section className="page">
      <div className="container">
        <div className="roadmap-header slide-up">
          <div className="badge">PERSONALIZED LEARNING PLAN</div>
          <h1>
            Your daily <span className="gradient-text">career roadmap.</span>
          </h1>
          <p>
            Study time: <strong>{studyTime}</strong> · Estimated:{" "}
            <strong>{totalDays} days</strong>
          </p>
        </div>

        <div className="plan-summary">
          <div>
            <span>Daily Time</span>
            <strong>{studyTime}</strong>
          </div>
          <div>
            <span>Completed Tasks</span>
            <strong>
              {completedCount} / {totalDays}
            </strong>
          </div>
          <div>
            <span>Focus Area</span>
            <strong>Skill Gaps</strong>
          </div>
        </div>

        <div className="daily-plan">
          {plan.map((item) => (
            <div
              className={`daily-card ${item.completed ? "today" : ""}`}
              key={item.id}
            >
              <div className="day-number">
                <span>DAY</span>
                <strong>{item.day}</strong>
              </div>
              <div className="daily-content">
                <div className="daily-top">
                  <span className="roadmap-week">{item.skill}</span>
                  <span className="study-time">⏱ {item.hours} hr/day</span>
                </div>
                <h3 style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                  {item.title}
                </h3>
                <p>{item.description}</p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "14px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="button-outline"
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
                      setActiveQuizSkill(item.skill);
                      setActiveQuizTaskId(item.id);
                    }}
                  >
                    📝 Take Practice Test
                  </button>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "#67e8f9",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => onToggleTask(item.id)}
                    />
                    Mark as Done
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeQuizSkill && (
          <PracticeModal
            skill={activeQuizSkill}
            onClose={() => {
              setActiveQuizSkill(null);
              setActiveQuizTaskId(null);
            }}
            onPassTest={() => {
              if (activeQuizTaskId) {
                onToggleTask(activeQuizTaskId);
              }
            }}
          />
        )}

        <div className="notification-card">
          <div className="notification-icon">🔔</div>
          <div style={{ flex: 1 }}>
            <h3>Daily Learning Reminder</h3>
            <p>
              Receive your day-by-day learning tasks, milestone tests, and
              application deadlines directly in your inbox.
            </p>
            <button
              className="primary-button"
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                fontSize: "13px",
              }}
              onClick={handleSendReminder}
            >
              Send Today's Task to {user?.email || "My Email"} ✉
            </button>
          </div>
        </div>

        <div className="center-button" style={{ marginTop: "30px" }}>
          <button className="primary-button" onClick={onNext}>
            Find Matching Jobs & Internships →
          </button>
        </div>
      </div>
    </section>
  );
}

function Opportunities({ onSelect }) {
  return (
    <section className="page">
      <div className="container">
        <div className="opportunities-header slide-up">
          <div>
            <div className="badge">CAREER OPPORTUNITIES</div>
            <h1>
              Find your next <span className="gradient-text">opportunity.</span>
            </h1>
          </div>
        </div>

        <div className="opportunity-grid">
          {demoOpportunities.map((item) => (
            <div
              className="opportunity-card slide-up"
              key={`${item.company}-${item.role}`}
            >
              <div className="opportunity-top">
                <div className="company-logo">{item.company.charAt(0)}</div>
                <span className="match-badge">{item.match}% Match</span>
              </div>
              <h3>{item.role}</h3>
              <div className="company-name">{item.company}</div>
              <div className="opportunity-meta">
                <span className="meta-tag">📍 {item.location}</span>
                <span className="meta-tag">{item.type}</span>
              </div>
              <div className="opportunity-skills">
                {item.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <div className="opportunity-bottom">
                <span className="deadline">⏰ {item.deadline}</span>
                <button className="button-outline" onClick={() => onSelect(item)}>
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpportunityDetail({ item, onBack, showToast }) {
  return (
    <section className="page">
      <div className="container">
        <button className="back-link" onClick={onBack}>
          ← Back to opportunities
        </button>
        <div className="detail-card slide-up">
          <div className="detail-top">
            <div className="detail-logo">{item.company.charAt(0)}</div>
            <div>
              <h1>{item.role}</h1>
              <p>{item.company}</p>
            </div>
          </div>
          <div className="detail-grid">
            <div>
              <span>Location</span>
              <strong>{item.location}</strong>
            </div>
            <div>
              <span>Type</span>
              <strong>{item.type}</strong>
            </div>
            <div>
              <span>Match</span>
              <strong>{item.match}%</strong>
            </div>
            <div>
              <span>Deadline</span>
              <strong>{item.deadline}</strong>
            </div>
          </div>
          <div className="detail-section">
            <h3>Required Skills</h3>
            <div className="requirements">
              {item.skills.map((skill) => (
                <span className="requirement" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-actions">
            <button
              className="primary-button"
              onClick={() =>
                showToast(`Redirecting to official job portal for ${item.company}...`)
              }
            >
              Apply / View Source →
            </button>
            <button className="button-outline" onClick={onBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          ✦ SkillPath <span className="brand-ai">AI</span>
        </div>
        <p>Know the gap. Plan your time. Catch the right opportunity.</p>
        <p>© 2026 Neural Navigators</p>
      </div>
    </footer>
  );
}

/* =========================================================
   MAIN APP ROUTER
========================================================= */

export default function App() {
  const [page, setPage] = useState("home");
  const [toastMessage, setToastMessage] = useState("");

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("skillpath_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [career, setCareer] = useState(careers[0] || "ML Engineer");
  const [studyTime, setStudyTime] = useState("2 hours/day");
  const [resumeName, setResumeName] = useState("");
  const [mode, setMode] = useState("resume");
  const [analysis, setAnalysis] = useState({
    skills: [],
    gaps: [],
    readiness: 0,
  });
  const [plan, setPlan] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const showToast = (msg) => setToastMessage(msg);

  const go = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    go("form");
  };

  const handleLogout = () => {
    localStorage.removeItem("skillpath_user");
    setUser(null);
    go("home");
  };

  const handleAnalyze = (data) => {
    let userSkills = data.extractedScores || {};

    if (data.mode === "fresher") {
      userSkills = {};
    }

    const result = calculateSkillAnalysis(data.career, userSkills);
    const dailyPlan = createDailyPlan(result.gaps, data.studyTime);

    setCareer(data.career);
    setStudyTime(data.studyTime);
    setMode(data.mode);
    setResumeName(data.resume?.name || "No Resume");
    setAnalysis(result);
    setPlan(dailyPlan);

    go("loading");
  };

  const toggleTask = (taskId) => {
    setPlan((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="app-shell">
      <Header
        onHome={() => go("home")}
        onStart={() => (user ? go("form") : go("auth"))}
        user={user}
        onLogin={() => go("auth")}
        onLogout={handleLogout}
        showToast={showToast}
      />

      {page === "auth" && <AuthPage onLogin={handleLogin} showToast={showToast} />}

      {page === "home" && (
        <>
          <Landing onStart={() => (user ? go("form") : go("auth"))} />
          <Footer />
        </>
      )}

      {page === "form" && (
        <AnalysisForm onAnalyze={handleAnalyze} showToast={showToast} />
      )}

      {page === "loading" && <Loading onComplete={() => go("dashboard")} />}

      {page === "dashboard" && (
        <Dashboard
          career={career}
          analysis={analysis}
          resumeName={resumeName}
          mode={mode}
          onNext={() => go("roadmap")}
        />
      )}

      {page === "roadmap" && (
        <Roadmap
          plan={plan}
          studyTime={studyTime}
          onToggleTask={toggleTask}
          onNext={() => go("opportunities")}
          user={user}
          showToast={showToast}
        />
      )}

      {page === "opportunities" && (
        <Opportunities
          onSelect={(item) => {
            setSelectedOpportunity(item);
            go("detail");
          }}
        />
      )}

      {page === "detail" && selectedOpportunity && (
        <OpportunityDetail
          item={selectedOpportunity}
          onBack={() => go("opportunities")}
          showToast={showToast}
        />
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}