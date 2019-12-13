import React from 'react';
import logo from './logo.svg';
import './App.css';
import EnterTask from './components/EnterTask';
import TaskList from './components/TaskList';


class App extends React.Component {
  state = {
    tasks: []
  }

  convertTime = (currentDate) => {

    let dateTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();


    let timeValue = currentDate;
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    return timeValue;
  }

  onInputSubmit = (currentTask, currentTime) => {

    let displayTime = this.convertTime(currentTime);

    this.setState({ tasks: [...this.state.tasks, { task: currentTask, startTime: currentTime.toString(), displayStartTime: displayTime }] });

    sessionStorage.setItem('tasks', JSON.stringify(this.state.tasks));

  }


  onCheck = (e, currentTime) => {
    let displayTime = this.convertTime(currentTime);
    let row = e.currentTarget.parentNode.parentNode.parentNode.rowIndex - 1;
    this.state.tasks[row]["endTime"] = currentTime;
    this.state.tasks[row]["displayEndTime"] = displayTime;

    let startTime = this.state.tasks[row]["startTime"];
    let endTime = this.state.tasks[row]["endTime"];
    this.getDuration(row, startTime, endTime)

    this.setState(this.state.tasks)
    sessionStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  getDuration = (row, startTime, endTime) => {
    let duration = Math.abs(Date.parse(endTime) - Date.parse(startTime));

    duration = this.durationToMinutesAndSeconds(duration)

    this.state.tasks[row]["displayDuration"] = duration.toString();
    sessionStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  durationToMinutesAndSeconds = (duration) => {
    var minutes = Math.floor(duration / 60000);
    var seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <div className="App">
        <EnterTask onSubmit={this.onInputSubmit} />
        <TaskList tasks={this.state.tasks} onChange={this.onCheck} />
      </div>
    );
  }
}

export default App;
