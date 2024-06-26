import React, { useState, useEffect, useCallback, Component } from 'react'
import { useMutation, gql } from '@apollo/client'
import Dropzone from './Dropzone'

import { toBase64 } from './Utils'


const UPLOAD_FILE = gql`
  mutation uploadImage($image: String!, $filename: String!){
    uploadImage(image: $image, filename: $filename){
      filename
    }
  }
`

export default function UploadForm({ toggleSpinnerCallback, imagesList, updateImagesListCallback }) {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: data => {
      toggleSpinnerCallback()
    }
  })

  const onDrop = useCallback(acceptedFiles => {
    toggleSpinnerCallback()

    const file = acceptedFiles[0]

    if (!file) return

    toBase64(file).then(([image, filename]) => {
      console.log(filename)
      uploadFile({ variables: { image: image, filename: filename } })
    }
    )
  }, []);

  return (
    <Dropzone onDrop={onDrop} accept={"image/*"} />
  )
}
