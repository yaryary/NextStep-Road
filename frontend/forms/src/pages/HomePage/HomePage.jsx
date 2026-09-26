import "./HomePage.css";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";

const [incidentTypes] = [
  {
    id: "flat-tire",
    title: "Flat tire",
    description: "Need roadside help or a spare tire.",
    icon: assets.flat_tire_icon,
  },
  {
    id: "minor-accident",
    title: "Minor accident",
    description: "Need help after a low-impact collision.",
    icon: assets.accident_icon,
  },
  {
    id: "dead-battery",
    title: "Dead battery",
    description: "Need a jump-start or battery assistance.",
    icon: assets.battery_icon,
  },
  {
    id: "breakdown-warning-light",
    title: "Breakdown or warning light",
    description: "Your vehicle stopped or a warning light came on.",
    icon: assets.light_icon,
  },
  {
    id: "vehicle-break-in-or-theft",
    title: "Vehicle break-in or theft",
    description: "Your vehicle was damaged, broken into, or stolen.",
    icon: assets.theft_icon,
  },
];

export default function HomePage({ incidentType, setIncidentType }) {

  const navigate = useNavigate();
  
  function handleIncidentSelect(selectedType) {
    setIncidentType(selectedType);
  }
  return (
    <main className="Home">
      <div className="NavBar">
        <h1 className="app-logo">
          <span className="logo-nextstep">NextStep</span>{" "}
          <span className="logo-road">Road</span>
        </h1>
        <h3>Clear next steps for unexpected transportation issues</h3>
      </div>

      <div className="home-top">
        <h1>What happened?</h1>
        <h3>
          Choose the situation that best matches what you are dealing with
        </h3>
        <div className="disclaimer">
          If anyone is injured, in immediate danger, or needs emergency help,
          call 911 or your local emergency number first.
        </div>
      </div>

      <div className="home-center">
        <div className="incident-type-cards">
          <p>Incident-Type Cards</p>

          <button
            type="button"
            onClick={() => handleIncidentSelect("flat-tire")}
            aria-pressed={incidentType === "flat-tire"}
            className={`incident-card ${
              incidentType === "flat-tire" ? "incident-card--selected" : ""
            }`}
          >
            <span className="incident-icon" aria-hidden="true">
              <img src={assets.flat_tire_icon} alt="" />
            </span>

            <span className="incident-card-content">
              <span className="incident-card-title">Flat tire</span>
              <span className="incident-card-description">
                Need roadside help or a spare tire.
              </span>
            </span>

            <span className="incident-card-arrow" aria-hidden="true">
              <img src={assets.arrow_icon} alt="" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleIncidentSelect("minor-accident")}
            aria-pressed={incidentType === "minor-accident"}
            className={`incident-card ${
              incidentType === "minor-accident" ? "incident-card--selected" : ""
            }`}
          >
            <span className="incident-icon" aria-hidden="true">
              <img src={assets.accident_icon} alt="" />
            </span>

            <span className="incident-card-content">
              <span className="incident-card-title">Minor accident</span>
              <span className="incident-card-description">
                Need help after a low-impact collision.
              </span>
            </span>

            <span className="incident-card-arrow" aria-hidden="true">
              <img src={assets.arrow_icon} alt="" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleIncidentSelect("dead-battery")}
            aria-pressed={incidentType === "dead-battery"}
            className={`incident-card ${
              incidentType === "dead-battery" ? "incident-card--selected" : ""
            }`}
          >
            <span className="incident-icon" aria-hidden="true">
              <img src={assets.battery_icon} alt="" />
            </span>

            <span className="incident-card-content">
              <span className="incident-card-title">Dead battery</span>
              <span className="incident-card-description">
                Need a jump-start or battery assistance.
              </span>
            </span>

            <span className="incident-card-arrow" aria-hidden="true">
              <img src={assets.arrow_icon} alt="" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleIncidentSelect("breakdown-warning-light")}
            aria-pressed={incidentType === "breakdown-warning-light"}
            className={`incident-card ${
              incidentType === "breakdown-warning-light"
                ? "incident-card--selected"
                : ""
            }`}
          >
            <span className="incident-icon" aria-hidden="true">
              <img src={assets.light_icon} alt="" />
            </span>

            <span className="incident-card-content">
              <span className="incident-card-title">
                Breakdown or warning light
              </span>
              <span className="incident-card-description">
                Your vehicle stopped or a warning light came on.
              </span>
            </span>

            <span className="incident-card-arrow" aria-hidden="true">
              <img src={assets.arrow_icon} alt="" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleIncidentSelect("vehicle-break-in-or-theft")}
            aria-pressed={incidentType === "vehicle-break-in-or-theft"}
            className={`incident-card ${
              incidentType === "vehicle-break-in-or-theft" ? "incident-card--selected" : ""
            }`}
          >
            <span className="incident-icon" aria-hidden="true">
              <img src={assets.theft_icon} alt="" />
            </span>

            <span className="incident-card-content">
              <span className="incident-card-title">
                Vehicle break-in or theft
              </span>
              <span className="incident-card-description">
                Your vehicle was damaged, broken into, or stolen.
              </span>
            </span>

            <span className="incident-card-arrow" aria-hidden="true">
              <img src={assets.arrow_icon} alt="" />
            </span>
          </button>
        </div>
      </div>
      <section className="home-bottom" aria-label="Plan progress">
        <p className="privacy-reminder">
          Avoid entering personal, financial, or insurance policy information.
        </p>

        <div
          className="progress-bar"
          role="progressbar"
          aria-label="Plan setup progress"
          aria-valuemin="1"
          aria-valuemax="3"
          aria-valuenow="1"
        >
          <span className="progress-segment progress-segment--active"></span>
          <span className="progress-segment"></span>
          <span className="progress-segment"></span>
        </div>

        <div className="plan-navigation">
          <button type="button" className="start-over-button"
          onClick={() => {
            setIncidentType(null);
          }}>
            <span aria-hidden="true">‹</span>
            Start over
          </button>

          <p className="step-count">Step 1 of 3</p>

          <button
            type="button"
            className="continue-button"
            disabled={!incidentType}
            onClick={() => navigate("/questions")}
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
