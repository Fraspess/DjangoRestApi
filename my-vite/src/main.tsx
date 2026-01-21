import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import ScrollToTop from "./functional/ScrollToTop.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <GoogleOAuthProvider
                    clientId="619489303259-scktjpt2necmrb8hp9g53kp6r219ni9v.apps.googleusercontent.com">
                    <ScrollToTop>
                        <App/>
                    </ScrollToTop>
                </GoogleOAuthProvider>
            </BrowserRouter>

        </Provider>
    </StrictMode>,
)
