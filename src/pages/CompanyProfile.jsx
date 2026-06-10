import React from 'react';
import '../components/CompanyPage.css';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CapbilitiesSection from '../components/CapabilitiesSection';
import JourneyAndWhySection from '../components/JourneyAndWhySection';
import CTABanner  from '../components/CTABanner';


export default function CompanyProfile() {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <CapbilitiesSection />
            <JourneyAndWhySection />
            <CTABanner/>
            
        </div>
    );
}