import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const CREATE_USER = gql `
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($id: ID!) {
    saveBook(bookId: $id) {
        _id
        username
        books {
            _id
            bookname
        }
    }
}
`;

export const DELETE_BOOK = gql`
  mutation removeBook($id: ID) {
    removeBook(bookTitle: $bookTitle) {
      _id
      bookTitle
      createdAt
      username
      reactionCount
    }
  }
`;