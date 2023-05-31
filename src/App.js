import React, { Component } from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

import UploadForm from './UploadForm'
import ImageList from './ImageList'
import LoadingSpinner from './LoadingSpinner';

import './App.css';


const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:5000/graphql',
  }),
  cache: new InMemoryCache
})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imagesList: [],
      downloadImageCallback: undefined,
      blur_div_css: "background-div"
    };

    this.toggleSpinner = this.toggleSpinner.bind(this);
  }

  toggleSpinner() {
    this.setState(state => ({
      loading: !state.loading,
      blur_div_css: (!state.loading ? "background-div blur-div" : "background-div")
    }));
  }

  updateImagesList(newImagesList) {
    this.setState({ imagesList: newImagesList });
  }

  setDownloadImageCallback(callback) {
    console.log("Here")
    this.setState({ downloadImageCallback: callback }, function () {
      console.log(this.state.downloadImageCallback)
    })
  }


  render() {
    return (
      <div>
        <div className="mid-screen-div">
          <LoadingSpinner loading={this.state.loading} />
        </div>
        <div className={this.state.blur_div_css} >
          <ApolloProvider client={client}>
            <ImageList imagesList={this.state.imagesList} updateImagesListCallback={(newImagesList) => this.updateImagesList(newImagesList)} setDownloadImageCallback={(callback) => this.setDownloadImageCallback(callback)} />
            <div className='stick-bottom'>
              <UploadForm toggleSpinnerCallback={this.toggleSpinner} imagesList={this.state.imagesList} updateImagesListCallback={(newImagesList) => this.updateImagesList(newImagesList)} />
            </div>
          </ApolloProvider>
        </div>
      </div >
    )
  }
}

export default App
