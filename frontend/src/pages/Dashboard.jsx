import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiDollarSign,
  FiMapPin,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";

const cropPrices = [
  {
    id: 1,
    crop: "Rice",
    price: 45,
    change: 2.4,
    trend: "up",
  },
  {
    id: 2,
    crop: "Tomato",
    price: 68,
    change: 4.1,
    trend: "up",
  },
  {
    id: 3,
    crop: "Eggplant",
    price: 54,
    change: 1.8,
    trend: "down",
  },
  {
    id: 4,
    crop: "Onion",
    price: 92,
    change: 3.2,
    trend: "up",
  },
];

const insights = [
  {
    id: 1,
    title: "Tomato prices are increasing",
    description:
      "Current sample data shows an upward movement in tomato prices.",
  },
  {
    id: 2,
    title: "Antipolo is the suggested market",
    description:
      "The sample recommendation considers selling price and estimated transport cost.",
  },
  {
    id: 3,
    title: "Rice remains relatively stable",
    description:
      "Recent sample price movements show only a small change.",
  },
];

function Dashboard() {
  return (
    <div className="farmer-dashboard">
      <section className="farmer-dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Farmer Dashboard</p>

          <h1>Good day, Juan.</h1>

          <p className="farmer-dashboard-description">
            Check the latest crop prices, forecasts, and market insights
            before planning your next sale.
          </p>
        </div>

        <Link to="/prices" className="btn btn-primary">
          View Crop Prices
          <FiArrowRight />
        </Link>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Today's Crop Prices</h2>
            <p>Sample prices per kilogram across monitored markets.</p>
          </div>

          <Link to="/prices" className="dashboard-text-link">
            View all
            <FiArrowRight />
          </Link>
        </div>

        <div className="farmer-price-grid">
          {cropPrices.map((crop) => {
            const isUp = crop.trend === "up";

            return (
              <article className="farmer-price-card" key={crop.id}>
                <div className="farmer-price-card-top">
                  <span className="farmer-crop-icon">
                    {crop.crop.charAt(0)}
                  </span>

                  <span
                    className={
                      isUp
                        ? "farmer-price-change price-up"
                        : "farmer-price-change price-down"
                    }
                  >
                    {isUp ? <FiTrendingUp /> : <FiTrendingDown />}

                    {crop.change}%
                  </span>
                </div>

                <div className="farmer-price-info">
                  <h3>{crop.crop}</h3>

                  <p className="farmer-price-value">
                    ₱{crop.price.toFixed(2)}
                    <span>/kg</span>
                  </p>
                </div>

                <p className="farmer-price-note">
                  Compared with the previous recorded price
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="farmer-dashboard-main-grid">
        <div className="dashboard-column">
          <article className="dashboard-card forecast-preview">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <span className="dashboard-card-icon">
                  <FiBarChart2 />
                </span>

                <div>
                  <h2>Price Forecast</h2>
                  <p>Rice forecast preview</p>
                </div>
              </div>

              <Link to="/forecast" className="dashboard-text-link">
                View forecast
                <FiArrowRight />
              </Link>
            </div>

            <div className="forecast-summary">
              <div>
                <span className="forecast-label">
                  Current Price
                </span>

                <strong>₱45.00/kg</strong>
              </div>

              <FiArrowRight className="forecast-arrow" />

              <div>
                <span className="forecast-label">
                  1 Month Forecast
                </span>

                <strong>₱48.20/kg</strong>
              </div>
            </div>

            <div className="forecast-trend">
              <FiTrendingUp />

              <div>
                <strong>Upward trend</strong>
                <span>
                  Sample forecast indicates a possible price increase.
                </span>
              </div>
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <span className="dashboard-card-icon">
                  <FiMapPin />
                </span>

                <div>
                  <h2>Recommended Market</h2>
                  <p>Sample recommendation for Rice</p>
                </div>
              </div>

              <Link to="/markets" className="dashboard-text-link">
                View markets
                <FiArrowRight />
              </Link>
            </div>

            <div className="recommended-market">
              <div>
                <span className="recommendation-badge">
                  Recommended
                </span>

                <h3>Antipolo Public Market</h3>

                <p>
                  Estimated selling price after considering sample
                  transport cost.
                </p>
              </div>

              <div className="recommended-market-price">
                <span>Estimated net price</span>
                <strong>₱46.30/kg</strong>
              </div>
            </div>

            <div className="market-details-grid">
              <div>
                <span>Market Price</span>
                <strong>₱49.00/kg</strong>
              </div>

              <div>
                <span>Transport Cost</span>
                <strong>₱2.70/kg</strong>
              </div>

              <div>
                <span>Estimated Distance</span>
                <strong>18 km</strong>
              </div>
            </div>
          </article>
        </div>

        <div className="dashboard-column">
          <article className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <span className="dashboard-card-icon">
                  <FiDollarSign />
                </span>

                <div>
                  <h2>Profit Estimate</h2>
                  <p>Quick sample estimate</p>
                </div>
              </div>

              <Link to="/profit" className="dashboard-text-link">
                Calculate
                <FiArrowRight />
              </Link>
            </div>

            <div className="profit-preview">
              <span>Estimated Profit</span>

              <strong>₱18,500.00</strong>

              <p>
                Based on a sample harvest quantity, production cost,
                and recommended selling price.
              </p>
            </div>

            <div className="profit-breakdown">
              <div>
                <span>Estimated Revenue</span>
                <strong>₱49,000</strong>
              </div>

              <div>
                <span>Estimated Costs</span>
                <strong>₱30,500</strong>
              </div>
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <h2>Latest Insights</h2>
                <p>Useful information based on sample data.</p>
              </div>
            </div>

            <div className="dashboard-insight-list">
              {insights.map((insight) => (
                <div className="dashboard-insight" key={insight.id}>
                  <span className="dashboard-insight-dot" />

                  <div>
                    <h3>{insight.title}</h3>

                    <p>{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;