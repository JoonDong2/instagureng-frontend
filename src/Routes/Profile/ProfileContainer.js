import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "./ProfileQueries";
import { Auth } from "aws-amplify";
import { useSetIsLoggedIn } from "../../Contexts/AuthContext";

const ProfileContainer = ({match: {params: {username}}}) => {
    const setIsLoggedIn = useSetIsLoggedIn();

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            userName: username
        },
        fetchPolicy: "network-only"
    });

    const logOut = async () => {
        await Auth.signOut();
        setIsLoggedIn(false);
    }

    return <ProfilePresenter loading={loading} logOut={logOut} data={error === undefined ? data : null}/>
}

export default ProfileContainer;