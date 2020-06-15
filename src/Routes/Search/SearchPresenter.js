import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
    min-height: 65vh;
`;

const CardWrapper = styled.div`
    width: 220px;
    margin-right: 20px;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const SquarePostsWrapper = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {    
    if(loading === true) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if(data && data.searchUser && data.searchPost) {
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 1024 },
              items: 4,
            },
            desktop: {
              breakpoint: { max: 1024, min: 700 },
              items: 3,
            },
            tablet: {
              breakpoint: { max: 700, min: 450 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 450, min: 0 },
              items: 1,
            },
          };

        return (
            <Wrapper>
                <Section>
                    {data.searchUser.length > 0 && 
                        (
                                <Carousel responsive={responsive}>
                                    {data.searchUser.map(user => (
                                        <CardWrapper key={user.id}>
                                            <UserCard
                                                id={user.id}
                                                userName={user.userName}
                                                name = {user.fullName || user.firstName || user.userName}
                                                isFollowing={user.isFollowing}
                                                url={user.avatar}
                                                isSelf={user.isSelf} />
                                        </CardWrapper>
                                    )
                                )}
                                </Carousel>
                        )
                    }
                </Section>
                <Section>
                    {data.searchPost.length > 0 &&
                    (
                        <SquarePostsWrapper>
                            {data.searchPost.map(post => (
                                <SquarePost key={post.id}
                                            id={post.id}
                                            likesCount={post.likesCount}
                                            commentsCount={post.commentsCount}
                                            files={post.files}/>
                            ))}
                        </SquarePostsWrapper>
                    )}
                </Section>
                {data.searchUser.length === 0 && data.searchPost.length === 0 && (
                    <Wrapper><FatText text="No search results." /></Wrapper>
                )}
            </Wrapper>
        );
    } else {
        return (
            <Wrapper><FatText text="Something went wrong." /></Wrapper>
        )
    }
};

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
}

export default SearchPresenter;