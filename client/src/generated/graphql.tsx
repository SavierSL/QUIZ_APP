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
  getQuizSetv2: QuizSet;
  getAnswerSet?: Maybe<Array<AnswerSet>>;
  getAnswerSetTeacher: Array<AnswerSet>;
  getStudent?: Maybe<StudentData>;
};


export type QueryGetQuizArgs = {
  id: Scalars['Int'];
};


export type QueryGetQuizSetv2Args = {
  id: Scalars['Int'];
};


export type QueryGetAnswerSetArgs = {
  studentId: Scalars['Int'];
};


export type QueryGetAnswerSetTeacherArgs = {
  quizSetId: Scalars['Int'];
};

export type Quiz = {
  __typename?: 'Quiz';
  id: Scalars['Int'];
  quizCode: Scalars['String'];
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
  quizSetCode: Scalars['String'];
  creatorId: Scalars['Float'];
  title: Scalars['String'];
  subject: Scalars['String'];
  quizzes?: Maybe<Array<Quiz>>;
  creator: Teacher;
  answerSet?: Maybe<AnswerSet>;
  totalItems?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  quizSet?: Maybe<Array<QuizSet>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AnswerSet = {
  __typename?: 'AnswerSet';
  id: Scalars['Int'];
  studentId: Scalars['Float'];
  quizSetId: Scalars['Float'];
  title: Scalars['String'];
  subject: Scalars['String'];
  score?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Answer>>;
  student: Student;
  quizSet?: Maybe<QuizSet>;
  totalItems?: Maybe<Scalars['Int']>;
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

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  answerSets?: Maybe<Array<AnswerSet>>;
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

export type StudentData = {
  __typename?: 'StudentData';
  student: Student;
  answerSets: Array<AnswerSet>;
};

export type Mutation = {
  __typename?: 'Mutation';
  getQuizSet?: Maybe<QuizSet>;
  createQuizSet: QuizSet;
  makeQuiz: Quiz;
  createMultipleChoice: MultipleChoices;
  answer: Answer;
  createAnswerSet?: Maybe<AnswerSet>;
  registerStudent: ResponseField;
  registerTeacher: ResponseField;
  logInStudent: ResponseField;
  logInTeacher: ResponseField;
};


export type MutationGetQuizSetArgs = {
  quizSetCode: Scalars['String'];
};


export type MutationCreateQuizSetArgs = {
  subject: Scalars['String'];
  title: Scalars['String'];
};


export type MutationMakeQuizArgs = {
  quizSetId: Scalars['Int'];
  answer: Scalars['String'];
  itemNumber: Scalars['Int'];
  question: Scalars['String'];
};


export type MutationCreateMultipleChoiceArgs = {
  quizId: Scalars['Int'];
  letterContent: Scalars['String'];
  letterItem: Scalars['String'];
};


export type MutationAnswerArgs = {
  answer: Scalars['String'];
  quizId: Scalars['Int'];
  itemNumber: Scalars['Int'];
  quizSetId: Scalars['Int'];
};


export type MutationCreateAnswerSetArgs = {
  quizSetId: Scalars['Int'];
};


export type MutationRegisterStudentArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterTeacherArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLogInStudentArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLogInTeacherArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type ResponseField = {
  __typename?: 'ResponseField';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Student>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AnswerMutationVariables = Exact<{
  quizSetId: Scalars['Int'];
  itemNumber: Scalars['Int'];
  quizId: Scalars['Int'];
  answer: Scalars['String'];
}>;


export type AnswerMutation = (
  { __typename?: 'Mutation' }
  & { answer: (
    { __typename?: 'Answer' }
    & Pick<Answer, 'itemNumber' | 'answerSetId' | 'quizId' | 'question' | 'answer' | 'isCorrect' | 'createdAt'>
  ) }
);

export type CreateAnswerSetMutationVariables = Exact<{
  quizSetId: Scalars['Int'];
}>;


export type CreateAnswerSetMutation = (
  { __typename?: 'Mutation' }
  & { createAnswerSet?: Maybe<(
    { __typename?: 'AnswerSet' }
    & Pick<AnswerSet, 'studentId' | 'title' | 'createdAt'>
    & { answers?: Maybe<Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'itemNumber' | 'isCorrect' | 'question' | 'answer'>
    )>>, quizSet?: Maybe<(
      { __typename?: 'QuizSet' }
      & Pick<QuizSet, 'title' | 'creatorId'>
      & { quizzes?: Maybe<Array<(
        { __typename?: 'Quiz' }
        & Pick<Quiz, 'itemNumber' | 'question' | 'answer'>
      )>> }
    )> }
  )> }
);

export type CreateMultipleChoiceMutationVariables = Exact<{
  letterItem: Scalars['String'];
  letterContent: Scalars['String'];
  quizId: Scalars['Int'];
}>;


export type CreateMultipleChoiceMutation = (
  { __typename?: 'Mutation' }
  & { createMultipleChoice: (
    { __typename?: 'MultipleChoices' }
    & Pick<MultipleChoices, 'quizId' | 'id' | 'letterItem' | 'letterContent'>
  ) }
);

export type CreateQuizSetMutationVariables = Exact<{
  title: Scalars['String'];
  subject: Scalars['String'];
}>;


export type CreateQuizSetMutation = (
  { __typename?: 'Mutation' }
  & { createQuizSet: (
    { __typename?: 'QuizSet' }
    & Pick<QuizSet, 'quizSetCode' | 'id' | 'title' | 'subject' | 'creatorId'>
    & { quizzes?: Maybe<Array<(
      { __typename?: 'Quiz' }
      & Pick<Quiz, 'itemNumber' | 'question'>
    )>> }
  ) }
);

export type GetAnswerSetQueryVariables = Exact<{
  studentId: Scalars['Int'];
}>;


export type GetAnswerSetQuery = (
  { __typename?: 'Query' }
  & { getAnswerSet?: Maybe<Array<(
    { __typename?: 'AnswerSet' }
    & Pick<AnswerSet, 'studentId' | 'title' | 'subject' | 'score' | 'createdAt'>
    & { answers?: Maybe<Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'itemNumber' | 'isCorrect' | 'question' | 'answer'>
    )>>, quizSet?: Maybe<(
      { __typename?: 'QuizSet' }
      & Pick<QuizSet, 'title' | 'creatorId'>
      & { quizzes?: Maybe<Array<(
        { __typename?: 'Quiz' }
        & Pick<Quiz, 'itemNumber' | 'question' | 'answer'>
      )>> }
    )> }
  )>> }
);

export type GetQuizSetMutationVariables = Exact<{
  quizSetCode: Scalars['String'];
}>;


export type GetQuizSetMutation = (
  { __typename?: 'Mutation' }
  & { getQuizSet?: Maybe<(
    { __typename?: 'QuizSet' }
    & Pick<QuizSet, 'id' | 'quizSetCode' | 'creatorId' | 'title' | 'subject'>
    & { quizzes?: Maybe<Array<(
      { __typename?: 'Quiz' }
      & Pick<Quiz, 'id' | 'quizCode' | 'itemNumber' | 'question' | 'creatorId'>
    )>> }
  )> }
);

export type GetQuizSetv2QueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetQuizSetv2Query = (
  { __typename?: 'Query' }
  & { getQuizSetv2: (
    { __typename?: 'QuizSet' }
    & Pick<QuizSet, 'id' | 'quizSetCode' | 'subject' | 'title'>
    & { quizzes?: Maybe<Array<(
      { __typename?: 'Quiz' }
      & Pick<Quiz, 'quizSetId' | 'quizCode' | 'id' | 'itemNumber' | 'question' | 'answer'>
      & { multipleChoices?: Maybe<Array<(
        { __typename?: 'MultipleChoices' }
        & Pick<MultipleChoices, 'quizId' | 'id' | 'letterItem' | 'letterContent'>
      )>> }
    )>> }
  ) }
);

export type GetStudentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentQuery = (
  { __typename?: 'Query' }
  & { getStudent?: Maybe<(
    { __typename?: 'StudentData' }
    & { student: (
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'email'>
    ), answerSets: Array<(
      { __typename?: 'AnswerSet' }
      & Pick<AnswerSet, 'id' | 'studentId' | 'quizSetId' | 'title' | 'totalItems' | 'score' | 'subject'>
      & { answers?: Maybe<Array<(
        { __typename?: 'Answer' }
        & Pick<Answer, 'answer' | 'isCorrect' | 'answerSetId' | 'itemNumber'>
      )>> }
    )> }
  )> }
);

export type MakeQuizMutationVariables = Exact<{
  question: Scalars['String'];
  itemNumber: Scalars['Int'];
  answer: Scalars['String'];
  quizSetId: Scalars['Int'];
}>;


export type MakeQuizMutation = (
  { __typename?: 'Mutation' }
  & { makeQuiz: (
    { __typename?: 'Quiz' }
    & Pick<Quiz, 'id' | 'answer' | 'itemNumber' | 'quizSetId' | 'question'>
  ) }
);


export const AnswerDocument = gql`
    mutation answer($quizSetId: Int!, $itemNumber: Int!, $quizId: Int!, $answer: String!) {
  answer(
    quizSetId: $quizSetId
    itemNumber: $itemNumber
    quizId: $quizId
    answer: $answer
  ) {
    itemNumber
    answerSetId
    quizId
    question
    answer
    isCorrect
    createdAt
  }
}
    `;
export type AnswerMutationFn = Apollo.MutationFunction<AnswerMutation, AnswerMutationVariables>;

/**
 * __useAnswerMutation__
 *
 * To run a mutation, you first call `useAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerMutation, { data, loading, error }] = useAnswerMutation({
 *   variables: {
 *      quizSetId: // value for 'quizSetId'
 *      itemNumber: // value for 'itemNumber'
 *      quizId: // value for 'quizId'
 *      answer: // value for 'answer'
 *   },
 * });
 */
export function useAnswerMutation(baseOptions?: Apollo.MutationHookOptions<AnswerMutation, AnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnswerMutation, AnswerMutationVariables>(AnswerDocument, options);
      }
export type AnswerMutationHookResult = ReturnType<typeof useAnswerMutation>;
export type AnswerMutationResult = Apollo.MutationResult<AnswerMutation>;
export type AnswerMutationOptions = Apollo.BaseMutationOptions<AnswerMutation, AnswerMutationVariables>;
export const CreateAnswerSetDocument = gql`
    mutation createAnswerSet($quizSetId: Int!) {
  createAnswerSet(quizSetId: $quizSetId) {
    studentId
    title
    answers {
      itemNumber
      isCorrect
      question
      answer
    }
    quizSet {
      title
      quizzes {
        itemNumber
        question
        answer
      }
      creatorId
    }
    createdAt
  }
}
    `;
export type CreateAnswerSetMutationFn = Apollo.MutationFunction<CreateAnswerSetMutation, CreateAnswerSetMutationVariables>;

/**
 * __useCreateAnswerSetMutation__
 *
 * To run a mutation, you first call `useCreateAnswerSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnswerSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnswerSetMutation, { data, loading, error }] = useCreateAnswerSetMutation({
 *   variables: {
 *      quizSetId: // value for 'quizSetId'
 *   },
 * });
 */
export function useCreateAnswerSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnswerSetMutation, CreateAnswerSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAnswerSetMutation, CreateAnswerSetMutationVariables>(CreateAnswerSetDocument, options);
      }
