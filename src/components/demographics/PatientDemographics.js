import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/patientDemographics.css';

class PatientDemographics extends Component {
    static propTypes = {
        patientName: PropTypes.string.isRequired,
        patientGender: PropTypes.string.isRequired,
        patientDob: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <table className='demographics-table'>
                    <tbody>
                        <tr>
                            <th>Name</th><td>{this.props.patientName}</td>
                            <th>Gender</th><td>{this.props.patientGender}</td>
                            <th>D.O.B</th><td>{this.props.patientDob}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PatientDemographics;