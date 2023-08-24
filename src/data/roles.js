const roles = {
    guest: {
        roleName: "guest",
        routes: [
            {path: "/login", component: "Login"},
            {path: "/register", component: "Register"},
            {path: "/404", component: "NotFound"},
            {path: "/500", component: "ServerError"},
            {path: "/401", component: "Unauthorized"},
            {path: "/", component: "Home"},
        ]
    },
    user: {
        roleName: "user",
        routes: [
            {path: "/dashboard", component: "Dashboard"},
            {path: "/404", component: "NotFound"},
            {path: "/500", component: "ServerError"},
            {path: "/401", component: "Unauthorized"},
            {path: "/", component: "Home"},
        ]
    },
    admin: {
        roleName: "admin",
        routes: [
            {path: "/admin-dashboard", component: "AdminDashboard"},
            {path: "/404", component: "NotFound"},
            {path: "/500", component: "ServerError"},
            {path: "/401", component: "Unauthorized"},
            {path: "/", component: "Home"},
        ]
    }
}

export default roles