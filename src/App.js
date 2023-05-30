import React from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

import UploadForm from './UploadForm'
import ImageList from './ImageList'

import './App.css';


const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:5000/graphql',
  }),
  cache: new InMemoryCache
})

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <ImageList />
        <div className='stick-bottom'>
          <UploadForm />
        </div>
      </ApolloProvider>
    </div>
  )
}

export default App
