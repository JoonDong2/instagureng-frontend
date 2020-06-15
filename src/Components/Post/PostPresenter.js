import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./PostPresenter.css";
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { Link } from "react-router-dom";

const Post = styled.div`
    ${props => props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
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

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
    a {
        color: inherit;
        text-decoration: none;
    }
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
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
    padding: 15px;
`;

const Meta = styled.div`
    padding: 15px;
`;

const Timestamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGrayColor} 1px solid;
`;

const TextareaWrapper = styled.div`
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

const DotsWrapper = styled.div`
    width: 100%;
    height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default ({
    user: {userName, avatar, fullName, firstName},
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
    const images = files.map(file => {
        return {
            original: file.url,
            thumbnail: file.url,
        };
    });

    return (
        <Post>
            <Header>
                <Avatar size="sm" url={avatar} />
                <UserColumn>
                    <Link to={`/u/${userName}`}>
                        <FatText text={fullName || firstName}/>
                    </Link>
                    <Location>{location}</Location>
                </UserColumn>
            </Header>
            <ImageGallery items={images} showPlayButton={false} 
                                         showFullscreenButton={false} 
                                         useBrowserFullscreen={false}/>
            {caption ? <Caption>{caption}</Caption> : null}
            <Meta>
                <Buttons>
                    <Button onClick={toggleLike}>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
                    <Button>
                        <CommentIcon />
                    </Button>
                </Buttons>
                <FatText text={likesCount === 1 ? "1 like" : `${likesCount} likes`}/>
                {allComments && (
                    <Comments>
                        {allComments.map(comment => (
                            <Comment key={comment.id}>
                                <FatText text={comment.user.fulName || comment.user.firstName}/>
                                {comment.text}
                            </Comment>
                        ))}
                    </Comments>
                )}
                <Timestamp>{createdAt}</Timestamp>
                <TextareaWrapper>
                    {commenting ? (
                        <DotsWrapper>
                            <Dots />
                        </DotsWrapper>
                        
                    ) : (
                        <Textarea
                            placeholder={"Add a comment..."} 
                            value={newComment.value}
                            onChange={newComment.onChange}
                            onKeyPress={onKeyPress}/>
                    )}
                </TextareaWrapper>
            </Meta>
        </Post>
    );
}