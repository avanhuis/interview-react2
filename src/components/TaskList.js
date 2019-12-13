import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    onCheck = e => {
        e.preventDefault();
        let endTime = new Date();

        console.log(e.currentTarget)
        this.props.onChange(e, endTime);

    }

    render() {
        const { tasks } = this.props;
        return (
            <Table id="taskList">
                < thead >
                    <tr>
                        <th>Task</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Complete?</th>
                    </tr>
                </thead >
                <tbody>
                    {tasks.map((item) => (
                        <tr key={item.task}>
                            <td>{item.task}</td>
                            <td>{item.displayStartTime}</td>
                            <td>{item.displayEndTime}</td>
                            <td>{item.displayDuration}</td>
                            <td><Form.Check className="checkbox" onChange={this.onCheck} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        );
    }
}

export default TaskList;