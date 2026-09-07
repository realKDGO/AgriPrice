import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/auth.css";

function Brand() {
  return (
    <div className="auth-brand">
      <img src="/images/agriprice-logo.png" alt="AgriPrice" />
      <span>AgriPrice</span>
    </div>
  );
}

function PasswordField({ label, value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <label className="auth-field">
      <span>{label}</span>
      <div className="auth-password">
        <input
          type={show ? "text" : "password"}
          minLength="8"
          required
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}>
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </label>
  );
}

export default function AuthPage({ mode = "login" }) {
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", remember: true });
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const heading = isRegister ? "Create your account" : isForgot ? "Forgot your password?" : "Sign in";
  const description = isRegister
    ? "Start making data-backed selling decisions today."
    : isForgot
      ? "Enter the email address associated with your AgriPrice account."
      : "Enter your credentials to access your dashboard.";
  const storyTitle = isRegister ? "Plan every harvest with confidence." : "Welcome back to your harvest dashboard.";
  const storyCopy = isRegister
    ? "Create your account to unlock crop price forecasting, market recommendations, and profit estimation tools built for Rizal Province."
    : "Sign in to check today’s crop prices, review your latest forecasts, and plan your next sale across Rizal Province markets.";
  const quote = isRegister
    ? "“Setting up took two minutes — now I check AgriPrice before every trip to the market.”"
    : "“AgriPrice keeps every market price and forecast for Rizal in one place — no more guessing where to sell.”";

  function submit(event) {
    event.preventDefault();
    // TODO: Connect this form to the AgriPrice authentication API.
  }

  return (
    <div className="auth-shell">
      <aside className="auth-story">
        <Brand />
        <div className="auth-story-copy">
          <h1>{isForgot ? "We'll help you get back in." : storyTitle}</h1>
          <p>{isForgot ? "Enter the email address on your AgriPrice account and we'll guide you through resetting your password." : storyCopy}</p>
        </div>
        <blockquote className="auth-quote">
          <p>{quote}</p>
          <footer>— {isRegister ? "Rizal Farmers Cooperative" : "AgriPrice"}</footer>
        </blockquote>
      </aside>

      <section className="auth-form-panel">
        <div className="auth-form">
          <div className="mobile-auth-brand"><Brand /></div>
          <h1>{heading}</h1>
          <p className="auth-description">{description}</p>
          <form onSubmit={submit} className="auth-form-stack">
            {isRegister && (
              <div className="auth-form-grid">
                <label className="auth-field"><span>First Name</span><input required autoComplete="given-name" placeholder="Juan" value={form.firstName} onChange={set("firstName")} /></label>
                <label className="auth-field"><span>Last Name</span><input required autoComplete="family-name" placeholder="Dela Cruz" value={form.lastName} onChange={set("lastName")} /></label>
              </div>
            )}
            <label className="auth-field"><span>Email Address</span><input type="email" required autoComplete="email" placeholder="you@email.com" value={form.email} onChange={set("email")} /></label>
            {!isForgot && (
              <>
                <PasswordField label="Password" value={form.password} onChange={set("password")} placeholder={isRegister ? "At least 8 characters" : "••••••••"} autoComplete={isRegister ? "new-password" : "current-password"} />
                {isRegister && <small className="auth-fine-print">Use at least 8 characters.</small>}
                {isRegister && <PasswordField label="Confirm Password" value={form.confirm} onChange={set("confirm")} placeholder="Re-enter your password" autoComplete="new-password" />}
                {!isRegister && (
                  <div className="auth-options">
                    <label><input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} /> Remember me</label>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                )}
              </>
            )}
            <button className="auth-submit" type="submit">{isRegister ? "Create Account" : isForgot ? "Send Reset Link" : "Sign In"}</button>
          </form>
          <p className="auth-switch">
            {isRegister ? <>Already have an account? <Link to="/login">Sign in</Link></> : isForgot ? <Link to="/login">Remember your password? Sign in</Link> : <>Don't have an account? <Link to="/register">Create one</Link></>}
          </p>
        </div>
      </section>
    </div>
  );
}
