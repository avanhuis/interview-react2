import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class EnterTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTask: ''
        };

    }

    onInputSubmit = e => {
        e.preventDefault();
        let currentDate = new Date();

        this.props.onSubmit(this.state.currentTask, currentDate);

        this.state.currentTask = '';
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Task:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={this.state.currentTask}
                        onChange={e => this.setState({ currentTask: e.target.value })}
                        placeholder="Enter Task Here" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.onInputSubmit}>Submit</Button>
            </Form>

        )
    }
}

export default EnterTask;