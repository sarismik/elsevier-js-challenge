import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/patientConditions.css';

class PatientConditions extends Component {
    static propTypes = {
        conditions: PropTypes.array.isRequired,
    };

    render() {
        const conditionsList = this.props.conditions.map((condition) =>
            <tr>
                <td width="350px">
                    <a href={'https://www.ncbi.nlm.nih.gov/pubmed/?term=' + condition.resource.code.text}
                       title='Click to search PubMed for this condition'
                       target='_blank'>
                        {condition.resource.code.text}
                    </a>
                </td>
                <td width="150px">{condition.resource.dateRecorded}</td>
            </tr>
        );

        return (
            <div className='conditions'>
                <table className='conditions-table'>
                    <tbody>
                    <tr><th>Condition Name</th><th>Date Recorded</th></tr>
                    {conditionsList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PatientConditions;