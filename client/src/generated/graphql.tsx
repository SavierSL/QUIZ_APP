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
  getTeachersQuizSet: Array<QuizSet>;
  getAnswerSet?: Maybe<Array<AnswerSet>>;
  getAnswerSetTeacher: Array<AnswerSet>;
  getAnswerSetScore?: Maybe<Scalars['Int']>;
  getAnswerSetv2?: Maybe<AnswerSet>;
  me?: Maybe<Student>;
  meTeacher?: Maybe<Teacher>;
  getStudent?: Maybe<StudentData>;
};


export type QueryGetQuizArgs = {
  id: Scalars['Int'];
};


export type QueryGetQuizSetv2Args = {
  id: Scalars['Int'];
};


export type QueryGetAnswerSetTeacherArgs = {
  quizSetId: Scalars['Int'];
};


export type QueryGetAnswerSetScoreArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryGetAnswerSetv2Args = {
  answerSetId: Scalars['Int'];
  id: Scalars['Int'];
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
  answerSet?: Maybe<Array<AnswerSet>>;
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
  registerTeacher: ResponseFieldT;
  logInStudent: ResponseField;
  logInTeacher: ResponseFieldT;
  logout: Scalars['Boolean'];
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
  answerSetId: Scalars['Int'];
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

export type ResponseFieldT = {
  __typename?: 'ResponseFieldT';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Teacher>;
};

export type AnswerMutationVariables = Exact<{
  quizSetId: Scalars['Int'];
  itemNumber: Scalars['Int'];
  quizId: Scalars['Int'];
  answer: Scalars['String'];
  answerSetId: Scalars['Int'];
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

export type GetAnswerSetQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnswerSetQuery = (
  { __typename?: 'Query' }
  & { getAnswerSet?: Maybe<Array<(
    { __typename?: 'AnswerSet' }
    & Pick<AnswerSet, 'id' | 'studentId' | 'quizSetId' | 'title' | 'subject' | 'createdAt'>
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

export type GetAnswerSetScoreQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;


export type GetAnswerSetScoreQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getAnswerSetScore'>
);

export type GetAnswerSetv2QueryVariables = Exact<{
  id: Scalars['Int'];
  answerSetId: Scalars['Int'];
}>;


export type GetAnswerSetv2Query = (
  { __typename?: 'Query' }
  & { getAnswerSetv2?: Maybe<(
    { __typename?: 'AnswerSet' }
    & Pick<AnswerSet, 'title' | 'subject' | 'id'>
    & { answers?: Maybe<Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'studentId' | 'id' | 'itemNumber' | 'answerSetId' | 'question' | 'answer' | 'isCorrect'>
    )>>, quizSet?: Maybe<(
      { __typename?: 'QuizSet' }
      & Pick<QuizSet, 'title' | 'subject'>
      & { quizzes?: Maybe<Array<(
        { __typename?: 'Quiz' }
        & Pick<Quiz, 'id' | 'quizSetId' | 'itemNumber' | 'question' | 'answer'>
        & { multipleChoices?: Maybe<Array<(
          { __typename?: 'MultipleChoices' }
          & Pick<MultipleChoices, 'id' | 'letterItem' | 'letterContent'>
        )>> }
      )>> }
    )> }
  )> }
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
    )>>, answerSet?: Maybe<Array<(
      { __typename?: 'AnswerSet' }
      & Pick<AnswerSet, 'id' | 'studentId' | 'title' | 'subject'>
      & { answers?: Maybe<Array<(
        { __typename?: 'Answer' }
        & Pick<Answer, 'itemNumber' | 'isCorrect' | 'answer'>
      )>> }
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
      & Pick<AnswerSet, 'id' | 'studentId' | 'quizSetId' | 'title' | 'totalItems' | 'subject'>
      & { answers?: Maybe<Array<(
        { __typename?: 'Answer' }
        & Pick<Answer, 'answer' | 'isCorrect' | 'answerSetId' | 'itemNumber'>
      )>> }
    )> }
  )> }
);

