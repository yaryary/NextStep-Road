import "./QuestionsPage.css";

export default function QuestionsPage({ incidentType }) {
  return (
    <main className="QuestionsPage">
      <div className="NavBar">
        <h1 className="app-logo">
          <span className="logo-nextstep">NextStep</span>{" "}
          <span className="logo-road">Road</span>
        </h1>
        <h3>Clear next steps for unexpected transportation issues</h3>
      </div>
      <div className="questions-top">
        <h1>Questions</h1>
        <p>Selected incident: {incidentType}</p>
      </div>
    </main>
  );
}
