import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router";
import { Navigate } from 'react-router';


//Hooks
import { useAuth } from "./hooks/useAuth";
import usePageTitle from "./hooks/usePageTitle";

// Layouts
import MainLayout from "./components/Layouts/MainLayout";
import AuthLayout from "./components/Layouts/AuthLayout";
import ProtectedLayout from "./components/Layouts/ProtectedLayout";
import SurveyLayout from "./components/Layouts/SurveyLayout";
import GuestLayout from "./components/Layouts/GuestLayout";
import SwotLayout from './components/Layouts/SwotLayout';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './components/Layouts/AdminLayout';

const SidebarLayout = lazy(() => import('./components/Layouts/SidebarLayout'));
const ReportLayout = lazy(() => import('./components/Layouts/ReportLayout'));

// Pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Landing = lazy(() => import('./pages/Landing'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileSetup = lazy(() => import('./pages/ProfileSetup'));
const GVHForm = lazy(() => import('./pages/gvh/GVHForm'));
const ProjectList = lazy(() => import('./pages/gvh/ProjectList'));
const ProjectLanding = lazy(() => import('./pages/gvh/ProjectLanding'));
const Strategics = lazy(() => import('./pages/projects/Strategics'));
const StrategicUser = lazy(() => import('./pages/StrategicUser'));
const QuarterReport = lazy(() => import('./pages/projects/QuarterReport'));
const QuarterReportAI = lazy(() => import('./pages/projects/QuarterReportAI'));
const SearchProject = lazy(() => import('./pages/projects/SearchProject'));
const StrategicReport = lazy(() => import('./pages/report/Strategic'));
const StrategicDashboard = lazy(() => import('./pages/report/StrategicDashboard'));
const SwotLanding = lazy(() => import('./pages/swot/SwotLanding'));
const SwotDetail = lazy(() => import('./pages/swot/SwotDetail'));
const SwotGroup = lazy(() => import('./pages/swot/SwotGroup'));

const PibullGame = lazy(() => import('./pages/util/PibullGame'));
const PibullGameTable = lazy(() => import('./pages/util/PibullGameTable'));

const RegisterForm = lazy(() => import('./pages/forms/RegisterForm'));

// Admin Form Builder
const RegistrationSettings = lazy(() => import('./pages/admin/RegistrationSettings'));
const FormsList = lazy(() => import('./pages/admin/FormsList'));
const FormBuilder = lazy(() => import('./pages/admin/FormBuilder'));
const FormSubmissionsViewer = lazy(() => import('./pages/admin/FormSubmissionsViewer'));
const SurveyDashboard = lazy(() => import('./pages/admin/SurveyDashboard'));
const AdminFormRenderer = lazy(() => import('./components/Forms/DynamicFormRenderer'));
const ScriptEditor = lazy(() => import('./pages/admin/ScriptEditor'));
const ScriptFormRunner = lazy(() => import('./components/Forms/ScriptFormRunner'));
const FormAccessManagement = lazy(() => import('./pages/admin/FormAccessManagement'));
const FormBySlug = lazy(() => import('./components/Forms/FormBySlug'));

// User Role & Permission Management
const UsersManagement = lazy(() => import('./pages/admin/UsersManagement'));
const RolesManagement = lazy(() => import('./pages/admin/RolesManagement'));
const PermissionsManagement = lazy(() => import('./pages/admin/PermissionsManagement'));

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// External User Dashboard Route
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

export default function AppRoutes() {
  usePageTitle();
  return (
    <>
      <Toaster position="top-center" />
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

          <Route path="/profile/setup" element={
            <ProfileSetup />
          } />


          <Route path="strategic" element={<SidebarLayout />} >
            <Route index element={<Home />} />
            <Route path="projects/:year" element={<Strategics />} />
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
            <Route element={<ReportLayout />}>
              <Route path="dashboard" element={<StrategicDashboard />} />
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

          <Route path="gvh/:year/:uuid/:phrase" element={
            <SurveyLayout>
              <GVHForm />
            </SurveyLayout>
          } />

          <Route path="gvh/:year/:uuid" element={
            <SurveyLayout>
              <ProjectLanding />
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

          <Route path="/swot" element={<SwotLayout />} >
            <Route index element={<SwotLanding />} />

            <Route path=":id" element={<SwotDetail />} />

            <Route path="group/:group_id" element={<SwotGroup />} />

          </Route>

          <Route path="/pibulgames" element={
            <PibullGame />
          } />
          <Route path="/pibulgames/table" element={
            <PibullGameTable />
          } />

          <Route path="/f/p0001" element={
            <RegisterForm />
          } />

          <Route path="/f/:slug" element={
            <FormBySlug />
          } />

          {/* Admin Routes - Internal Users Only */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/forms" replace />} />

            <Route path="forms" element={<FormsList />} />
            <Route path="forms/new" element={<FormBuilder />} />
            <Route path="forms/new-script" element={<ScriptEditor />} />
            <Route path="forms/:uuid/edit" element={<FormBuilder />} />
            <Route path="forms/:uuid/script" element={<ScriptEditor />} />
            <Route path="forms/:uuid/submissions" element={<FormSubmissionsViewer />} />
            <Route path="survey-dashboard" element={<SurveyDashboard />} />
            <Route path="registration-settings" element={<RegistrationSettings />} />
            <Route path="form-access" element={<FormAccessManagement />} />

            {/* User Role & Permission Management */}
            <Route path="users" element={<UsersManagement />} />
            <Route path="roles" element={<RolesManagement />} />
            <Route path="permissions" element={<PermissionsManagement />} />
          </Route>

          {/* External User Dashboard */}
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* Public Form Rendering Routes */}
          <Route path="/forms/:uuid" element={
            <ScriptFormRunner />
          } />

          <Route path="/forms-schema/:uuid" element={
            <AdminFormRenderer />
          } />



        </Routes>
      </Suspense>
    </>
  );
}
