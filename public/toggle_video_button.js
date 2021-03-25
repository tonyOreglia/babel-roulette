'use strict';

class ToggleVideoButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videoOn: true };
  }

  render() {
    return e(
      'button',
      { 
        onClick: () => { 
          this.setState({ videoOn: !this.state.videoOn })
          return this.state.videoOn ? stopVideo(myVideo) : startVideo(myVideo); 
        }
      },
      this.state.videoOn ? 'Stop Video' : 'Start Video'
    );
  }
}

const videoDomContainer = document.querySelector('#toggle_video_container');
ReactDOM.render(React.createElement(ToggleVideoButton), videoDomContainer);