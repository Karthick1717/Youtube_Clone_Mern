import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <section className="about-content">
        <p>
          Welcome to VideoStream, your go-to platform for watching and sharing videos. Our mission is to connect people through the power of video content, providing a space where creators and viewers can come together.
        </p>
        <h2>Our Story</h2>
        <p>
          VideoStream was founded with the vision of creating a dynamic and engaging video-sharing experience. Our team is passionate about technology and entertainment, and we strive to bring you the best content with a user-friendly interface.
        </p>
        <h2>Our Team</h2>
        <p>
          Our team consists of dedicated professionals who are committed to delivering exceptional service and innovative features. We work hard to ensure that VideoStream is a platform that users love and trust.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, please reach out to us at <a href="mailto:support@videostream.com">support@videostream.com</a>. We’d love to hear from you!
        </p>
      </section>
    </div>
  );
};

export default About;
