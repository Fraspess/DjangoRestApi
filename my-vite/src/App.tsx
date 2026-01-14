import './App.css';
import RegisterPage from './pages/register/RegisterPage.tsx'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/layout/layout.tsx";
import MainPage from "./pages/main/MainPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import ForgotPasswordPage from "./pages/forgotpassword/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/resetpassword/ResetPasswordPage.tsx";
import SuccessPage from "./pages/forgotpassword/SuccessPage.tsx";
function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<DefaultLayout/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path={`/reset-password`} element={<ResetPasswordPage />} />
                    <Route path="/success-reset-password" element={<SuccessPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
