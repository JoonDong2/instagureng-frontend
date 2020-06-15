import React, {useState} from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import {useMutation} from "@apollo/react-hooks";
import {TOGGLE_LIKE, ADD_COMMENT} from "./PostQueries";
import useInputV2 from "../../Hooks/useInputV2";
import { FEED_QUERY } from "../../Routes/Feed";

const PostContainer = ({
    id,
    user,
    files,
    likesCount,
    isLiked,
    location,
    caption,
    comments,
    createdAt,
}) => {
    const date_temp = createdAt.split("T");
    const time_temp = date_temp[1].split(":");
    const date = `${date_temp[0]} ${time_temp[0]}:${time_temp[1]}`
    const [isLikedS, setIsLikedS] = useState(isLiked);
    const [likesCountS, setLikesCountS] = useState(likesCount);
    const newComment = useInputV2("");
    const [allComments, setAllComments] = useState([...comments]);
    const [commenting, setCommenting] = useState(false);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: Number(id)
        },
        refetchQueries: [{query:FEED_QUERY}]
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: {
            postId: Number(id),
            text: newComment.value
        },
        refetchQueries: [{query:FEED_QUERY}]
    });

    const toggleLike = async() => {
        const isLikedS_backup = isLikedS;
        const likesCountS_backup = likesCountS;

        if (isLikedS === true) {
            setIsLikedS(false);
            setLikesCountS(likesCountS - 1);
        } else {
            setIsLikedS(true);
            setLikesCountS(likesCountS + 1);
        }

        let toggleComplete = false;

        try {
            const result = await toggleLikeMutation();
            if(result?.data?.toggleLike !== undefined) {
                toggleComplete = true;
            }
        } catch (error) {
            toggleComplete = false;
        }

        // 데이터베이스에서 토글을 실패하면 원상복구 시킨다.
        if (toggleComplete !== true) {
            setIsLikedS(isLikedS_backup);
            setLikesCountS(likesCountS_backup);
        }
    };

    const onKeyPress = async(event) => {
        const {which} = event;

        if (which === 13) {
            event.preventDefault();

            const newComment_backup = newComment.value;

            try {
                setCommenting(true);
                const {data: {
                        addComment
                    }} = await addCommentMutation();
                setCommenting(false);

                if(addComment.text === newComment_backup) {
                    newComment.setValue("");
                    setAllComments([...allComments, addComment])
                }

            } catch (error) {}
        }
    }

    return (<PostPresenter
        user={user}
        files={files}
        likesCount={likesCountS}
        location={location}
        caption={caption}
        isLiked={isLikedS}
        allComments={allComments}
        createdAt={date}
        newComment={newComment}
        setIsLiked={setIsLikedS}
        setLikeCount={setLikesCountS}
        toggleLike={toggleLike}
        commenting={commenting}
        onKeyPress={onKeyPress}/>);
}

PostContainer.propsTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes
        .shape({id: PropTypes.string.isRequired, avatar: PropTypes.string, userName: PropTypes.string.isRequired})
        .isRequired,
    files: PropTypes
        .arrayOf(PropTypes.shape({id: PropTypes.string.isRequired, url: PropTypes.string.isRequired}))
        .isRequired,
    likesCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    comments: PropTypes
        .arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string,
        user: PropTypes
            .shape({id: PropTypes.string.isRequired, userName: PropTypes.string.isRequired})
            .isRequired
    }))
        .isRequired,
    createdAt: PropTypes.string
};

export default PostContainer;