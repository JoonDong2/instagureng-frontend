import React from "react";
import styled from "styled-components";
import Helmet from "rl-react-helmet";
import {useQuery} from "@apollo/react-hooks";
import Loader from "../Components/Loader";
import { gql } from "apollo-boost";
import SinglePost from "../Components/SinglePost";


const GET_POST = gql`
    query searchPostById($postId: Int!){
        searchPostById(postId: $postId) {
            id
            location
            caption
            user {
                id
                avatar
                userName
                fullName
                firstName
                isFollowing
                isSelf
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

export default ({match: {params: {postid}}}) => {
    const {data, loading} = useQuery(GET_POST, {
        variables: {
            postId: Number(postid)
        }
    });

    let post;

    if(data && data.searchPostById) {
        post = data.searchPostById;
    }

     return <Wrapper>
                <Helmet>
                    <title>Post | Prismagram</title>
                </Helmet>
                {loading && <Loader/>}
                {!loading && post !== undefined &&
                <SinglePost 
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
                }
            </Wrapper>
}