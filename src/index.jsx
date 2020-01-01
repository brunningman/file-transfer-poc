import React from 'react';
import ReactDOM from 'react-dom';
import UploadButton from './uploadButton.jsx';
import AddFolder from './addFolder.jsx';
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
        this.setState({ fileTree: JSON.parse(tree) })
      });
  }

  uploadFile(event) {
    event.preventDefault();
    console.log(event.target);
  }

  render() {
    return (
      <div>
        <UploadButton upload={this.uploadFile} />
        <AddFolder />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));