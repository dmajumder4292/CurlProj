import Person from "@material-ui/icons/Person";
import UserProfile from "views/UserProfile/UserProfile.js";

let clientRoutes = [
    {
        path: "/user",
        name: "User Profile",
        icon: Person,
        component: UserProfile,
        layout: "/client",
    }
];

export default clientRoutes;