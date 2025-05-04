import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Buy from "../pages/Buy/Buy";
import Rent from "../pages/Rent/Rent";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import AgentProfileCard from "../components/AgentProfileCard/AgentProfileCard";
import Contact from "../components/Contact/Contact";
import TeamPage from "../components/TeamMembers/TeamPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import OffPlanSinglePage from "../pages/OffPlanSingle/OffPlanSInglePage";
import OffPlanListingPage from "../pages/OffPlanProperties/OffPlanPropertyListingPage";
import AdminSIgnInPage from "../pages/AdminSIgnInPage/AdminSignInPage";
import { ProtectedAdminRoute, PublicRoute } from "../pages/AdminPannel/ProtectedAdminRoute";
import AdminPannelPage from "@/pages/AdminPannelPages/AdminPannel";
import PropertiesPage from "../pages/AdminPannelPages/PropertiesPage";
import AgentsPage from "@/pages/AdminPannelPages/AgentsPage";
import AdminsPage from "@/pages/AdminPannelPages/AdminsPage";
import { AgentProvider } from '@/components/AdminPannelAgents/context/AgentContext';

const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/buy",
                element: <Buy></Buy>
            },
            {
                path: "/rent",
                element: <Rent></Rent>
            },
            {
                path: "/property-details",
                element: <PropertyDetails></PropertyDetails>
            },
            {
                path: "/off-plan-properties",
                element: <OffPlanListingPage></OffPlanListingPage>
            },

            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/agent",
                element: <AgentProfileCard></AgentProfileCard>
            },
            {
                path: "/our-team",
                element: <TeamPage></TeamPage>
            },
            {
                path: "/off-plan-single",
                element: <OffPlanSinglePage></OffPlanSinglePage>
            },

        ]
    },
    {

        element: <ProtectedAdminRoute />,
        children: [
            {
                path: "/admin-pannel",
                element: <AdminPannelPage />,
                children: [

                    {
                        index: true, // 👈 default path under /admin-pannel
                        element: <Navigate to="properties" replace />
                      },
                    {
                        path: "properties",
                        element: <PropertiesPage></PropertiesPage>
                    },
                    {
                        path: "agents",
                        element: <AgentProvider><AgentsPage /></AgentProvider>  
                    },
                    {
                        path: "admins",
                        element: <AdminsPage></AdminsPage>
                    }
                ]

            },


        ]
    },

    {
        element: <PublicRoute />,
        children: [
            {
                path: "/admin-login",
                element: <AdminSIgnInPage></AdminSIgnInPage>
            }
        ]
    }
])

export default router;