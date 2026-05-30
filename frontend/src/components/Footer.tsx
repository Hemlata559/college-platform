import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <svg className="brand-icon" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M3 11.5 16 5l13 6.5L16 18 3 11.5Z" fill="currentColor" />
              <path d="M8 15.5v6c4.6 3.2 11.4 3.2 16 0v-6l-8 4-8-4Z" fill="currentColor" opacity="0.78" />
            </svg>
            CollegeHub
          </div>
          <p>Explore, compare, and save colleges with one simple platform.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/predictor">Predictor</Link>
          <Link to="/discussions">Discussions</Link>
          <Link to="/saved">Saved</Link>
        </div>

        <div className="footer-meta">
          <span>Built for students</span>
          <span>© 2026 CollegeHub</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
