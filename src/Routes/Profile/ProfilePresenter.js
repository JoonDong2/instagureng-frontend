import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Helmet from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FollowButton from "../../Components/FollowButton"
import FatText from "../../Components/FatText";
import SquarePost from "../../Components/SquarePost";
import Theme from "../../Styles/Theme";

const Wrapper = styled.div `
    min-height: 65vh;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Header = styled.header `
    width: 70%;
    height: auto;
    display: grid;
    grid-template-columns: 250px 1fr;
    margin-bottom: 40px;
`;

const HeaderColumn = styled.div`

`;

const UserNameRow = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.div`
    font-size: 26px;
    display: block;
    margin-right: 30px;
`;

const FollowButtonWrapper = styled.span`
    width: 100px;
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0px;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const FullName = styled(FatText)`
    font-size: 16px;
`;

const Bio = styled.p`
    margin: 10px 0px;
`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

const ProfilePresenter = ({loading, logOut, data}) => {
    if (loading === true) {
        return (
            <Wrapper>
                <Loader/>
            </Wrapper>
        )
    } else if (!loading && data && data.seeUser) {
        const {
            seeUser: {
                id,
                avatar,
                fullName,
                firstName,
                isFollowing,
                isSelf,
                bio,
                followingCount,
                followersCount,
                postsCount,
                posts
            }
        } = data;
        return (
            <Wrapper>
                <Helmet>
                    <title>{fullName || firstName} | Prismagram</title>
                </Helmet>
                <HeaderWrapper>
                    <Header>
                        <HeaderColumn>
                            <Avatar size="lg" url={avatar}/>
                        </HeaderColumn>
                        <HeaderColumn>
                                <UserNameRow>
                                    <UserName>{fullName || firstName}</UserName>
                                    {isSelf ? (
                                        <FollowButtonWrapper onClick={logOut}>
                                            <Button text="Log Out" color={Theme.redColor}/>
                                        </FollowButtonWrapper>
                                    ) : (
                                        <FollowButtonWrapper>
                                            <FollowButton isFollowing={isFollowing} id={id}/>
                                        </FollowButtonWrapper>
                                    )}
                                </UserNameRow>
                                <Counts>
                                    <Count>
                                        <FatText text={String(postsCount)} /> posts
                                    </Count>
                                    <Count>
                                        <FatText text={String(followersCount)} /> followers
                                    </Count>
                                    <Count>
                                        <FatText text={String(followingCount)} /> following
                                    </Count>
                                </Counts>
                                <FullName text={fullName} />
                                <Bio>{bio}</Bio>
                        </HeaderColumn>
                    </Header>
                </HeaderWrapper>
                
                <Posts>
                {posts &&
                 posts.map(post => (
                    <SquarePost
                        key={post.id}
                        id={post.id}
                        likesCount={post.likesCount}
                        commentsCount={post.commentsCount}
                        files={post.files}
                    />)
                )}
                </Posts>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <FatText text={"The user does not exist."} />  
            </Wrapper>
        );
    }
    
}

export default ProfilePresenter;