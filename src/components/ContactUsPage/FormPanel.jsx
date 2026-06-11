import { useState } from "react";
import { FaPaperPlane, FaCommentDots } from "react-icons/fa";
import ContactForm from "./ContactForm";
import FeedbackForm from "./FeedbackForm";
import "./FormPanel.css";

const TABS = [
  {
    key: "contact",
    label: "Send a Message",
    icon: <FaPaperPlane />,
  },
  {
    key: "feedback",
    label: "Give Feedback",
    icon: <FaCommentDots />,
  },
];

export default function FormPanel() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="form-panel">
      {/* ── Tab switcher ── */}
      <div className="form-panel-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`form-panel-tab ${
              activeTab === tab.key ? "form-panel-tab--active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="form-panel-tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
        {/* Sliding indicator */}
        <div
          className="form-panel-tab-indicator"
          style={{
            transform: `translateX(${activeTab === "contact" ? "0%" : "100%"})`,
          }}
        />
      </div>

      {/* ── Tab content ── */}
      <div className="form-panel-body">
        <div
          className={`form-panel-pane ${
            activeTab === "contact" ? "form-panel-pane--active" : ""
          }`}
          role="tabpanel"
          aria-hidden={activeTab !== "contact"}
        >
          <ContactForm />
        </div>

        <div
          className={`form-panel-pane ${
            activeTab === "feedback" ? "form-panel-pane--active" : ""
          }`}
          role="tabpanel"
          aria-hidden={activeTab !== "feedback"}
        >
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}