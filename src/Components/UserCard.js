import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";

const Card = styled.div`
  user-select: none;
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;


const ELink = styled(Link)`
  user-select: none;
  color: inherit;
  margin-top: 10px;
  margin-bottom: 15px;
  &:hover {
    color: ${props => props.theme.blueColor}
  }
  transition: 0.3s;
  text-decoration: none;
`;

const UserCard = ({ id, userName, name, isFollowing, url, isSelf }) => (
    <Card>
        <Avatar url={url} size={"md"} />
        <ELink to={`/u/${userName}`}>
          <FatText text={name}/>
        </ELink>
        {isSelf === false ? <FollowButton id={id} isFollowing={isFollowing}/> : <div>It's me</div>}
    </Card>
);

UserCard.propTypes = {
  userName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;