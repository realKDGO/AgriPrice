import React, { useState } from 'react';
import '../styles/Login.css';
import '../styles/register.css';
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Login() {
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
};

return (
    <div className="signin-page">
    <div className="signin-card">


        <div className="signin-left">
            <div className="signin-brand">
            <span className="signin-brand__logo">🌾</span>
            <span className="signin-brand__name">AgriPrice</span>
            </div>

            <div className="signin-left__content">
            <h1 className="signin-left__heading">
            Welcome back to your harvest dashboard.
            </h1>

            <p className="signin-left__subtext">
            Sign in to check today's crop prices, review your latest
            forecasts, and plan your next sale across Rizal Province
            markets.
            </p>
            
            </div>
            <blockquote className="signin-quote">
            <p className="signin-quote__text">
                "AgriPrice keeps every market price and forecast for Rizal in
                one place — no more guessing where to sell."
            </p>
            <cite>— AgriPrice</cite>
            </blockquote>
        </div>
    
        <div className="signin-right">
            <div className="signin-right__content">
            <h2 className="signin-right__title">Sign in</h2>
            <p className="signin-right__subtitle">
            Enter your credentials to access your dashboard.
            </p>

            <form className="signin-form" onSubmit={handleSubmit}>
            <div className="signin-field">
                <label className="signin-label" htmlFor="email">
                Email Address
                </label>
                <div className="signin-input-wrapper">
                <FaEnvelope className="signin-input-icon" size={16} />
                <input
                    id="email"
                    type="email"
                    className="signin-input"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
            </div>

            <div className="signin-field">
                <label className="signin-label" htmlFor="password">
                Password
                </label>
                <div className="signin-input-wrapper">
                <FaLock className="signin-input-icon" size={16} />
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="signin-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="signin-input-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                    showPassword ? "Hide password" : "Show password"
                    }
                >
                    <FaEye className="Icon" onClick={() => setShowPassword(!showPassword)} />
                </button>
                </div>
            </div>

            <div className="signin-row">
                <label className="signin-checkbox">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
                </label>
                <a href="#" className="signin-link">
                Forgot password?
                </a>
            </div>

            <button type="submit" className="signin-submit">
                Sign In
            </button>

            <p className="signin-footer">
                Don't have an account?{" "}
                <a href="#" className="signin-link signin-link--strong">
                Create one
                </a>
            </p>
            </form>
        </div>
        </div>
        </div>
        </div>
);
}
