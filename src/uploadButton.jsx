import React, { Component } from "react"

export default function UploadButton(props) {
  console.log(props)
  return (
    <form>
      <input type="file" label="Choose a file to upload..." onChange={props.upload}></input>
    </form>
  )

}