export type GetTeachersQuizSetQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeachersQuizSetQuery = (
  { __typename?: 'Query' }
  & { getTeachersQuizSet: Array<(
    { __typename?: 'QuizSet' }
    & Pick<QuizSet, 'id' | 'quizSetCode' | 'subject' | 'title' | 'creatorId' | 'totalItems' | 'createdAt'>
    & { answerSet?: Maybe<Array<(
      { __typename?: 'AnswerSet' }
      & Pick<AnswerSet, 'id' | 'studentId' | 'title' | 'subject'>
      & { answers?: Maybe<Array<(
        { __typename?: 'Answer' }
        & Pick<Answer, 'itemNumber' | 'isCorrect' | 'answer'>
      )>> }
    )>> }
  )> }
);

export type LogInStudentMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInStudentMutation = (
  { __typename?: 'Mutation' }
  & { logInStudent: (
    { __typename?: 'ResponseField' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'email'>
    )> }
  ) }
);

export type LogInTeacherMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInTeacherMutation = (
  { __typename?: 'Mutation' }
  & { logInTeacher: (
    { __typename?: 'ResponseFieldT' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Teacher' }
      & Pick<Teacher, 'id' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'email'>
  )> }
);

export type MeTeacherQueryVariables = Exact<{ [key: string]: never; }>;


export type MeTeacherQuery = (
  { __typename?: 'Query' }
  & { meTeacher?: Maybe<(
    { __typename?: 'Teacher' }
    & Pick<Teacher, 'id' | 'email'>
  )> }
);

export type RegisterStudentMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterStudentMutation = (
  { __typename?: 'Mutation' }
  & { registerStudent: (
    { __typename?: 'ResponseField' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'email'>
    )> }
  ) }
);

export type RegisterTeacherMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterTeacherMutation = (
  { __typename?: 'Mutation' }
  & { registerTeacher: (
    { __typename?: 'ResponseFieldT' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Teacher' }
      & Pick<Teacher, 'id' | 'email'>
    )> }
  ) }
);


export const AnswerDocument = gql`
    mutation answer($quizSetId: Int!, $itemNumber: Int!, $quizId: Int!, $answer: String!, $answerSetId: Int!) {
  answer(
    quizSetId: $quizSetId
    itemNumber: $itemNumber
    quizId: $quizId
    answer: $answer
    answerSetId: $answerSetId
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
 *      answerSetId: // value for 'answerSetId'
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
    query getAnswerSet {
  getAnswerSet {
    id
    studentId
    quizSetId
    title
    subject
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
 *   },
 * });
 */
export function useGetAnswerSetQuery(baseOptions?: Apollo.QueryHookOptions<GetAnswerSetQuery, GetAnswerSetQueryVariables>) {
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
export const GetAnswerSetScoreDocument = gql`
    query getAnswerSetScore($id: Int) {
  getAnswerSetScore(id: $id)
}
    `;

/**
 * __useGetAnswerSetScoreQuery__
 *
 * To run a query within a React component, call `useGetAnswerSetScoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnswerSetScoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnswerSetScoreQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAnswerSetScoreQuery(baseOptions?: Apollo.QueryHookOptions<GetAnswerSetScoreQuery, GetAnswerSetScoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnswerSetScoreQuery, GetAnswerSetScoreQueryVariables>(GetAnswerSetScoreDocument, options);
      }
export function useGetAnswerSetScoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnswerSetScoreQuery, GetAnswerSetScoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnswerSetScoreQuery, GetAnswerSetScoreQueryVariables>(GetAnswerSetScoreDocument, options);
        }
export type GetAnswerSetScoreQueryHookResult = ReturnType<typeof useGetAnswerSetScoreQuery>;
export type GetAnswerSetScoreLazyQueryHookResult = ReturnType<typeof useGetAnswerSetScoreLazyQuery>;
export type GetAnswerSetScoreQueryResult = Apollo.QueryResult<GetAnswerSetScoreQuery, GetAnswerSetScoreQueryVariables>;
export const GetAnswerSetv2Document = gql`
    query getAnswerSetv2($id: Int!, $answerSetId: Int!) {
  getAnswerSetv2(id: $id, answerSetId: $answerSetId) {
    title
    subject
    id
    answers {
      studentId
      id
      itemNumber
      answerSetId
      question
      answer
      isCorrect
    }
    quizSet {
      title
      subject
      quizzes {
        id
        quizSetId
        itemNumber
        question
        answer
        multipleChoices {
          id
          letterItem
          letterContent
        }
      }
    }
  }
}
    `;

