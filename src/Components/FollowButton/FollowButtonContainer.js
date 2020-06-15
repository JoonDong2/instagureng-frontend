import React, {useState} from "react";
import FollowButtonPresenter from "./FollowButtonPresenter";
import {useMutation} from "@apollo/react-hooks";
import {TOGGLE_FOLLOW} from "./FollowButtonQueries";
import { FEED_QUERY } from "../../Routes/Feed";

const FollowButtonContainer = ({id, isFollowing}) => {
    const [isFollowingS,
        setIsFollowingS] = useState(isFollowing);
    const [isUpdating,
        setIsUpdating] = useState(false);
    const [toggleFollowMutation] = useMutation(TOGGLE_FOLLOW, {
        variables: {
            id: Number(id)
        },
        refetchQueries: [{query: FEED_QUERY}]
    });

    const onClick = async(event) => {
        event.preventDefault();
        if (isUpdating === false) {
            let result = false;

            setIsUpdating(true);

            try {
                result = await toggleFollowMutation();
            } catch (error) {
                console.log(error);
                result = false;
            }

            if (result) {
                setIsFollowingS(!isFollowingS);
            }

            setIsUpdating(false);
        }
    }

    return <FollowButtonPresenter
                isFollowing={isFollowingS}
                isUpdating={isUpdating}
                onClick={onClick}/>
}

export default FollowButtonContainer;