'use strict';

class MuteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { muted: false };
  }

  render() {
    const icon = React.createElement("i", { className: "material-icons" }, 'volume_mute');
    return React.createElement(
      "button",
      {
        onClick: () => {
          console.log("toggling mute");
          this.setState({ muted: !this.state.muted });
          return this.state.muted ? unMute(myVideo) : mute(myVideo);
        },
        className:
          "mdl-button mdl-js-button mdl-button--fab mdl-button--colored",
      },
      [icon]
    );
  }
}

ReactDOM.render(React.createElement(MuteButton), document.querySelector('#mute_button_container'));

{/* <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">add</i>
</button>; */}