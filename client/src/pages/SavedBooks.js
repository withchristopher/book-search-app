import React, { useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, useParams } from 'react-router-dom';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  const [removeBook] = useMutation(REMOVE_BOOK);
  const { username: userParam } = useParams();
  // const [userData, setUserData] = useState({});
  // const [userData2, { error }] = useQuery(GET_ME);
  // const { loading, data }=useQuery(GET_ME)
  const { loading, data } = useQuery(GET_ME)
  const userData = data?.me ||{};
  console.log("user data is:")
  console.log(userData)
  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

  // useEffect(() => {
    // useQuery(() => {
    // const deleteBook = function(){
    // const getUserData = async () => {
    //   variables: { id: thoughtId }
    
    //   try {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //       return false;
    //     }

    //     const response = await userData2(token);

    //     if (!response.ok) {
    //       throw new Error('something went wrong!');
    //     }

    //     const user = await response.json();
    //     setUserData(user);
    //   } catch (err) {
    //     console.error(error);
    //   }
    // };

    // getUserData();
  // };

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(" saved books on line 57 is :")
    // console.log(data)
    console.log(userData.savedBooks)
    if (!token) {
      return false;
    }

    try {
      await removeBook({
      variables: { bookId}
      });
    } catch (e) {
      console.error(e);
    }

    // try {
    //   const response = await removeBook(bookId);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   // const updatedUser = await response.json();
    //   // setUserData(updatedUser);
    //   // upon success, remove book's id from localStorage
    //   removeBookId(bookId);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log(" i am at user savedbooks")
  console.log(userData.savedBooks)
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};


export default SavedBooks;
