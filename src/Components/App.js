import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import styled, {ThemeProvider} from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Theme from '../Styles/Theme';
import Routes from './Routes';
import Footer from './Footer';
import {HashRouter as Router} from 'react-router-dom';
import Header from './Header';
import {Auth} from 'aws-amplify';
import {useIsLoggedIn, useSetIsLoggedIn} from '../Contexts/AuthContext';

const Wrapper = styled.div `
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default() => {
    const isLoggedIn = useIsLoggedIn();
    const setIsLoggedIn = useSetIsLoggedIn();
    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));

    }

    const verifyAuthentication = async() => {
        try {
            // 너무 빨리 리디렉션 페이지로 이동하면 토큰이 전에 인증이 수행될 수 있다. await delay(1000);
            await Auth.currentAuthenticatedUser();
            //console.log("user: ", user); console.log(await Auth.currentCredentials());
            setIsLoggedIn(true);
        } catch (error) {
            console.log("error: ", error);
            //setIsLoggedIn(false); console.log('error: ', error);
            await delay(1500);
            await Auth.currentAuthenticatedUser();
            setIsLoggedIn(true);
        }
    }

    verifyAuthentication();

    return (
        <ThemeProvider theme={Theme}>
            <> 
                <GlobalStyles/>
                <Router>
                    <> 
                        {isLoggedIn && <Header/>} 
                        <Wrapper>
                            <Routes isLoggedIn={isLoggedIn}/>
                        <Footer/>
                    </Wrapper>
                    </>
                </Router>
                <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
             </>
        </ThemeProvider>
    );
};