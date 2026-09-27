import { useState, useEffect } from "react";
import "./ResultsPage.css";
import { assets } from "../../assets/assets.js";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { incidentTypes } from "../../data/incidentTypes.js";
import { incidentQuestions } from "../../data/incidentQuestions.js";

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const storedSession = JSON.parse(localStorage.getItem("nextStepSession"));
  const activeData = state?.plan ? state : storedSession;

  const plan = state?.plan;
  const incidentType = state?.incidentType;
  const answers = state?.answers || {};

  // Load checklist progress from localStorage
  const [checkedItems, setCheckedItems] = useState(() => {
    const savedChecks = localStorage.getItem("nextStepChecks");
    return savedChecks ? JSON.parse(savedChecks) : {};
  });
  // Save the core session data to localStorage whenever a new plan is passed in
  useEffect(() => {
    if (state?.plan) {
      localStorage.setItem("nextStepSession", JSON.stringify(state));
    }
  }, [state]);

  // Save checklist progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("nextStepChecks", JSON.stringify(checkedItems));
  }, [checkedItems]);

  // Find the specific questions and title for the current incident
  const questions = incidentQuestions[incidentType] || [];
  const selectedIncident = incidentTypes?.find(
    (incident) => incident.id === incidentType,
  );
  const incidentTitle = selectedIncident?.title || incidentType;

  const handleToggleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Clear everything when the user clicks "Start over"
  const handleStartOver = () => {
    localStorage.removeItem("nextStepSession");
    localStorage.removeItem("nextStepChecks");
    localStorage.removeItem("nextStepAnswers");
    localStorage.removeItem("nextStepIndex");
    localStorage.removeItem("nextStepPrivacy");
    localStorage.removeItem("nextStepIncident");
    localStorage.removeItem("nextStepNotes");
    navigate("/");
  };

  if (!plan) {
    return (
      <main>
        <p>No plan is available yet.</p>
        <Link to="/">Start a new plan</Link>
      </main>
    );
  }
  return (
    <main className="ResultsPage">
      <div className="NavBar">
        <h1 className="app-logo">
          <span className="logo-nextstep">NextStep</span>{" "}
          <span className="logo-road">Road</span>
        </h1>
        <h3>Clear next steps for unexpected transportation issues</h3>
      </div>
      <div className="plan">
        <div className="plan-top">
          <h1>{plan.title || "Your next-step plan"}</h1>
          <span className="warning-wrapper">
            <span className="warning-icon" aria-hidden="true">
              <img src={assets.caution_icon} alt="" />
            </span>
            <span className="warning">
              {plan.safetyNotice && <p role="alert">{plan.safetyNotice}</p>}
            </span>
          </span>
        </div>
        <div className="plan-content">
          <section className="checklist-section">
            <h2>Your next steps</h2>

            {Array.isArray(plan.checklist) && plan.checklist.length > 0 ? (
              <ul className="interactive-checklist">
                {plan.checklist.map((item, index) => {
                  const isChecked = checkedItems[index];
                  return (
                    <li
                      key={item.id || index}
                      className={`checklist-item ${isChecked ? "checked" : ""}`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={!!isChecked}
                          onChange={() => handleToggleCheck(index)}
                        />
                        <span className="checklist-text">
                          <strong>{item.category || "Next step"}:</strong>{" "}
                          {item.task}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No checklist steps were returned.</p>
            )}

            {plan.disclaimer && <p>{plan.disclaimer}</p>}
          </section>
          {/* Incident Snapshot Section */}
          <aside className="incident-snapshot">
            <div className="snapshot-header">
              <h2>Incident snapshot</h2>
              <img
                src={selectedIncident.icon}
                className="snapshot-icon"
                alt=""
              />
            </div>
            <div className="snapshot-body">
              <div className="snapshot-item">
                <strong>Incident type:</strong>
                <div>{incidentTitle}</div>
              </div>

              {questions.map((question) => {
                const answerValue = answers[question.id];
                if (!answerValue) return null; // Skip if unanswered

                // Match the answer value to the readable label
                const selectedOption = question.options.find(
                  (opt) => opt.value === answerValue,
                );

                return (
                  <div className="snapshot-item" key={question.id}>
                    <strong>{question.label}:</strong>
                    <div>
                      {selectedOption ? selectedOption.label : answerValue}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
      <section className="results-bottom" aria-label="Plan progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-label="Plan setup progress"
          aria-valuemin="1"
          aria-valuemax="3"
          aria-valuenow="1"
        >
          <span className="progress-segment"></span>
          <span className="progress-segment"></span>
          <span className="progress-segment progress-segment--active"></span>
        </div>

        <div className="plan-navigation">
          <button
            type="button"
            className="start-over-button"
            onClick={handleStartOver}
          >
            Start over
          </button>

          <p className="step-count">Step 3 of 3</p>
        </div>
      </section>
    </main>
  );
}
