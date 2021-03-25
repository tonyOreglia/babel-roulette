'use strict';

const e = React.createElement;

class MuteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { muted: false };
  }

  render() {
    if (this.state.muted) {
      console.log('You muted this.');
    }

    return e(
      'button',
      { 
        onClick: () => { 
          this.setState({ muted: !this.state.muted })
          return this.state.muted ? unMute(myVideo) : mute(myVideo); 
        }
      },
      this.state.muted ? 'unMute' : 'Mute'
    );
  }
}

const domContainer = document.querySelector('#mute_button_container');
ReactDOM.render(e(MuteButton), domContainer);