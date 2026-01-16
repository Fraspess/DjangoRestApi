import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import ScrollToTop from "./functional/ScrollToTop.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId="619489303259-scktjpt2necmrb8hp9g53kp6r219ni9v.apps.googleusercontent.com">
                <ScrollToTop>
                    <App/>
                </ScrollToTop>
            </GoogleOAuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
