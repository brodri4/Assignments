import React, { Component } from 'react'

class AddGame extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            year: '',
            imageUrl: ''
        }
    }

    handleSaveGame = () => {
        console.log(this.state)
        fetch('http://localhost:8080/game-create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                this.props.history.push('/')
            }

        })
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type='text' name='title' placeholder="Title" onChange={this.handleOnChange} />
                <input type='text' name='description' placeholder="Description" onChange={this.handleOnChange} />
                <input type='text' name='year' placeholder="Year" onChange={this.handleOnChange} />
                <input type='text' name='imageUrl' placeholder="Image Url" onChange={this.handleOnChange} />
                <button onClick={this.handleSaveGame}>Save</button>
            </div>
        )
    }
}

export default AddGame