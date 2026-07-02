import { createBrowserRouter, RouterProvider } from 'react-router';

import { lazy, Suspense } from 'react';
//import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router';

//Hooks
import { useAuth } from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";

// Layouts
import MainLayout from "../components/Layouts/MainLayout";
import AuthLayout from "../components/Layouts/AuthLayout";
import SurveyLayout from "../components/Layouts/SurveyLayout";
import GuestLayout from "../components/Layouts/GuestLayout";

const SidebarLayout = lazy(() => import('../components/Layouts/SidebarLayout'));
const ReportLayout = lazy(() => import('../components/Layouts/ReportLayout'));



// Pages
const LoginPage = lazy(() => import('../pages/LoginPage'));
const Register = lazy(() => import('../pages/Register'));
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Landing = lazy(() => import('../pages/Landing'));
const Profile = lazy(() => import('../pages/Profile'));
const GVHForm = lazy(() => import('../pages/gvh/GVHForm'));
const ProjectList = lazy(() => import('../pages/gvh/ProjectList'));
const Strategics = lazy(() => import('../pages/projects/Strategics'));
const StrategicUser = lazy(() => import('../pages/StrategicUser'));
const QuarterReport = lazy(() => import('../pages/projects/QuarterReport'));
const QuarterReportAI = lazy(() => import('../pages/projects/QuarterReportAI'));
const SearchProject = lazy(() => import('../pages/projects/SearchProject'));
const StrategicDashboard = lazy(() => import('../pages/StrategicDashboard'));
const StrategicReport = lazy(() => import('../pages/report/Strategic'));
const RegistrationSettings = lazy(() => import('../pages/admin/RegistrationSettings'));
const FormsList = lazy(() => import('../pages/admin/FormsList'));
const FormBuilder = lazy(() => import('../pages/admin/FormBuilder'));
const FormSubmissionsViewer = lazy(() => import('../pages/admin/FormSubmissionsViewer'));
const DynamicFormRenderer = lazy(() => import('../components/Forms/DynamicFormRenderer'));




const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // เช็คว่า Login หรือยัง
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/registration-settings",
    element: <RegistrationSettings />,
  },
  {
    path: "/admin/forms",
    element: <FormsList />,
  },
  {
    path: "/admin/forms/new",
    element: <FormBuilder />,
  },
  {
    path: "/admin/forms/:uuid/edit",
    element: <FormBuilder />,
  },
  {
    path: "/admin/forms/:uuid/submissions",
    element: <FormSubmissionsViewer />,
  },
  {
    path: "/forms/:uuid",
    element: <DynamicFormRenderer />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

/*export default function AppRoutes() {
  usePageTitle();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </PrivateRoute>
        } />

        <Route path="/login" element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        } />

        <Route path="/register" element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        } />

        <Route path="/str" element={
          <SidebarLayout><Home /></SidebarLayout>
        } />

        <Route path="/sprojects" element={
          <SidebarLayout>
            <Strategics />
          </SidebarLayout>
        } />

        {/* Public Routes 
        <Route path="strategic" element={<SidebarLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Strategics />} />
        </Route>
        

        <Route path="strategics">
          <Route index element={
            <SurveyLayout>
              <Strategics />
            </SurveyLayout>
          } />
          <Route element={<ReportLayout />}>
            <Route path="report" element={<StrategicReport />} />
          </Route>
        </Route>




        <Route path="/about" element={<About />} />

        <Route path="/strategic-users" element={<StrategicUser />} />

        <Route path="/search" element={
          <SurveyLayout>
            <SearchProject />
          </SurveyLayout>
        } />

        <Route path="/gvh" element={
          <SurveyLayout>
            <ProjectList />
          </SurveyLayout>
        } />

        <Route path="gvh/:uuid/:phrase" element={
          <SurveyLayout>
            <GVHForm />
          </SurveyLayout>
        } />




        <Route path="/quarterreport" element={
          <SurveyLayout>
            <QuarterReport />
          </SurveyLayout>
        } />

        <Route path="/quarterreport-ai" element={
          <SurveyLayout>
            <QuarterReportAI />
          </SurveyLayout>
        } />
      </Routes>
    </Suspense>
  );
}*/
