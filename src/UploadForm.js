import React, { useState, useEffect, useCallback, Component } from 'react'
import { useMutation, gql } from '@apollo/client'
import Dropzone from './Dropzone'

import { toBase64, formatBytes } from './Utils'


const UPLOAD_FILE = gql`
  mutation uploadImage($image: String!, $filename: String!){
    uploadImage(image: $image, filename: $filename){
      filename
    }
  }
`

export default function UploadForm({ toggleSpinnerCallback, imagesList, updateImagesListCallback, downloadImageCallback }) {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: data => {

      console.log(downloadImageCallback)
      toggleSpinnerCallback()
      var filename = data["uploadImage"].filename
      var newElement = <a href="#" onMouseDown={(e) => { downloadImageCallback(e, filename) }}>{filename}: {formatBytes("reload page to get size")}</a>

      imagesList.push(newElement)
      updateImagesListCallback(imagesList)
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
