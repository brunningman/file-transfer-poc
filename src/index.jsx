import React from 'react';
import ReactDOM from 'react-dom';
import UploadButton from './uploadButton.jsx';
import AddFolder from './addFolder.jsx';
import FileTree from './fileTree.jsx';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileTree: {
        root: []
      }
    }

    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
    Axios.get('/fileTree')
      .then(tree => {
        this.setState({ fileTree: tree.data })
      });
  }

  uploadFile(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
        <UploadButton upload={this.uploadFile} />
        <AddFolder />
        <FileTree files={this.state.fileTree} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));