export type CreateAnswerSetMutationHookResult = ReturnType<typeof useCreateAnswerSetMutation>;
export type CreateAnswerSetMutationResult = Apollo.MutationResult<CreateAnswerSetMutation>;
export type CreateAnswerSetMutationOptions = Apollo.BaseMutationOptions<CreateAnswerSetMutation, CreateAnswerSetMutationVariables>;
export const CreateMultipleChoiceDocument = gql`
    mutation createMultipleChoice($letterItem: String!, $letterContent: String!, $quizId: Int!) {
  createMultipleChoice(
    letterItem: $letterItem
    letterContent: $letterContent
    quizId: $quizId
  ) {
    quizId
    id
    letterItem
    letterContent
  }
}
    `;
export type CreateMultipleChoiceMutationFn = Apollo.MutationFunction<CreateMultipleChoiceMutation, CreateMultipleChoiceMutationVariables>;

/**
 * __useCreateMultipleChoiceMutation__
 *
 * To run a mutation, you first call `useCreateMultipleChoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMultipleChoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMultipleChoiceMutation, { data, loading, error }] = useCreateMultipleChoiceMutation({
 *   variables: {
 *      letterItem: // value for 'letterItem'
 *      letterContent: // value for 'letterContent'
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useCreateMultipleChoiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateMultipleChoiceMutation, CreateMultipleChoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMultipleChoiceMutation, CreateMultipleChoiceMutationVariables>(CreateMultipleChoiceDocument, options);
      }
export type CreateMultipleChoiceMutationHookResult = ReturnType<typeof useCreateMultipleChoiceMutation>;
export type CreateMultipleChoiceMutationResult = Apollo.MutationResult<CreateMultipleChoiceMutation>;
export type CreateMultipleChoiceMutationOptions = Apollo.BaseMutationOptions<CreateMultipleChoiceMutation, CreateMultipleChoiceMutationVariables>;
export const CreateQuizSetDocument = gql`
    mutation createQuizSet($title: String!, $subject: String!) {
  createQuizSet(title: $title, subject: $subject) {
    quizSetCode
    id
    title
    subject
    quizzes {
      itemNumber
      question
    }
    creatorId
  }
}
    `;
export type CreateQuizSetMutationFn = Apollo.MutationFunction<CreateQuizSetMutation, CreateQuizSetMutationVariables>;

/**
 * __useCreateQuizSetMutation__
 *
 * To run a mutation, you first call `useCreateQuizSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizSetMutation, { data, loading, error }] = useCreateQuizSetMutation({
 *   variables: {
 *      title: // value for 'title'
 *      subject: // value for 'subject'
 *   },
 * });
 */
