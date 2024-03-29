'use strict';

class ToggleVideoButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videoOn: true };
  }

  render() {
    const icon = React.createElement(
      "i",
      { className: "material-icons" },
      this.state.videoOn ? 'videocam_off' : 'videocam_on'
    );

    return React.createElement(
      "button",
      {
        onClick: () => {
          this.setState({ videoOn: !this.state.videoOn });
          return this.state.videoOn ? stopVideo(myVideo) : startVideo(myVideo);
        },
        className:
          "mdl-button mdl-js-button mdl-button--fab mdl-button--colored",
      },
      [icon]
    );
  }
}

ReactDOM.render(React.createElement(ToggleVideoButton), document.querySelector('#toggle_video_container'));