/**
 * ContactUs.jsx
 *
 * Top-level page component. Composes all sub-components.
 * All logic lives inside each component — this file is intentionally thin.
 *
 * Component tree:
 *   ContactUs
 *   ├── ContactHero
 *   └── (body grid)
 *       ├── ContactInfo
 *       └── FormPanel          ← tabs: "Send a Message" / "Give Feedback"
 *           ├── ContactForm    ← General / Product / Quote flows
 *           │   ├── QuoteForm      ← shown when "Request a Quote" is selected
 *           │   └── QuoteSummary   ← review step before the quote is sent
 *           └── FeedbackForm
 */

import ContactHero from "../components/ContactUsPage/ContactHero";
import ContactInfo from "../components/ContactUsPage/ContactInfo";
import FormPanel from "../components/ContactUsPage/FormPanel";


// Page-level layout styles only (no component styles here)
import "./ContactUs.css";

export default function ContactUs() {
  return (
    <>
      <ContactHero />
 
      <div className="contact-body">
        <ContactInfo />
        <FormPanel />
      </div>
    </>
  );
}