import { Suspense, lazy } from 'react'

const AppLayout = lazy(() => import('@/layouts/AppLayout'))
const DashboardView = lazy(() => import('@/views/DashboardView'))
const CreateProjectView = lazy(() => import('@/views/projects/CreateProjectView'))
const EditProjectView = lazy(() => import('./views/projects/EditProjectView'))
const ProjectDetailsView = lazy(() => import('./views/projects/ProjectDetailsView'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'))
const LoginView = lazy(() => import('@/views/auth/LoginView'))
const RegisterView = lazy(() => import('@/views/auth/RegisterView'))
const ConfirmAccountView = lazy(() => import('@/views/auth/ConfirmAccountView'))
const RequestNewCodeView = lazy(() => import('@/views/auth/RequestNewCodeView'))
const ForgotPasswordView = lazy(() => import('@/views/auth/ForgotPasswordView'))
const NewPasswordView = lazy(() => import('@/views/auth/NewPasswordView'))
const ProjectTeamView = lazy(() => import('@/views/projects/ProjectTeamView'))
const ProfileView = lazy(() => import('./views/profile/ProfileView'))
const ChangePasswordView = lazy(() => import('./views/profile/ChangePasswordView'))
const ProfileLayout = lazy(() => import('./layouts/ProfileLayout'))
const NotFound = lazy(() => import('./views/404/NotFound'))

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import ErrorBoundary from './components/ErrorBoundary'

export default function Router() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route element={<AppLayout />} > 
                            <Route path="/" element={<DashboardView/>} index/>
                            <Route path="/projects/create" element={<CreateProjectView/>} />
                            <Route path="/projects/:projectId" element={<ProjectDetailsView/>} />
                            <Route path="/projects/:projectId/edit" element={<EditProjectView/>} />
                            <Route path="/projects/:projectId/team" element={<ProjectTeamView/>}/>

                            <Route element={<ProfileLayout />}>
                                <Route path="/profile" element={<ProfileView/>} />
                                <Route path="/profile/password" element={<ChangePasswordView/>} />
                            </Route>
                        </Route>

                        <Route element={<AuthLayout />} >
                            <Route path="/auth/login" element={<LoginView />} />
                            <Route path="/auth/register" element={<RegisterView />} />
                            <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                            <Route path="/auth/new-code" element={<RequestNewCodeView />} />
                            <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                            <Route path="/auth/reset-password" element={<NewPasswordView />} />
                        </Route>

                        <Route element={<AuthLayout />} >
                            <Route path='/404' element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </ErrorBoundary>

        </BrowserRouter>
    )
}