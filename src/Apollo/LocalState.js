export const defaults = {
    //isLoggedIn: localStorage.getItem("token") !== null ? true : false
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
    Mutation: {
        logUserIn: (_, { token }, { cache }) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    // 위에 있는 isLoggedIn과 다르다.
                    isLoggedIn: true
                }
            });
            window.location.href = "/"; // Apollo Client가 재실행되나?
            return null;
        },
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem("token");
            window.location.href = "/"; // Apollo Client가 재실행되나?
            return null;
        }
    }
};