import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCircleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";
import "../styles/auth.css";

function Brand() {
  return (
    <div className="auth-brand">
      <img src="/images/agriprice-logo.png" alt="AgriPrice" />
      <span>AgriPrice</span>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {
  const [show, setShow] = useState(false);

  return (
    <label className="auth-field">
      <span>{label}</span>

      <div className={`auth-password ${error ? "auth-input-error" : ""}`}>
        <input
          type={show ? "text" : "password"}
          minLength="8"
          required
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((current) => !current)}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && (
        <small className="auth-field-error">
          <FaCircleExclamation />
          {error}
        </small>
      )}
    </label>
  );
}

export default function AuthPage({ mode = "login" }) {
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    remember: true,
  });

  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const heading = isRegister
    ? "Create your account"
    : isForgot
      ? "Forgot your password?"
      : "Sign in";

  const description = isRegister
    ? "Start making data-backed selling decisions today."
    : isForgot
      ? "Enter the email address associated with your AgriPrice account."
      : "Enter your credentials to access your dashboard.";

  const storyTitle = isRegister
    ? "Plan every harvest with confidence."
    : "Welcome back to your harvest dashboard.";

  const storyCopy = isRegister
    ? "Create your account to unlock crop price forecasting, market recommendations, and profit estimation tools built for Rizal Province."
    : "Sign in to check today’s crop prices, review your latest forecasts, and plan your next sale across Rizal Province markets.";

  const quote = isRegister
    ? "“Setting up took two minutes — now I check AgriPrice before every trip to the market.”"
    : "“AgriPrice keeps every market price and forecast for Rizal in one place — no more guessing where to sell.”";

  function setField(key) {
    return (event) => {
      const value = event.target.value;

      setForm((current) => ({
        ...current,
        [key]: value,
      }));

      setErrors((current) => ({
        ...current,
        [key]: "",
      }));

      setFormMessage("");
      setSuccessMessage("");
    };
  }

  function validateForm() {
    const newErrors = {};

    const email = form.email.trim();

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (isRegister) {
      if (!form.firstName.trim()) {
        newErrors.firstName = "First name is required.";
      }

      if (!form.lastName.trim()) {
        newErrors.lastName = "Last name is required.";
      }
    }

    if (!isForgot) {
      if (!form.password) {
        newErrors.password = "Password is required.";
      } else if (form.password.length < 8) {
        newErrors.password =
          "Password must contain at least 8 characters.";
      }
    }

    if (isRegister) {
      if (!form.confirm) {
        newErrors.confirm = "Please confirm your password.";
      } else if (form.password !== form.confirm) {
        newErrors.confirm = "Passwords do not match.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function submit(event) {
    event.preventDefault();

    setFormMessage("");
    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (isForgot) {
      setSuccessMessage(
        "If an account exists for this email, password reset instructions will be sent."
      );

      return;
    }

    if (isRegister) {
      /*
        BACKEND INTEGRATION LATER

        Example:

        try {
          await registerUser(form);
        } catch (error) {
          if (error.response?.status === 409) {
            setErrors({
              email: "An account with this email already exists.",
            });
          } else {
            setFormMessage(
              "Unable to create your account. Please try again."
            );
          }
        }
      */

      setSuccessMessage(
        "Your registration details are valid. Backend account creation will be connected later."
      );

      return;
    }

    /*
      BACKEND INTEGRATION LATER

      Example:

      try {
        await loginUser({
          email: form.email,
          password: form.password,
        });
      } catch (error) {
        if (error.response?.status === 401) {
          setFormMessage("Incorrect email or password.");
        } else {
          setFormMessage(
            "Unable to sign in. Please try again."
          );
        }
      }
    */

    setSuccessMessage(
      "Your login details are valid. Backend authentication will be connected later."
    );
  }

  return (
    <div className="auth-shell">
      <aside className="auth-story">
        <Brand />

        <div className="auth-story-copy">
          <h1>
            {isForgot
              ? "We'll help you get back in."
              : storyTitle}
          </h1>

          <p>
            {isForgot
              ? "Enter the email address on your AgriPrice account and we'll guide you through resetting your password."
              : storyCopy}
          </p>
        </div>

        <blockquote className="auth-quote">
          <p>{quote}</p>

          <footer>
            — {isRegister ? "Rizal Farmers Cooperative" : "AgriPrice"}
          </footer>
        </blockquote>
      </aside>

      <section className="auth-form-panel">
        <div className="auth-form">
          <div className="mobile-auth-brand">
            <Brand />
          </div>

          <h1>{heading}</h1>

          <p className="auth-description">
            {description}
          </p>

          {formMessage && (
            <div className="auth-message auth-message-error">
              <FaCircleExclamation />
              <span>{formMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="auth-message auth-message-success">
              <FaCircleCheck />
              <span>{successMessage}</span>
            </div>
          )}

          <form
            onSubmit={submit}
            className="auth-form-stack"
            noValidate
          >
            {isRegister && (
              <div className="auth-form-grid">
                <label className="auth-field">
                  <span>First Name</span>

                  <input
                    className={
                      errors.firstName ? "auth-input-error" : ""
                    }
                    autoComplete="given-name"
                    placeholder="Juan"
                    value={form.firstName}
                    onChange={setField("firstName")}
                  />

                  {errors.firstName && (
                    <small className="auth-field-error">
                      <FaCircleExclamation />
                      {errors.firstName}
                    </small>
                  )}
                </label>

                <label className="auth-field">
                  <span>Last Name</span>

                  <input
                    className={
                      errors.lastName ? "auth-input-error" : ""
                    }
                    autoComplete="family-name"
                    placeholder="Dela Cruz"
                    value={form.lastName}
                    onChange={setField("lastName")}
                  />

                  {errors.lastName && (
                    <small className="auth-field-error">
                      <FaCircleExclamation />
                      {errors.lastName}
                    </small>
                  )}
                </label>
              </div>
            )}

            <label className="auth-field">
              <span>Email Address</span>

              <input
                className={
                  errors.email ? "auth-input-error" : ""
                }
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={setField("email")}
              />

              {errors.email && (
                <small className="auth-field-error">
                  <FaCircleExclamation />
                  {errors.email}
                </small>
              )}
            </label>

            {!isForgot && (
              <>
                <PasswordField
                  label="Password"
                  value={form.password}
                  onChange={setField("password")}
                  placeholder={
                    isRegister
                      ? "At least 8 characters"
                      : "••••••••"
                  }
                  autoComplete={
                    isRegister
                      ? "new-password"
                      : "current-password"
                  }
                  error={errors.password}
                />

                {isRegister && !errors.password && (
                  <small className="auth-fine-print">
                    Use at least 8 characters.
                  </small>
                )}

                {isRegister && (
                  <PasswordField
                    label="Confirm Password"
                    value={form.confirm}
                    onChange={setField("confirm")}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    error={errors.confirm}
                  />
                )}

                {!isRegister && (
                  <div className="auth-options">
                    <label>
                      <input
                        type="checkbox"
                        checked={form.remember}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            remember: event.target.checked,
                          }))
                        }
                      />

                      Remember me
                    </label>

                    <Link to="/forgot-password">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </>
            )}

            <button
              className="auth-submit"
              type="submit"
            >
              {isRegister
                ? "Create Account"
                : isForgot
                  ? "Send Reset Link"
                  : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <Link to="/login">Sign in</Link>
              </>
            ) : isForgot ? (
              <Link to="/login">
                Remember your password? Sign in
              </Link>
            ) : (
              <>
                Don't have an account?{" "}
                <Link to="/register">Create one</Link>
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}