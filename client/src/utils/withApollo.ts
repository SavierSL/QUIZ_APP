import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:5001/graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        //Query
        // Query: {
        //   fields: {
        //     //posts query
        //     posts: {
        //       //DONT FORGET TO ADD KEY ARGS
        //       //key args of posts
        //       keyArgs: [],
        //       merge(
        //         existing: PaginatedPosts | undefined,
        //         incoming: PaginatedPosts
        //       ): PaginatedPosts {
        //         //Adding new posts
        //         return {
        //           ...incoming,
        //           posts: [...(existing?.posts || []), ...incoming.posts],
        //         };
        //       },
        //     },
        //   },
        // },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
