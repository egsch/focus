var playIcon =
  "M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z";
var pauseIcon =
  "M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z";
var ctimer = "Session";
class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      sec: 25 * 60,
      playIcon: playIcon,
      onBreak: false,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.baseState = this.state;
    this.startCountdown = this.startCountdown.bind(this);
    this.switchCountdown = this.switchCountdown.bind(this);
    this.reset = this.reset.bind(this);
    this.timer = this.timer.bind(this);
    this.running = false;
    //this.currentTimer = "Session";
    this.b = 0;
  }
  increment(e) {
    if (
      e.target.id == "break-increment" ||
      e.target.parentElement.id == "break-increment"
    ) {
      if (document.getElementById("break-length").innerText < 60) {
        if (this.state.onBreak) {
          this.setState((state) => ({
            break: state.break + 1,
            session: state.session,
            sec: state.sec + 60,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        } else {
          this.setState((state) => ({
            break: state.break + 1,
            session: state.session,
            sec: state.sec,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        }
      }
    } else if (
      e.target.id == "session-increment" ||
      e.target.parentElement.id == "session-increment"
    ) {
      if (document.getElementById("session-length").innerText < 60) {
        if (!this.state.onBreak) {
          this.setState((state) => ({
            break: state.break,
            session: state.session + 1,
            sec: state.sec + 60,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        } else {
          this.setState((state) => ({
            break: state.break,
            session: state.session + 1,
            sec: state.sec,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        }
      }
    }
  }
  decrement(e) {
    if (
      e.target.id == "break-decrement" ||
      e.target.parentElement.id == "break-decrement"
    ) {
      if (document.getElementById("break-length").innerText > 1) {
        if (this.state.onBreak && this.state.sec > 60) {
          this.setState((state) => ({
            break: state.break - 1,
            session: state.session,
            sec: state.sec - 60,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        } else {
          this.setState((state) => ({
            break: state.break - 1,
            session: state.session,
            sec: state.sec,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        }
      }
    } else if (
      e.target.id == "session-decrement" ||
      e.target.parentElement.id == "session-decrement"
    ) {
      if (document.getElementById("session-length").innerText > 1) {
        if (!this.state.onBreak && this.state.sec > 60) {
          this.setState((state) => ({
            break: state.break,
            session: state.session - 1,
            sec: state.sec - 60,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        } else {
          this.setState((state) => ({
            break: state.break,
            session: state.session - 1,
            sec: state.sec,
            playIcon: state.playIcon,
            onBreak: state.onBreak,
          }));
        }
      }
    }
  }
  timer() {
    while (this.running != true) {}
    this.b = setInterval(() => {
      if (this.state.sec <= 0) {
        document.getElementById("beep").play();
        this.switchCountdown();
      } else {
        this.setState((state) => ({
          break: state.break,
          session: state.session,
          sec: state.sec - 1,
        }));
      }
    }, 1000);
  }
  startCountdown() {
    if (this.running == true) {
      this.running = false;
      clearInterval(this.b);
      this.setState((state) => ({
        break: state.break,
        session: state.session,
        sec: state.sec,
        playIcon: playIcon,
        onBreak: state.onBreak,
      }));
    } else {
      this.running = true;
      this.timer();
      this.setState((state) => ({
        break: state.break,
        session: state.session,
        sec: state.sec,
        playIcon: pauseIcon,
        onBreak: state.onBreak,
      }));
    }
  }
  reset() {
    clearInterval(this.b);
    this.setState(this.baseState);
    this.running = false;
    ctimer = "Session";
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }
  switchCountdown() {
    if (ctimer == "Session") {
      ctimer = "Break";
    } else if (ctimer == "Break") {
      ctimer = "Session";
    }
    clearInterval(this.b);
    this.timer();
    this.setState({
      break: this.state.break,
      session: this.state.session,
      sec: this.state[ctimer.toLowerCase()] * 60,
    });
  }
  render() {
    /*return (
      <div id="timer">
        <h2 class="focus">focus.</h2>
        <div id="timer1">
          <h2 id="timer-label">{ctimer}</h2>
          <h1 id="time-left">
            {(Math.floor(this.state.sec / 60) < 10
              ? "0" + Math.floor(this.state.sec / 60)
              : Math.floor(this.state.sec / 60)) +
              ":" +
              (this.state.sec % 60 < 10
                ? "0" + (this.state.sec % 60)
                : this.state.sec % 60)}
          </h1>
          <div id="controls" class="incrementation">
            <button id="start_stop" onClick={this.startCountdown}><svg /></button>
            <button id="reset" onClick={this.reset}><svg /></button>
          </div>
        </div>
        <div id="counters">
           <div id="breaks">
                <h3 id="break-time">
                Break Time
                </h3>
                <button id="break-increment" onClick={this.increment}><svg /></button>
                <button id="break-decrement" onClick={this.decrement}><svg /></button>
           </div>
           <div id="sessions">
                <h3 id="session-time">
                Break Time
                </h3>
                <button id="session-increment" onClick={this.increment}><svg /></button>
                <button id="session-decrement" onClick={this.decrement}><svg /></button>
           </div>
        </div>
      </div>
    );*/

    return /*#__PURE__*/ React.createElement(
      "div",
      { id: "timer" } /*#__PURE__*/,
      React.createElement("h2", { class: "focus" }, "focus.") /*#__PURE__*/,
      React.createElement(
        "div",
        { id: "timer1" } /*#__PURE__*/,
        React.createElement("h2", { id: "timer-label" }, ctimer) /*#__PURE__*/,
        React.createElement(
          "h1",
          { id: "time-left" },
          (Math.floor(this.state.sec / 60) < 10
            ? "0" + Math.floor(this.state.sec / 60)
            : Math.floor(this.state.sec / 60)) +
            ":" +
            (this.state.sec % 60 < 10
              ? "0" + (this.state.sec % 60)
              : this.state.sec % 60)
        ) /*#__PURE__*/,

        React.createElement(
          "div",
          { id: "controls", class: "incrementation" } /*#__PURE__*/,
          React.createElement(
            "button",
            { id: "start_stop", onClick: this.startCountdown } /*#__PURE__*/,
            React.createElement(
              "svg",
              { width: "24", viewBox: "0 -960 960 960", fill: "#000000" },
              " " /*#__PURE__*/,
              React.createElement("path", {
                d: this.state.playIcon,
              }),
              " "
            )
          ) /*#__PURE__*/,

          React.createElement(
            "button",
            { id: "reset", onClick: this.reset } /*#__PURE__*/,
            React.createElement(
              "svg",
              { width: "24", viewBox: "0 0 24 24" },
              " " /*#__PURE__*/,
              React.createElement("path", {
                d: "M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12",
              }),
              " "
            )
          )
        )
      ) /*#__PURE__*/,

      React.createElement(
        "div",
        { id: "counters" } /*#__PURE__*/,
        React.createElement(
          "div",
          { id: "breaks" } /*#__PURE__*/,
          React.createElement(
            "h3",
            { id: "break-label" },
            "Break Time"
          ) /*#__PURE__*/,
          React.createElement(
            "div",
            { class: "incrementation" } /*#__PURE__*/,
            React.createElement(
              "button",
              { id: "break-increment", onClick: this.increment } /*#__PURE__*/,
              React.createElement(
                "svg",
                { width: "24", height: "24", viewBox: "0 0 24 24" },
                " " /*#__PURE__*/,
                React.createElement("path", {
                  d: "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
                }),
                " "
              )
            ) /*#__PURE__*/,

            React.createElement(
              "span",
              { id: "break-length" },
              this.state.break
            ) /*#__PURE__*/,
            React.createElement(
              "button",
              { id: "break-decrement", onClick: this.decrement } /*#__PURE__*/,
              React.createElement(
                "svg",
                { width: "24", height: "24", viewBox: "0 0 24 24" },
                " " /*#__PURE__*/,
                React.createElement("path", {
                  d: "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
                }),
                " "
              )
            )
          )
        ) /*#__PURE__*/,

        React.createElement(
          "div",
          { id: "sessions" } /*#__PURE__*/,
          React.createElement(
            "h3",
            { id: "session-label" },
            "Session Time"
          ) /*#__PURE__*/,
          React.createElement(
            "div",
            { class: "incrementation" } /*#__PURE__*/,
            React.createElement(
              "button",
              {
                id: "session-increment",
                onClick: this.increment,
              } /*#__PURE__*/,
              React.createElement(
                "svg",
                { width: "24", height: "24", viewBox: "0 0 24 24" },
                " " /*#__PURE__*/,
                React.createElement("path", {
                  d: "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
                }),
                " "
              )
            ) /*#__PURE__*/,

            React.createElement(
              "span",
              { id: "session-length" },
              this.state.session
            ) /*#__PURE__*/,
            React.createElement(
              "button",
              {
                id: "session-decrement",
                onClick: this.decrement,
              } /*#__PURE__*/,
              React.createElement(
                "svg",
                { width: "24", height: "24", viewBox: "0 0 24 24" },
                " " /*#__PURE__*/,
                React.createElement("path", {
                  d: "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
                }),
                " "
              )
            )
          )
        )
      )
    );
  }
}

ReactDOM.render(
  React.createElement(Pomodoro, null),
  document.querySelector("#main")
);