export function useCreateQuizSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizSetMutation, CreateQuizSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizSetMutation, CreateQuizSetMutationVariables>(CreateQuizSetDocument, options);
      }
export type CreateQuizSetMutationHookResult = ReturnType<typeof useCreateQuizSetMutation>;
export type CreateQuizSetMutationResult = Apollo.MutationResult<CreateQuizSetMutation>;
export type CreateQuizSetMutationOptions = Apollo.BaseMutationOptions<CreateQuizSetMutation, CreateQuizSetMutationVariables>;
export const GetAnswerSetDocument = gql`
    query getAnswerSet($studentId: Int!) {
  getAnswerSet(studentId: $studentId) {
    studentId
    title
    subject
    score
    answers {
      itemNumber
      isCorrect
      question
      answer
    }
    quizSet {
      title
      quizzes {
        itemNumber
        question
        answer
      }
      creatorId
    }
    createdAt
  }
}
    `;

/**
 * __useGetAnswerSetQuery__
 *
 * To run a query within a React component, call `useGetAnswerSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnswerSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnswerSetQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useGetAnswerSetQuery(baseOptions: Apollo.QueryHookOptions<GetAnswerSetQuery, GetAnswerSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnswerSetQuery, GetAnswerSetQueryVariables>(GetAnswerSetDocument, options);
      }
export function useGetAnswerSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnswerSetQuery, GetAnswerSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnswerSetQuery, GetAnswerSetQueryVariables>(GetAnswerSetDocument, options);
        }
export type GetAnswerSetQueryHookResult = ReturnType<typeof useGetAnswerSetQuery>;
export type GetAnswerSetLazyQueryHookResult = ReturnType<typeof useGetAnswerSetLazyQuery>;
export type GetAnswerSetQueryResult = Apollo.QueryResult<GetAnswerSetQuery, GetAnswerSetQueryVariables>;
export const GetQuizSetDocument = gql`
    mutation getQuizSet($quizSetCode: String!) {
  getQuizSet(quizSetCode: $quizSetCode) {
    id
    quizSetCode
    creatorId
    title
    subject
    quizzes {
      id
      quizCode
      itemNumber
      question
      creatorId
    }
  }
}
    `;
export type GetQuizSetMutationFn = Apollo.MutationFunction<GetQuizSetMutation, GetQuizSetMutationVariables>;

/**
 * __useGetQuizSetMutation__
 *
 * To run a mutation, you first call `useGetQuizSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetQuizSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getQuizSetMutation, { data, loading, error }] = useGetQuizSetMutation({
 *   variables: {
 *      quizSetCode: // value for 'quizSetCode'
 *   },
 * });
 */
