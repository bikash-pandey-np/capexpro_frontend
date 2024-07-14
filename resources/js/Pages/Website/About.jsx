import React from 'react';
import Navbar from './Web/Navbar';
import Footer from './Web/Footer';
import AboutBanner from './Web/AboutBanner'

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutBanner></AboutBanner>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-lg mb-8 text-justify">
            Welcome to Capex.Pro, your trusted platform for seamless crypto and stock trading. Our mission is to provide the core infrastructure services for organizing the world's crypto and stocks, and our vision is to increase the freedom of money globally.
          </p>
          <p className="text-lg mb-8 text-justify">
          The mission of our stock/Crypto trading platform is to empower  investors by providing a seamless, transparent, and efficient  marketplace for buying and selling financial instruments. We aim  to democratise access to global markets, offer robust tools for  analysis, and foster financial literacy. Whether you’re a seasoned  trader or a beginner, our platform strives to be your trusted  partner on your investment journey.
          </p>
          <p className="text-lg mb-8 text-center">
          Need any help ? <br />
          Reach us at : support@thecapex.pro <br/>
          24 x 7 support
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
