import React, { Component } from 'react';
import { Chart } from 'react-charts';

export default class ViewData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fileSelectedName: '',
            data: null
        }
        this.files = ['THERM0001', 'THERM0002', 'THERM0003', 'THERM0004', 'THERM0005'];
    }

    getData = (event) => {
        const { name } = event.target;
        this.setState({ fileSelectedName: name });
        if (name === 'THERM0001') {
            fetch('http://localhost:3001/thermometer/getReadings/' + event.target.name, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(response => { 
                    console.log(response);
                    let obj = []
                    response[0].reading.map((item, index) => {
                        obj.push([item.ts, item.val]);
                        return obj;
                    })
                    this.setState({ data: obj });
                })
                .catch(err => console.log(err));  
        }
        else {
            alert(`We currently do not have chart of ${name}`);
        }
    }

    renderList = () => {
        const { fileSelectedName } = this.state;
        return this.files.map((name, index) => {
            return (
                <li key={index}>
                    <button className={fileSelectedName === name ? 'file active' : 'file' } name={name} onClick={this.getData}>{name}.json</button>
                </li>
            )
        })
    }

    render() {
        return (
            <div className='view-data'>
                <h1 className='heading'>Chart of Thermometer reading vs time</h1>
                <ul>
                    {this.renderList()} 
                </ul>
                {   this.state.data &&
                    <div className='chart-container'>
                        <Chart
                            data={
                                [{
                                    label: "THERM0001",
                                    data: this.state.data
                                }]
                            }
                            axes={[
                            { primary: true, type: "linear", position: "bottom" },
                            { type: "linear", position: "left" }
                            ]}
                        />
                    </div>
                }
            </div>
        )
    }
}
