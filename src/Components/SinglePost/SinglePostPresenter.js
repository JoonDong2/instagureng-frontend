import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./SinglePostPresenter.css";
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { Link } from "react-router-dom";
import FollowBUtton from "../FollowButton";

const Wrapper = styled.div `
    min-height: 65vh;
`;

const PostWrapper = styled.div `
    min-height: 560px;
    width: ${props => props.theme.maxWidth};
    ${props => props.theme.whiteBox};
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: 3fr 2fr;
`;

const ImageWrapper = styled.div ``;

const ContentsWrapper = styled.div ``;

const Header = styled.header `
    display: flex;
    padding: 10px 0;
    margin-bottom: 10px;
    align-items: center;
`;

const UserColumn = styled.div `
    font-size: 18px;
    margin-left: 20px;
    margin-right: 40px;
    a {
        color: inherit;
        text-decoration: none;
    }
`;

const Location = styled.span `
    display: block;
    margin-top: 5px;
    font-size: 14px;
`;

const FollowButtonWrapper = styled.span `
    width: 100px;
`;

const Contents = styled.div `
    height: 360px;
    overflow-y: scroll;
    margin-bottom: 15px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;

const Timestamp = styled.span `
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGrayColor} 1px solid;
`;

const DotsWrapper = styled.div `
    width: 100%;
    height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextareaWrapper = styled.div `
    position: relative;
`;

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

const Button = styled.span`
    cursor: pointer;
`;

const Buttons = styled.div`
    user-select: none;
    ${Button} {
        &:first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const Caption = styled.div`
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.li`
    margin-bottom: 7px;
    span {
        margin-right: 5px;
    }
`;

const NO_IMAGE = "https://1.bp.blogspot.com/-ssydQ-xUiWM/Xode8helg9I/AAAAAAAAIVY/wITUEaec8sEIw_jophkJfVUvR7zEsEsrACLcBGAsYHQ/s1600/no_image.webp";

export default ({
    user: {userName, avatar, id, isFollowing, isSelf, fullName, firstName},
    location,
    files,
    isLiked,
    likesCount,
    createdAt,
    newComment,
    toggleLike,
    onKeyPress,
    allComments,
    commenting,
    caption
}) => {
    let images;
    if(files.length === 0) {
        images = [{
            original: NO_IMAGE,
            thumbnail: NO_IMAGE,
        }];
    } else {
        images = files.map(file => {
            return {
                original: file.url,
                thumbnail: file.url,
            };
        });
    }

    return (
        <Wrapper>
                <PostWrapper>
                    <ImageWrapper>
                        <ImageGallery
                            items={images}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            useBrowserFullscreen={false}
                            showThumbnails={files.length === 0 ? false : true}/>
                    </ImageWrapper>
                    <ContentsWrapper>
                        <Header>
                            <Avatar size="md" url={avatar}/>
                            <UserColumn>
                                <Link to={`/u/${userName}`}>
                                    <FatText text={fullName || firstName || userName}/>
                                </Link>
                                <Location>{location}</Location>
                            </UserColumn>
                            <FollowButtonWrapper>
                                {isSelf === true ? null : <FollowBUtton isFollowing={isFollowing} id={id}/>}
                            </FollowButtonWrapper>
                        </Header>
                        <Contents>
                            {caption ? <Caption>{caption}</Caption> : null}
                            {allComments && (
                                <Comments>
                                    {allComments.map(comment => (
                                    <Comment key={comment.id}>
                                    <FatText text={comment.user.fullName || comment.user.firstName}/>
                                    {comment.text}
                                </Comment>
                        ))}
                    </Comments>
                )}
                        </Contents>
                        <Buttons>
                            <Button onClick={toggleLike}>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
                            <Button>
                                <CommentIcon />
                            </Button>
                        </Buttons>
                <FatText text={likesCount === 1 ? "1 like" : `${likesCount} likes`}/>
                        <Timestamp>{createdAt}</Timestamp>
                        <TextareaWrapper>
                            {commenting
                                ? (
                                    <DotsWrapper>
                                        <Dots/>
                                    </DotsWrapper>

                                )
                                : (<Textarea
                                    placeholder={"Add a comment..."}
                                    value={newComment.value}
                                    onChange={newComment.onChange}
                                    onKeyPress={onKeyPress}/>)}
                        </TextareaWrapper>
                    </ContentsWrapper>
                </PostWrapper>
            </Wrapper>
        );
}