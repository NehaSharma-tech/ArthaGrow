import Summary from "./Summary";

// Dashboard is just the summary/home view.
// Routing lives in Home.js — Dashboard renders when path is "/"
const Dashboard = () => {
  return <Summary />;
};

export default Dashboard;