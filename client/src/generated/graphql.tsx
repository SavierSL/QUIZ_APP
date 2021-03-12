import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getQuiz?: Maybe<Quiz>;
  getQuizSet?: Maybe<QuizSet>;
  getAnswerSet?: Maybe<AnswerSet>;
};


export type QueryGetQuizArgs = {
  id: Scalars['Int'];
};


export type QueryGetQuizSetArgs = {
  id: Scalars['Float'];
};


export type QueryGetAnswerSetArgs = {
  quizSetId: Scalars['Float'];
};

export type Quiz = {
  __typename?: 'Quiz';
  id: Scalars['Int'];
  creatorId: Scalars['Float'];
  itemNumber: Scalars['Float'];
  quizSetId: Scalars['Float'];
  quizSet?: Maybe<QuizSet>;
  question: Scalars['String'];
  multipleChoices?: Maybe<Array<MultipleChoices>>;
  answer: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type QuizSet = {
  __typename?: 'QuizSet';
  id: Scalars['Int'];
  creatorId: Scalars['Float'];
  title: Scalars['String'];
  quizzes?: Maybe<Array<Quiz>>;
  answerSet?: Maybe<AnswerSet>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AnswerSet = {
  __typename?: 'AnswerSet';
  id: Scalars['Int'];
  studentId: Scalars['Float'];
  quizSetId: Scalars['Float'];
  title: Scalars['String'];
  answers?: Maybe<Array<Answer>>;
  quizSet?: Maybe<QuizSet>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['Int'];
  studentId: Scalars['Float'];
  itemNumber: Scalars['Float'];
  answerSetId: Scalars['Float'];
  quizId: Scalars['Int'];
  question: Scalars['String'];
  answer: Scalars['String'];
  isCorrect: Scalars['Boolean'];
  answerSet?: Maybe<AnswerSet>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MultipleChoices = {
  __typename?: 'MultipleChoices';
  id: Scalars['Int'];
  quizId: Scalars['Int'];
  quiz: Quiz;
  letterItem: Scalars['String'];
  letterContent: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuizSet: QuizSet;
  makeQuiz: Quiz;
  createMultipleChoice: MultipleChoices;
  answer: Answer;
  createAnswerSet?: Maybe<AnswerSet>;
  registerStudent: ResponseField;
};


export type MutationCreateQuizSetArgs = {
  creatorId: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationMakeQuizArgs = {
  creatorId: Scalars['Float'];
  quizSetId: Scalars['Float'];
  answer: Scalars['String'];
  itemNumber: Scalars['Float'];
  question: Scalars['String'];
};


export type MutationCreateMultipleChoiceArgs = {
  quizId: Scalars['Float'];
  letterContent: Scalars['String'];
  letterItem: Scalars['String'];
};


export type MutationAnswerArgs = {
  answer: Scalars['String'];
  quizId: Scalars['Float'];
  itemNumber: Scalars['Float'];
  quizSetId: Scalars['Float'];
};


export type MutationCreateAnswerSetArgs = {
  quizSetId: Scalars['Float'];
};


export type MutationRegisterStudentArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type ResponseField = {
  __typename?: 'ResponseField';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  answerSets?: Maybe<Array<AnswerSet>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GetQuizQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetQuizQuery = (
  { __typename?: 'Query' }
  & { getQuiz?: Maybe<(
    { __typename?: 'Quiz' }
    & Pick<Quiz, 'id' | 'itemNumber' | 'quizSetId' | 'question' | 'answer'>
    & { quizSet?: Maybe<(
      { __typename?: 'QuizSet' }
      & Pick<QuizSet, 'id'>
    )>, multipleChoices?: Maybe<Array<(
      { __typename?: 'MultipleChoices' }
      & Pick<MultipleChoices, 'id' | 'quizId' | 'letterItem' | 'letterContent'>
    )>> }
  )> }
);


export const GetQuizDocument = gql`
    query getQuiz($id: Int!) {
  getQuiz(id: $id) {
    id
    itemNumber
    quizSetId
    question
    answer
    quizSet {
      id
    }
    multipleChoices {
      id
      quizId
      letterItem
      letterContent
    }
  }
}
    `;

/**
 * __useGetQuizQuery__
 *
 * To run a query within a React component, call `useGetQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuizQuery(baseOptions: Apollo.QueryHookOptions<GetQuizQuery, GetQuizQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizQuery, GetQuizQueryVariables>(GetQuizDocument, options);
      }
export function useGetQuizLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizQuery, GetQuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizQuery, GetQuizQueryVariables>(GetQuizDocument, options);
        }
export type GetQuizQueryHookResult = ReturnType<typeof useGetQuizQuery>;
export type GetQuizLazyQueryHookResult = ReturnType<typeof useGetQuizLazyQuery>;
export type GetQuizQueryResult = Apollo.QueryResult<GetQuizQuery, GetQuizQueryVariables>;