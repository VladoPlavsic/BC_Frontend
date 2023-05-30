import React, { useState, useEffect } from 'react'
import Select from "react-dropdown-select";
import { useLazyQuery, gql } from '@apollo/client'


const GET_IMAGE_LIST = gql`
  query getImages{
    getImages{
      filename
      size
    }
  }
`

const GET_IMAGE = gql`
  query getImage($filename: String!){
    getImage(filename: $filename){
      image
    }
  }
`


function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
};



export default function ImageList() {
  const [image, setImage] = useState("http://pixelcurse.com/wp-content/uploads/2011/02/minimalist_landscape_8.jpg")
  const [imageList, setImageList] = useState([])

  const [runImageQuery, { called, loading, data }] = useLazyQuery(GET_IMAGE)
  const [runImageListQuery, { listCalled, listLoading, listData }] = useLazyQuery(GET_IMAGE_LIST)


  const downloadImage = (event, filename) => {
    document.getElementById("click-this").click();
    if (event.detail === 1) {
      runImageQuery({ variables: { filename: filename } }).then((response) => {
        setImage('data:image/jpeg;base64,' + response.data["getImage"].image)
      })
    }
  };

  useEffect(() => {
    runImageListQuery().then((response) => {
      setImageList(response.data["getImages"].map(image =>
        <a href="#" onMouseDown={(e) => { downloadImage(e, image.filename) }}>{image.filename}: {formatBytes(image.size)}</a>
      )
      )
    });

  }, []);


  return (
    <div>
      <input class="dark-light" type="checkbox" id="dark-light" name="dark-light" />

      <div class="sec-center">
        <input class="dropdown" type="checkbox" id="dropdown" name="dropdown" />
        <label id="click-this" class="for-dropdown" for="dropdown">See available images <i class="uil uil-arrow-down"></i></label>
        <div class="section-dropdown">
          {imageList}
        </div>
      </div>


      <div className="image">
        <img src={image} class="img" alt={image} />
      </div>

    </div>
  )
}

