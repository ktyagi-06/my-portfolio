export type VisualKind = "forecast" | "fraud" | "sales" | "crm";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  highlights: string[];
  tech: string[];
  github: string;
  demo?: string;
  demoLabel?: string;
  visual: VisualKind;
  caption: string;
};

export const projects: Project[] = [
  {
    id: "supply-chain",
    title: "Automated Precision Supply Chain",
    tagline:
      "Forecasts demand, flags stockout and overstock risk, then tells you how many units to order and from which supplier.",
    highlights: [
      "Compared Linear Regression, Random Forest and XGBoost on a time-based split; Random Forest won on validation MAE (7.22).",
      "Safety stock and reorder points come from demand volatility and supplier lead time at a 95% service level.",
      "FastAPI backend feeds a live React dashboard with alerts, supplier performance and replenishment advice.",
    ],
    tech: ["Python", "Scikit-learn", "XGBoost", "FastAPI", "React"],
    github: "https://github.com/ktyagi-06/Automated-Precision-Supply-Chain-for-healthcare",
    demo: "https://automated-precision-supply-chain-fo.vercel.app",
    demoLabel: "Live dashboard",
    visual: "forecast",
    caption: "Projected stock crossing the reorder point",
  },
  {
    id: "fraud-detection",
    title: "Credit Card Fraud Detection",
    tagline:
      "An end-to-end pipeline built around the real problem: fraud is under 1% of transactions, so accuracy tells you nothing.",
    highlights: [
      "Handles class imbalance with SMOTE on training data only, class weighting and threshold tuning.",
      "Benchmarks Logistic Regression, Random Forest and XGBoost, judged on PR-AUC rather than accuracy.",
      "Streamlit app: upload a CSV, pick a model, get fraud probabilities and download the scored file.",
    ],
    tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Streamlit"],
    github: "https://github.com/ktyagi-06/Credit-card-fraud-detection-system-",
    demo: "https://credit-card-fraudetection.streamlit.app/",
    demoLabel: "Try the app",
    visual: "fraud",
    caption: "Transactions beyond the decision boundary get flagged",
  },
  {
    id: "sales-analytics",
    title: "Sales Analytics and Revenue Forecasting",
    tagline:
      "Turns raw order data into KPIs, customer segments, retention curves and a revenue forecast that has to beat a naive baseline.",
    highlights: [
      "RFM scoring with KMeans, named into segments like Champions and At Risk.",
      "Monthly cohort retention matrix and Holt-Winters forecasting, reported next to a seasonal baseline.",
      "Config-driven pipeline with unit tests, CI and an interactive Streamlit dashboard.",
    ],
    tech: ["Python", "Pandas", "SQL", "Power BI", "Streamlit"],
    github: "https://github.com/ktyagi-06/Sales-Analytics",
    demo: "https://sales-analytics-mbyeokseaww4s4yzhvzcet.streamlit.app/",
    demoLabel: "Open dashboard",
    visual: "sales",
    caption: "Monthly revenue with forecast months",
  },
  {
    id: "mini-crm",
    title: "Mini CRM",
    tagline:
      "A full-stack customer relationship manager: customers, leads, follow-ups and a sales pipeline in one place.",
    highlights: [
      "CRUD for customers and leads, with search, filtering and task tracking.",
      "RESTful API on Express with MongoDB for persistent storage.",
      "Dashboard showing lead status, conversion progress and sales performance.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    // Link to your repo list until you paste the exact repo URL here.
    github: "https://github.com/ktyagi-06?tab=repositories",
    visual: "crm",
    caption: "Leads moving through the sales pipeline",
  },
];
