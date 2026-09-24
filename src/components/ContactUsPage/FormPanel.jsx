import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const { search } = useLocation();

  // Footer deep links: /contact?tab=feedback opens the feedback tab, and
  // /contact?type=quote must show the message tab, where the quote form is.
  // Set after mount so the pre-rendered HTML and the first render agree;
  // doing it during render would cause a hydration mismatch.
  useEffect(() => {
    const params = new URLSearchParams(search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must wait until after hydration
    if (params.get("tab") === "feedback") setActiveTab("feedback");
    else if (params.get("type") === "quote") setActiveTab("contact");
  }, [search]);

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