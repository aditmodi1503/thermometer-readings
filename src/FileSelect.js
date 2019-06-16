import React, { Component } from 'react';

export default class FileSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clickedBrowse: false,
            fileSelectedName: '',
            fileSelected: null,
            didSelectFile: false
        }
        this.files = ['THERM0001', 'THERM0002', 'THERM0003', 'THERM0004', 'THERM0005'];
    }

    showFiles = () => {
        this.setState({clickedBrowse: true})
    }

    selectFile = (event) => {
        event.preventDefault();
        const { name } = event.target;
        if (name === 'THERM0001') {
            this.setState({
                fileSelectedName: name,
                fileSelected: require(`./${name}.json`),
                didSelectFile: true,
            })
        }
        else {
            this.setState({
                fileSelectedName: name,
                // fileSelected: require(`./${name}.json`),
                didSelectFile: true
            })
        }
    }

    sendData = () => {
        const { fileSelected, fileSelectedName } = this.state;
        if (fileSelectedName === 'THERM0001') {
            fetch('http://localhost:3001/thermometer/postReadings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: fileSelected,
                    name: fileSelectedName
                })
            })
                .then(res => res.json())
                .then(resp => alert(resp.message));
        }
        else {
            alert(`There is no need for manual entry for ${fileSelectedName}.json`);
        }
    }

    renderList = () => {
        const { fileSelectedName } = this.state;
        return this.files.map((name, index) => {
            return (
                <li key={index}>
                    <button className={fileSelectedName === name ? 'file active' : 'file' } name={name} onClick={this.selectFile}>{name}.json</button>
                </li>
            )
        })
    }


    render() {
        const { clickedBrowse, didSelectFile, fileSelectedName } = this.state;
        return (
            <div className='file-select'>
                <h1 className='heading'>UPLOAD THERMOMETER READINGS</h1>
                <div className='fileselect'>
                    <div>
                        <div className='step step-1'>Step 1. Click on Browse and select a file</div>
                        <button className='button-custom browse' onClick={this.showFiles}>Browse</button>
                    </div>
                    {
                        clickedBrowse &&
                        <div>
                            <div className='step step-2'>Step 2. Select a file</div>
                            <ol className='list'>
                                {
                                    this.renderList()
                                }
                            </ol>
                        </div>
                    }
                    {
                        didSelectFile &&
                        <div>
                            <div className='step step-3'>Step 3. Press the send button (File Selected: {fileSelectedName}.json)</div>
                            <button onClick={this.sendData} className='button-custom send'>Send</button>
                        </div>

                    }
                </div>
            </div>
        )
    }
}