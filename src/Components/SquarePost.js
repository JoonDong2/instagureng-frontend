import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";
import { Link } from "react-router-dom";

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity .2s linear;
    svg {
        fill: white;
    }
`;

const Container = styled(Link)`
    background-image: url(${props => props.bg});
    background-size: cover;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        ${Overlay} {
            opacity: 1;
        }
    }
`;

const Number = styled.div`
    color: white;
    display: flex;
    align-items: center;
    &:first-child {
        margin-right: 30px
    }
`;

const NUmberText = styled.span`
    margin-left: 10px;
    font-size: 16px;
`;

const NO_IMAGE = "https://1.bp.blogspot.com/-ssydQ-xUiWM/Xode8helg9I/AAAAAAAAIVY/wITUEaec8sEIw_jophkJfVUvR7zEsEsrACLcBGAsYHQ/s1600/no_image.webp";

const SquarePost = ({id, likesCount, commentsCount, files}) => {
    let image;

    if(files.length === 0) {
        image = NO_IMAGE;
    } else {
        image = files[0].url;
    }
    return (
        <Container bg={image} to={`/p/${id}` }>
            <Overlay>
                <Number>
                    <HeartFull />
                    <NUmberText>{likesCount}</NUmberText>
                </Number>
                <Number>
                    <CommentFull />
                    <NUmberText>{commentsCount}</NUmberText>
                </Number>
            </Overlay>
        </Container>
    );

}

SquarePost.propTypes = {
    likesCount: PropTypes.number.isRequired,
    commentsCount: PropTypes.number.isRequired,
  };

export default SquarePost;