export function useGetQuizSetMutation(baseOptions?: Apollo.MutationHookOptions<GetQuizSetMutation, GetQuizSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetQuizSetMutation, GetQuizSetMutationVariables>(GetQuizSetDocument, options);
      }
export type GetQuizSetMutationHookResult = ReturnType<typeof useGetQuizSetMutation>;
export type GetQuizSetMutationResult = Apollo.MutationResult<GetQuizSetMutation>;
export type GetQuizSetMutationOptions = Apollo.BaseMutationOptions<GetQuizSetMutation, GetQuizSetMutationVariables>;
export const GetQuizSetv2Document = gql`
    query getQuizSetv2($id: Int!) {
  getQuizSetv2(id: $id) {
    id
    quizSetCode
    subject
    title
    quizzes {
      quizSetId
      quizCode
      id
      itemNumber
      question
      multipleChoices {
        quizId
        id
        letterItem
        letterContent
      }
      answer
    }
  }
}
    `;

/**
 * __useGetQuizSetv2Query__
 *
 * To run a query within a React component, call `useGetQuizSetv2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizSetv2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizSetv2Query({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuizSetv2Query(baseOptions: Apollo.QueryHookOptions<GetQuizSetv2Query, GetQuizSetv2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizSetv2Query, GetQuizSetv2QueryVariables>(GetQuizSetv2Document, options);
      }
export function useGetQuizSetv2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizSetv2Query, GetQuizSetv2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizSetv2Query, GetQuizSetv2QueryVariables>(GetQuizSetv2Document, options);
        }
export type GetQuizSetv2QueryHookResult = ReturnType<typeof useGetQuizSetv2Query>;
export type GetQuizSetv2LazyQueryHookResult = ReturnType<typeof useGetQuizSetv2LazyQuery>;
export type GetQuizSetv2QueryResult = Apollo.QueryResult<GetQuizSetv2Query, GetQuizSetv2QueryVariables>;
export const GetStudentDocument = gql`
    query getStudent {
  getStudent {
    student {
      id
      email
    }
    answerSets {
      id
      studentId
      quizSetId
      title
      totalItems
      score
      subject
      answers {
        answer
        isCorrect
        answerSetId
        itemNumber
      }
    }
  }
}
    `;

/**
 * __useGetStudentQuery__
 *
 * To run a query within a React component, call `useGetStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStudentQuery(baseOptions?: Apollo.QueryHookOptions<GetStudentQuery, GetStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentQuery, GetStudentQueryVariables>(GetStudentDocument, options);
      }
export function useGetStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentQuery, GetStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentQuery, GetStudentQueryVariables>(GetStudentDocument, options);
        }
export type GetStudentQueryHookResult = ReturnType<typeof useGetStudentQuery>;
export type GetStudentLazyQueryHookResult = ReturnType<typeof useGetStudentLazyQuery>;
export type GetStudentQueryResult = Apollo.QueryResult<GetStudentQuery, GetStudentQueryVariables>;
export const MakeQuizDocument = gql`
    mutation makeQuiz($question: String!, $itemNumber: Int!, $answer: String!, $quizSetId: Int!) {
  makeQuiz(
    question: $question
    itemNumber: $itemNumber
    answer: $answer
    quizSetId: $quizSetId
  ) {
    id
    answer
    itemNumber
    quizSetId
    question
  }
}
    `;
export type MakeQuizMutationFn = Apollo.MutationFunction<MakeQuizMutation, MakeQuizMutationVariables>;

/**
 * __useMakeQuizMutation__
 *
 * To run a mutation, you first call `useMakeQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeQuizMutation, { data, loading, error }] = useMakeQuizMutation({
 *   variables: {
 *      question: // value for 'question'
 *      itemNumber: // value for 'itemNumber'
 *      answer: // value for 'answer'
 *      quizSetId: // value for 'quizSetId'
 *   },
 * });
 */
export function useMakeQuizMutation(baseOptions?: Apollo.MutationHookOptions<MakeQuizMutation, MakeQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeQuizMutation, MakeQuizMutationVariables>(MakeQuizDocument, options);
      }
export type MakeQuizMutationHookResult = ReturnType<typeof useMakeQuizMutation>;
export type MakeQuizMutationResult = Apollo.MutationResult<MakeQuizMutation>;
export type MakeQuizMutationOptions = Apollo.BaseMutationOptions<MakeQuizMutation, MakeQuizMutationVariables>;