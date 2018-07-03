import React, { Component } from 'react';
import '../styles/App.css';
import SearchBar from "./search/SearchBar";
import PatientDemographics from './demographics/PatientDemographics';
import PatientConditions from './conditions/PatientConditions';

class App extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.setPatientId = this.setPatientId.bind(this);
        this.state = {
            patientId: null,
            demographics: null,
            conditions: null,
            loadingDemographics: false,
            loadingConditions: false,
            error: false,
        };
    }

    setPatientId(event) {
        this.setState({ patientId: event.target.value });
    }

    search() {
        if (this.state.patientId != null) {
            this.getPatientDemographics();
            this.getPatientConditions();
        }
        else {
            this.setState({
                demographics: null,
                conditions: null,
            })
        }
    }

    getPatientDemographics() {
        this.setState({ loadingDemographics: true});
        fetch('https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/' + this.state.patientId, {
                headers: {
                    "Accept": "application/json+fhir"
                }
            })
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.setState({
                    demographics: data,
                    loadingDemographics: false,
                });
            })
            .catch(() => {
                this.setState({
                    demographics: null,
                    loadingDemographics: false,
                })
            });
    }

    getPatientConditions() {
        this.setState({ loadingConditions: true });
        fetch('https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition?patient=' + this.state.patientId + '&clinicalstatus=active', {
                headers: {
                    "Accept": "application/json+fhir"
                }
            })
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.setState({
                    conditions: data != null ? data.entry : null,
                    loadingConditions: false,
                });
            })
            .catch(() => {
                this.setState({
                    conditions: null,
                    loadingConditions: false,
                })
            });
    }

    render() {
        if (this.state.error) {
            return <p>Sorry! There was an unexpected issue, call Mike</p>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Patient Conditions Search</h1>
                </header>
                <SearchBar onChangeSearchTerm={this.setPatientId} searchFunction={this.search}/>
                {this.renderSearchResults()}
            </div>
        );
    }

    renderSearchResults() {
        if (this.state.loadingDemographics) {
            return <p>Loading...</p>;
        }
        if (this.state.demographics == null) {
            return <p>No Results</p>;
        }

        return (
            <div>
                <PatientDemographics patientName={this.state.demographics.name[0].text}
                                     patientGender={this.state.demographics.gender}
                                     patientDob={this.state.demographics.birthDate}/>
                {this.renderConditions()}
            </div>
        );
    }

    renderConditions() {
        if (this.state.loadingConditions) {
            return <p>Loading conditions...</p>;
        }
        if (this.state.conditions == null) {
            return <p>This patient has no conditions</p>;
        }

        return <PatientConditions conditions={this.state.conditions}/>;
    }
}

export default App;