/**
 * __useGetAnswerSetv2Query__
 *
 * To run a query within a React component, call `useGetAnswerSetv2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetAnswerSetv2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnswerSetv2Query({
 *   variables: {
 *      id: // value for 'id'
 *      answerSetId: // value for 'answerSetId'
 *   },
 * });
 */
export function useGetAnswerSetv2Query(baseOptions: Apollo.QueryHookOptions<GetAnswerSetv2Query, GetAnswerSetv2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnswerSetv2Query, GetAnswerSetv2QueryVariables>(GetAnswerSetv2Document, options);
      }
export function useGetAnswerSetv2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnswerSetv2Query, GetAnswerSetv2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnswerSetv2Query, GetAnswerSetv2QueryVariables>(GetAnswerSetv2Document, options);
        }
export type GetAnswerSetv2QueryHookResult = ReturnType<typeof useGetAnswerSetv2Query>;
export type GetAnswerSetv2LazyQueryHookResult = ReturnType<typeof useGetAnswerSetv2LazyQuery>;
export type GetAnswerSetv2QueryResult = Apollo.QueryResult<GetAnswerSetv2Query, GetAnswerSetv2QueryVariables>;
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
    answerSet {
      id
      studentId
      title
      subject
      answers {
        itemNumber
        isCorrect
        answer
      }
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
export const GetTeachersQuizSetDocument = gql`
    query getTeachersQuizSet {
  getTeachersQuizSet {
    id
    quizSetCode
    subject
    title
    creatorId
    totalItems
    createdAt
    answerSet {
      id
      studentId
      title
      subject
      answers {
        itemNumber
        isCorrect
        answer
      }
    }
  }
}
    `;

/**
 * __useGetTeachersQuizSetQuery__
 *
 * To run a query within a React component, call `useGetTeachersQuizSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeachersQuizSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeachersQuizSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeachersQuizSetQuery(baseOptions?: Apollo.QueryHookOptions<GetTeachersQuizSetQuery, GetTeachersQuizSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeachersQuizSetQuery, GetTeachersQuizSetQueryVariables>(GetTeachersQuizSetDocument, options);
      }
export function useGetTeachersQuizSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeachersQuizSetQuery, GetTeachersQuizSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeachersQuizSetQuery, GetTeachersQuizSetQueryVariables>(GetTeachersQuizSetDocument, options);
        }
export type GetTeachersQuizSetQueryHookResult = ReturnType<typeof useGetTeachersQuizSetQuery>;
export type GetTeachersQuizSetLazyQueryHookResult = ReturnType<typeof useGetTeachersQuizSetLazyQuery>;
export type GetTeachersQuizSetQueryResult = Apollo.QueryResult<GetTeachersQuizSetQuery, GetTeachersQuizSetQueryVariables>;
export const LogInStudentDocument = gql`
    mutation logInStudent($email: String!, $password: String!) {
  logInStudent(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export type LogInStudentMutationFn = Apollo.MutationFunction<LogInStudentMutation, LogInStudentMutationVariables>;

/**
 * __useLogInStudentMutation__
 *
 * To run a mutation, you first call `useLogInStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInStudentMutation, { data, loading, error }] = useLogInStudentMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInStudentMutation(baseOptions?: Apollo.MutationHookOptions<LogInStudentMutation, LogInStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInStudentMutation, LogInStudentMutationVariables>(LogInStudentDocument, options);
      }
export type LogInStudentMutationHookResult = ReturnType<typeof useLogInStudentMutation>;
export type LogInStudentMutationResult = Apollo.MutationResult<LogInStudentMutation>;
export type LogInStudentMutationOptions = Apollo.BaseMutationOptions<LogInStudentMutation, LogInStudentMutationVariables>;
export const LogInTeacherDocument = gql`
    mutation logInTeacher($email: String!, $password: String!) {
  logInTeacher(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export type LogInTeacherMutationFn = Apollo.MutationFunction<LogInTeacherMutation, LogInTeacherMutationVariables>;

/**
 * __useLogInTeacherMutation__
 *
 * To run a mutation, you first call `useLogInTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInTeacherMutation, { data, loading, error }] = useLogInTeacherMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInTeacherMutation(baseOptions?: Apollo.MutationHookOptions<LogInTeacherMutation, LogInTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInTeacherMutation, LogInTeacherMutationVariables>(LogInTeacherDocument, options);
      }
export type LogInTeacherMutationHookResult = ReturnType<typeof useLogInTeacherMutation>;
export type LogInTeacherMutationResult = Apollo.MutationResult<LogInTeacherMutation>;
export type LogInTeacherMutationOptions = Apollo.BaseMutationOptions<LogInTeacherMutation, LogInTeacherMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const MeDocument = gql`
    query me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeTeacherDocument = gql`
    query meTeacher {
  meTeacher {
    id
    email
  }
}
    `;

/**
 * __useMeTeacherQuery__
 *
 * To run a query within a React component, call `useMeTeacherQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeTeacherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeTeacherQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeTeacherQuery(baseOptions?: Apollo.QueryHookOptions<MeTeacherQuery, MeTeacherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeTeacherQuery, MeTeacherQueryVariables>(MeTeacherDocument, options);
      }
export function useMeTeacherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeTeacherQuery, MeTeacherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeTeacherQuery, MeTeacherQueryVariables>(MeTeacherDocument, options);
        }
export type MeTeacherQueryHookResult = ReturnType<typeof useMeTeacherQuery>;
export type MeTeacherLazyQueryHookResult = ReturnType<typeof useMeTeacherLazyQuery>;
export type MeTeacherQueryResult = Apollo.QueryResult<MeTeacherQuery, MeTeacherQueryVariables>;
export const RegisterStudentDocument = gql`
    mutation registerStudent($email: String!, $password: String!) {
  registerStudent(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export type RegisterStudentMutationFn = Apollo.MutationFunction<RegisterStudentMutation, RegisterStudentMutationVariables>;

/**
 * __useRegisterStudentMutation__
 *
 * To run a mutation, you first call `useRegisterStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerStudentMutation, { data, loading, error }] = useRegisterStudentMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterStudentMutation(baseOptions?: Apollo.MutationHookOptions<RegisterStudentMutation, RegisterStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(RegisterStudentDocument, options);
      }
export type RegisterStudentMutationHookResult = ReturnType<typeof useRegisterStudentMutation>;
export type RegisterStudentMutationResult = Apollo.MutationResult<RegisterStudentMutation>;
export type RegisterStudentMutationOptions = Apollo.BaseMutationOptions<RegisterStudentMutation, RegisterStudentMutationVariables>;
export const RegisterTeacherDocument = gql`
    mutation registerTeacher($email: String!, $password: String!) {
  registerTeacher(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export type RegisterTeacherMutationFn = Apollo.MutationFunction<RegisterTeacherMutation, RegisterTeacherMutationVariables>;

/**
 * __useRegisterTeacherMutation__
 *
 * To run a mutation, you first call `useRegisterTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerTeacherMutation, { data, loading, error }] = useRegisterTeacherMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterTeacherMutation(baseOptions?: Apollo.MutationHookOptions<RegisterTeacherMutation, RegisterTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterTeacherMutation, RegisterTeacherMutationVariables>(RegisterTeacherDocument, options);
      }
export type RegisterTeacherMutationHookResult = ReturnType<typeof useRegisterTeacherMutation>;
export type RegisterTeacherMutationResult = Apollo.MutationResult<RegisterTeacherMutation>;
export type RegisterTeacherMutationOptions = Apollo.BaseMutationOptions<RegisterTeacherMutation, RegisterTeacherMutationVariables>;