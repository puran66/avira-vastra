/**
 * Home Page - Landing Page
 * Main entry point for the application
 */

import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import ShopByOccasion from '../components/ShopByOccasion';
import HeritageWeaves from '../components/HeritageWeaves';
import NewArrivals from '../components/NewArrivals';
import BrandStory from '../components/BrandStory';
import BrandPromise from '../components/BrandPromise';
import WhatsAppHelp from '../components/WhatsAppHelp';
import WhySurat from '../components/WhySurat';
const HomePage = () => {
    return (
        <main>
            <Hero />
            <NewArrivals />
            <ShopByOccasion />
            <HeritageWeaves />
            <TrustStrip />
            <BrandStory />
            <BrandPromise />
            <WhatsAppHelp />
            <WhySurat />
        </main>
    );
};

export default HomePage;
