/**
 * ContactUs.jsx
 *
 * Top-level page component. Composes all sub-components.
 * All logic lives inside each component — this file is intentionally thin.
 *
 * Component tree:
 *   ContactUs
 *   ├── ContactHero
 *   ├── (body grid)
 *   │   ├── ContactInfo
 *   │   └── ContactForm        ← handles General / Product / Quote flows
 *   │       └── QuoteForm      ← rendered inside ContactForm when "Request a Quote"
 *   │       └── QuoteSummary   ← rendered inside ContactForm before final submit
 *   └── FeedbackForm           ← standalone dark-background section below
 */

import ContactHero from "../components/ContactUsPage/ContactHero";
import ContactInfo from "../components/ContactUsPage/ContactInfo";
import ContactForm from "../components/ContactUsPage/ContactForm";
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