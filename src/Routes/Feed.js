import React from "react";
import styled from "styled-components";
import Helmet from "rl-react-helmet";
import {useQuery} from "@apollo/react-hooks";
import Loader from "../Components/Loader";
import { gql } from "apollo-boost";
import Post from "../Components/Post";

export const FEED_QUERY = gql`
    {
        seeFeed {
            id
            location
            caption
            user {
                id
                avatar
                userName
                fullName
                firstName
            }
            files {
                id
                url
            }
            likesCount
            isLiked
            comments {
                id
                user {
                    userName
                    fullName
                    firstName
                }
                text
            }
            createdAt
        }
    }
`;

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 75vh;
`;

export default() => {
    const {data, loading} = useQuery(FEED_QUERY);
    
    return <Wrapper>
                <Helmet>
                    <title>Feed | Prismagram</title>
                </Helmet>
                {loading && <Loader/>}
                {!loading &&
                 data &&
                 data.seeFeed &&
                 data.seeFeed.map(post => (
                     <Post 
                        key={post.id}
                        id={post.id}
                        user={post.user}
                        files={post.files}
                        likesCount={post.likesCount}
                        isLiked={post.isLiked}
                        location={post.location}
                        caption={post.caption}
                        comments={post.comments}
                        createdAt={post.createdAt}/>
                 ))}
            </Wrapper>
};