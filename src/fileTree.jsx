import React from 'react';
import FolderTree from 'react-folder-tree';

export default function FileTree(props) {
  return <FolderTree data={props.files} />
}