import { useState } from "react";
import "./QuestionsPage.css";
import { incidentQuestions } from "../../data/incidentQuestions.js";
import { incidentTypes } from "../../data/incidentTypes.js";
import { assets } from "../../assets/assets.js";

export default function QuestionsPage({ incidentType }) {
  const questions = incidentQuestions[incidentType] ?? [];

  const selectedIncident = incidentTypes.find(
    (incident) => incident.id === incidentType,
  );
  const [privacyConfirmed, setPrivacyConfirmed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showDangerWarning, setShowDangerWarning] = useState(false);

  const allQuestionsAnswered =
    questions.length > 0 &&
    questions.every((question) => answers[question.id] !== undefined);

  const canSubmit = allQuestionsAnswered && privacyConfirmed;

  function handleSelect(questionId, value) {
    const updatedAnswers = {
      ...answers,
      [questionId]: value,
    };

    setAnswers(updatedAnswers);

    if (questionId === "immediateDanger" && value === "yes") {
      setShowDangerWarning(true);
    }

    const nextUnansweredIndex = questions.findIndex(
      (question) => updatedAnswers[question.id] === undefined,
    );

    setActiveQuestionIndex(
      nextUnansweredIndex === -1 ? questions.length : nextUnansweredIndex,
    );
  }

  function handleStartOver() {
    setAnswers({});
    setActiveQuestionIndex(0);
    setShowDangerWarning(false);
    setPrivacyConfirmed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="QuestionsPage">
      {/* =============================================
                            NAV BAR
        ============================================= */}
      <div className="NavBar">
        <h1 className="app-logo">
          <span className="logo-nextstep">NextStep</span>{" "}
          <span className="logo-road">Road</span>
        </h1>
        <h3>Clear next steps for unexpected transportation issues</h3>
      </div>
      {/* =============================================
                     TOP SECTION
        ============================================= */}
      <div className="questions-top">
        <h1>
          Let’s make a plan for your{" "}
          <span className="incident-title">
            {selectedIncident?.title ?? "incident"}
          </span>
        </h1>

        <p className="questions-subtitle">
          Answer a few quick questions so we can organize your next steps.
        </p>
        <span className="warning-wrapper">
          <span className="warning-icon" aria-hidden="true">
            <img src={assets.caution_icon} alt="" />
          </span>
          <span className="warning">
            Important: If you are in immediate danger or injured, call emergency
            services now.
          </span>
        </span>
      </div>
      {/* =============================================
                         CENTER SECTION
        ============================================= */}
      <div className="questions-center">
        <div className="questions-list">
          {questions.map((question, index) => {
            const selectedOption = question.options.find(
              (option) => option.value === answers[question.id],
            );

            const isActive = index === activeQuestionIndex;

            return (
              <fieldset
                className={`question-card ${
                  isActive
                    ? "question-card--active"
                    : selectedOption
                      ? "question-card--answered"
                      : ""
                }`}
                key={question.id}
              >
                <legend className="question-title">
                  <span className="question-number">{index + 1}.</span>{" "}
                  {question.label}
                </legend>

                {selectedOption && !isActive && (
                  <button
                    type="button"
                    className="selected-answer"
                    onClick={() => setActiveQuestionIndex(index)}
                    aria-label={`Change answer for ${question.label}`}
                  >
                    <span>{selectedOption.label}</span>
                    <span className="change-answer-text">Change</span>
                  </button>
                )}

                {isActive && (
                  <div className="question-options">
                    {question.options.map((option) => (
                      <label className="question-option" key={option.value}>
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={answers[question.id] === option.value}
                          onChange={() =>
                            handleSelect(question.id, option.value)
                          }
                          onClick={() => {
                            if (answers[question.id] === option.value) {
                              handleSelect(question.id, option.value);
                            }
                          }}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
            );
          })}
        </div>
        {allQuestionsAnswered && (
          <div className="privacy-notice">
            <h2>Before you create your plan</h2>

            <p>
              Your privacy matters. These questions should only include general
              details about the incident. Please don’t include names, phone
              numbers, license plates, or insurance information.
            </p>

            <label className="privacy-checkbox">
              <input
                type="checkbox"
                checked={privacyConfirmed}
                onChange={(event) => setPrivacyConfirmed(event.target.checked)}
              />
              <span>
                I’ve reviewed my answers and understand that I shouldn’t include
                sensitive personal information.
              </span>
            </label>
          </div>
        )}
      </div>
      {/* =============================================
                         BOTTOM SECTION
        ============================================= */}
      <div className="questions-bottom">
        <div
          className="progress-bar"
          role="progressbar"
          aria-label="Plan setup progress"
          aria-valuemin="1"
          aria-valuemax="3"
          aria-valuenow="1"
        >
          <span className="progress-segment"></span>
          <span className="progress-segment progress-segment--active"></span>
          <span className="progress-segment"></span>
        </div>

        <div className="plan-navigation">
          <button
            type="button"
            className="start-over-button"
            onClick={handleStartOver}
          >
            <span aria-hidden="true">‹</span>
            Start over
          </button>

          <p className="step-count">Step 2 of 3</p>
          <button
            type="button"
            className="submit-button"
            disabled={!canSubmit}
            onClick={() => navigate("")}
          >
            Submit
          </button>
        </div>
      </div>
      {showDangerWarning && (
        <div className="danger-overlay">
          <div
            className="danger-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="danger-title"
            aria-describedby="danger-description"
          >
            <div className="danger-dialog-icon" aria-hidden="true">
              ⚠
            </div>

            <h2 id="danger-title">Your safety comes first</h2>

            <p id="danger-description">
              If anyone may be injured or in immediate danger, contact emergency
              services now. Do not wait for a plan from this app.
            </p>

            <button
              type="button"
              className="danger-dialog-button"
              onClick={() => setShowDangerWarning(false)}
            >
              I understand
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
