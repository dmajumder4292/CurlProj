import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
// import Person from "@material-ui/icons/Person";
// import UserProfile from "views/UserProfile/UserProfile.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Login Requests",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  }
];

export default dashboardRoutes;
