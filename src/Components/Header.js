import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Link, withRouter } from 'react-router-dom';
import { Logo, Compass, HeartEmpty, User } from "./Icons"
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Auth } from 'aws-amplify';
import { useSetIsLoggedIn, useIsLoggedIn } from '../Contexts/AuthContext';

const Header = styled.header`
    width: 100%;
    border: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;
    z-index: 5;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${props => props.theme.maxWidth};
    display: flex;
    justify-content: center;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }
    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${props => props.theme.boxColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 70%;
    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;

const HeaderLink = styled(Link)`
    user-select: none;
    &:not(:last-child) {
        margin-right: 30px;
    }
`;

const HeaderButton = styled.span`
    user-select: none;
    margin-right: 30px;
    cursor: pointer;
`;

const ME = gql`
    {
        me {
            userName
        }
    }
`;

const signOut = async () => {
    try {
        await Auth.signOut();
    } catch (e){
        console.log(e);
    }
}

const HEADER = ({ history }) => {
    const search = useInput("");
    const { data, loading } = useQuery(ME);
    const onSearchSubmit = e => {
        e.preventDefault();
        history.push(`/s/${search.value}`);
    }
    const isLoggedIn = useIsLoggedIn();
    const setIsLoggedIn = useSetIsLoggedIn();

    if(isLoggedIn === true && loading === false && data === undefined) {
        signOut();
        setIsLoggedIn(false);
    }

    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <HeaderLink to="/">
                        <Logo/>
                    </HeaderLink>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput {...search} placeholder="Search"/>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass />
                    </HeaderLink>
                    <HeaderButton>
                        <HeartEmpty />
                    </HeaderButton>
                    {!data ? (
                        <HeaderLink to="/">
                            <User/>
                        </HeaderLink>
                    ) : (
                        <HeaderLink to={`/u/${data.me.userName}`}>
                            <User/>
                        </HeaderLink>
                    )}
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    );
};

export default withRouter(HEADER);