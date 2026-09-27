import { useState, useEffect } from "react";
import "./QuestionsPage.css";
import { incidentQuestions } from "../../data/incidentQuestions.js";
import { incidentTypes } from "../../data/incidentTypes.js";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";

export default function QuestionsPage({ incidentType }) {
  const navigate = useNavigate();

  const activeIncidentType =
    incidentType || localStorage.getItem("nextStepIncident");
  const questions = incidentQuestions[activeIncidentType] ?? [];
  const [piiWarning, setPiiWarning] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const selectedIncident = incidentTypes.find(
    (incident) => incident.id === activeIncidentType,
  );
  // Initialize state by checking localStorage first
  const [privacyConfirmed, setPrivacyConfirmed] = useState(() => {
    return localStorage.getItem("nextStepPrivacy") === "true";
  });
  const [additionalNotes, setAdditionalNotes] = useState(() => {
    return localStorage.getItem("nextStepNotes") || "";
  });
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("nextStepAnswers");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(() => {
    const saved = localStorage.getItem("nextStepIndex");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showDangerWarning, setShowDangerWarning] = useState(false);

  // Keep localStorage fully synced whenever the user updates these states
  useEffect(() => {
    localStorage.setItem("nextStepAnswers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("nextStepNotes", additionalNotes);
  }, [additionalNotes]);

  useEffect(() => {
    localStorage.setItem("nextStepIndex", activeQuestionIndex.toString());
  }, [activeQuestionIndex]);

  useEffect(() => {
    localStorage.setItem("nextStepPrivacy", privacyConfirmed.toString());
  }, [privacyConfirmed]);

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
    localStorage.removeItem("nextStepAnswers");
    localStorage.removeItem("nextStepIndex");
    localStorage.removeItem("nextStepPrivacy");
    localStorage.removeItem("nextStepIncident");
    localStorage.removeItem("nextStepNotes");
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  }

  async function handleSubmit() {
    if (!canSubmit || isGenerating || !activeIncidentType) return;

    setIsGenerating(true);
    setGenerationError("");

    try {
      const response = await fetch("http://localhost:8000/api/incident-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          incidentType: activeIncidentType,
          answers,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not create a plan.");
      }

      const plan = result.data?.plan;

      if (!plan) {
        throw new Error("The server did not return a plan.");
      }

      navigate("/results", {
        state: { incidentType: activeIncidentType, answers, plan },
      });
    } catch (error) {
      console.error("Plan generation failed:", error);
      setGenerationError("We couldn't generate a plan right now.");
    } finally {
      setIsGenerating(false);
    }
  }
  // This function checks the text locally as the user types
  function handleNotesChange(event) {
    const text = event.target.value;
    setAdditionalNotes(text);

    // Look for common PII patterns:
    const looksLikeEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
    const looksLikeIdOrPhone = /(?:\d[\s\-.\(\)]*){7,}/.test(text);

    // If it finds something, trigger the warning
    setPiiWarning(looksLikeEmail || looksLikeIdOrPhone);
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
          {allQuestionsAnswered && (
            <fieldset className="question-card question-card--active additional-notes-card">
              <legend className="question-title">
                Anything else we should know? (Optional)
              </legend>

              <textarea
                className="notes-textarea"
                placeholder="e.g., It's raining heavily, or I have a dog in the car..."
                value={additionalNotes}
                onChange={handleNotesChange}
                rows="3"
              />

              {/* Real-time Mindful AI Intervention */}
              {piiWarning && (
                <div className="pii-warning" role="alert">
                  <span className="warning-icon" aria-hidden="true">
                    ⚠
                  </span>
                  <span>
                    <strong>Privacy check:</strong> It looks like you might have
                    entered a phone number, ID, or email. For your safety,
                    please remove personal details before generating your plan.
                  </span>
                </div>
              )}
            </fieldset>
          )}
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
            disabled={!canSubmit || isGenerating || piiWarning}
            onClick={handleSubmit}
          >
            {isGenerating ? "Creating your plan…" : "Submit"}
          </button>
          {generationError && <p role="alert">{generationError}</p>}
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
