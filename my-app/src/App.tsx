import * as React from "react";
import { Component, ClassAttributes } from "react";


  
interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

class Stopwatch extends Component<StopwatchProps, any> {

  incrementer: any
  laps: any[]

  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds, 
      lastClearedIncrementer: null,
    }
    this.laps = [];
  }

  handleStartClick() {
    this.incrementer = setInterval(() =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1,
      }), 1000);
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer,
    });
  }

  handleResetClick() {
    clearInterval(this.incrementer);
    this.laps = [];
    this.setState({
      secondsElapsed: 0,
    });
  }

  handleLabClick() {
    this.laps = this.laps.concat([this.state.secondsElapsed]);
    this.forceUpdate();
  }

  handleDeleteClick(index: number) {
    this.laps.splice(index, 1);
    this.forceUpdate();
  }

  formattedSeconds = (sec: number) => 
  Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);

  Lap = (props: { index: number, lap: number, onDelete:any }) =>(
    <div className="stopwatch-lap">
      <strong>{props.index}</strong>/ {this.formattedSeconds(props.lap)} <button onClick={props.onDelete} > X </button>
    </div>
  );

  render() {
    const { 
      secondsElapsed, 
      lastClearedIncrementer,
    } = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{this.formattedSeconds(secondsElapsed)}</h1>

        {(secondsElapsed === 0 || this.incrementer === lastClearedIncrementer
          ? <button type="button" className="start-btn" onClick={this.handleStartClick.bind(this)}>start</button>
          : <button type="button" className="stop-btn" onClick={this.handleStopClick.bind(this)}>stop</button>
        )}

        {(secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer
          ? <button type="button" onClick={this.handleLabClick.bind(this)}>lap</button>
          : null
        )}

        {(secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer
          ? <button type="button" onClick={this.handleResetClick.bind(this)}>reset</button>
          : null
        )}

        <div className="stopwatch-laps">
          { this.laps && this.laps.map((lap, i) => 
            <this.Lap key={i} index={i+1} lap={lap} onDelete={this.handleDeleteClick.bind(this,i)} />) }
        </div>
      </div>
    );
  }
}



export default Stopwatch


