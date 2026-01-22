import {type FC, type ReactNode, useLayoutEffect} from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC<{ children: ReactNode }> = ({ children }) => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.getElementById('full-content')?.scrollTo(0, 0);
    }, [pathname]);

    return <>{children}</>;
};

export default ScrollToTop;