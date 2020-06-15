import React from "react";
import styled from "styled-components";
import Button from "../Button"
import { Dots } from 'react-activity';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;


const DotsWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
`;

const FollowButtonPresenter = ({ isFollowing, isUpdating, onClick }) => {
    return (
        <Wrapper onClick={onClick}>
            {isUpdating && (
                <DotsWrapper>
                    <Dots />
                </DotsWrapper>
            )}
            <Button text={isFollowing ? "Unfollow" : "Follow"}/>
        </Wrapper>
    );
}

export default FollowButtonPresenter;