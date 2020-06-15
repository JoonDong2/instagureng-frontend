import React from "react";
import SearchPresenter from "./SearchPresenter"
import { useQuery } from "@apollo/react-hooks";
import { SEARCH } from "./SearchQueries";
import { Helmet } from "rl-react-helmet";

export default ({match: {params: {term}}}) => {
    const { data, loading } = useQuery(SEARCH, {
        skip: term === undefined,
        variables: {
            term
        },
        
    });

    return (
    
        <>
            <Helmet>
                <title>Search | Prisma</title>
            </Helmet>
            <SearchPresenter searchTerm={term} loading={loading} data={data}/>
        </>
    );
}