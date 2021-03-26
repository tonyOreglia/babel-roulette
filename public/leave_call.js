'use strict';

class LeaveCall extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const icon = React.createElement(
      "i",
      { className: "material-icons" },
      'logout'
    );

    return React.createElement(
      "button",
      {
        onClick: () => {
          return leaveCall(myVideo);
        },
        className:
          "mdl-button mdl-js-button mdl-button--fab mdl-button--colored",
      },
      [icon]
    );
  }
}

ReactDOM.render(
  React.createElement(LeaveCall),
  document.querySelector("#leave_call_container")
);