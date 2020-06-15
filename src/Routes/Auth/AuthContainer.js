import React, {useState} from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import {toast} from "react-toastify";

import { Auth } from 'aws-amplify';
import { useSetIsLoggedIn } from "../../Contexts/AuthContext";

let existMessage = false;

export default() => {
    
    const setIsLoggedIn = useSetIsLoggedIn();
    const [action, setAction] = useState("logIn");

    const [loading, setLoading] = useState(false);

    const email = useInput("");
    const password = useInput("");
    const userName = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    
    const secret = useInput("");

    if(existMessage === false && window.location.href.includes("EmailExistError")) {
        toast.error("이미 동일한 이메일이 존재합니다.");
        existMessage = true;
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(loading === false) {
            setLoading(true);
            if (action === "logIn") {
                if (userName.value !== "") {
                    try {
                        const user = await Auth.signIn(userName.value, password.value);
                        console.log(user); 
                        setIsLoggedIn(true);
                    } catch ({ code }) {
                        if(code === "UserNotFoundException") {
                            toast.error("User does not exist.");
                        } else if(code === "UserNotConfirmedException") {
                            toast.error("Can't request secret, try again.");
                            setAction("confirm");
                        } else {
                            toast.error("Someting went wrong.");
                        }
                        console.log("error: ",code);
                    }
                } else {
                    toast.error("Email is required");
                }
            } else if (action === "signUp") {
                if (email.value !== "" && userName.value !== "" && password.value !== "" /*&& firstName.value !== "" && lastName.value !== ""*/) {
                    try {
                        await Auth.signUp({
                            password: password.value,
                            username: userName.value ,
                            attributes: {
                                email: email.value,
                                given_name: firstName.value,
                                family_name: lastName.value
                            }
                        });
                        setAction("confirm");
                        console.log('sign up success!');
                    } catch ({message}) {
                        console.log(message);
                        if(message.includes("EmailExistError_Prisma")) {
                            toast.error("동일한 사용자 이름이 이미 존재합니다.");
                        } else if(message.includes("EmailExistError_Cognito")) {
                            toast.error("동일한 이메일이 이미 존재합니다.");
                        } else {
                            toast.error("Something went wrong.");
                        }
                        /*if(code === "UsernameExistsException" || code === "UserLambdaValidationException") {
                            toast.error("동일한 사용자 이름이 이미 존재합니다.");
                        }  else {
                            toast.error("Something went wrong.");
                        }*/
                    }
                } else {
                    toast.error("All field are required.");
                }
            } else if (action === "confirm") {
                if (secret.value !== "") {
                    let confirmError = true;
                    try {
                        await Auth.confirmSignUp(userName.value, secret.value);
                        //console.log('confirm sign up success!');

                        await Auth.signOut();

                        confirmError = false;
                        await Auth.signIn(userName.value, password.value);
                        
                        //console.log(user);
                        setIsLoggedIn(true);
                    } catch ({ code }) {
                        console.log(code);
                        if(code === "NotAuthorizedException") {
                            if(confirmError) {
                                toast.error("이미 동일한 메일을 갖는 사용자가 있습니다.");
                            } else {
                                toast.error("Incorrenct password.");
                            }
                            
                            setAction("logIn");
                        } else if(code === "UserNotConfirmedException") {
                            toast.error("Can't confirm secret, check agrin.");
                        } else if(code === "CodeMismatchException") {
                            toast.error("Wrong secret.")
                        }
                         else {
                            toast.error("Someting went wrong.");
                        }
                        
                    }
                }
            }
            setLoading(false);
        }
        
    };

    return (<AuthPresenter
        action={action}
        setAction={setAction}
        email={email}
        password={password}
        userName={userName}
        firstName={firstName}
        lastName={lastName}
        secret={secret}
        onSubmit={onSubmit}
        loading={loading}/>);
};