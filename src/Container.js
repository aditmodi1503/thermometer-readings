import React, { Component } from 'react';
import FileSelect from './FileSelect';
import ViewData from './ViewData';

export default class Container extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sendDataClicked: false,
            getDataClicked: false,
            homePage: true,
        }
    }

    homeButton = () => 
        <div>
            <button onClick={() => this.setState({sendDataClicked: false, getDataClicked: false, homePage: true})}>Go to home</button>
        </div>
    

    render() {
        const { sendDataClicked, getDataClicked, homePage } = this.state;
        return (
            <div>
                {
                    homePage &&
                    <div>
                        <h1 className='heading'>WELCOME TO THE THEROMETER WORLD</h1>
                        <div className='buttonBar'>
                            <button className='button-custom send-data' onClick={() => this.setState({sendDataClicked: true, getDataClicked: false, homePage: false})}>Press to manually send thermometer data</button>
                            <button className='button-custom get-data' onClick={() => this.setState({ sendDataClicked: false, getDataClicked: true, homePage: false })}>Press to View the temperature chart</button>
                        </div>
                    </div>
                }
                {
                    sendDataClicked &&
                    <div>
                        <div>
                            <button className='home-button' onClick={() => this.setState({sendDataClicked: false, getDataClicked: false, homePage: true})}>Go to home</button>
                        </div>
                        <FileSelect />
                    </div>
                }
                {
                    getDataClicked && 
                    <div>
                        <div>
                            <button className='home-button' onClick={() => this.setState({sendDataClicked: false, getDataClicked: false, homePage: true})}>Go to home</button>
                        </div>
                        <ViewData />
                    </div>
                }
            </div>
        )
    }
}