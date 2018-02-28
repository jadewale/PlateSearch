import React from 'react';
import {connect} from 'react-redux';
import {createLicense} from "../../../actions/userActions";
import {withRouter} from 'react-router-dom';

class  RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            file: {}
        };
    }

    componentDidMount() {
    }

    onChangeFields = (evt) => {
        let object = this.state.fields;
        object[evt.target.name] = evt.target.value;
        this.setState({fields: {...object}})
    };

    onSubmitForm = () => {
        let fieldData = this.state.fields;
        fieldData['file'] = this.state.file.name;
        fieldData['user'] = this.props.user.email;
        this.props.createLicense(fieldData, this.state.file);
    };

    onFile = (e) => {
        let files = e.target.files;
        let object = this.state.file;
        object.file = files[0];
        this.setState({file: files[0]})
    };

    componentWillReceiveProps(nextprops) {
        if(nextprops.userLicense !== this.props.userLicense && this.state.file.name) {
            console.log('Came here');
            this.props.history.push('/dashboard/search');
        }
    }

    render() {

        return (
            <div className="">
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">Registration</h3>
                    </div>
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <label for="inputPassword3" className="col-sm-2 control-label">Name</label>

                                <div className="col-sm-10">
                                    <input onChange={this.onChangeFields} name="name" type="input" className="form-control"
                                           id="inputPassword3" placeholder="Name"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputEmail3" className="col-sm-2 control-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email"onChange={this.onChangeFields} name="email" className="form-control"
                                           id="inputEmail3" placeholder="Email"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputPassword3" className="col-sm-2 control-label">License Plate</label>

                                <div className="col-sm-10">
                                    <input type="input" onChange={this.onChangeFields} name="plate" className="form-control"
                                           id="inputPassword3" placeholder="License Plate"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputPassword3" className="col-sm-2 control-label">Car Model</label>

                                <div className="col-sm-10">
                                    <input type="input" onChange={this.onChangeFields} name="model" className="form-control"
                                           id="inputPassword3" placeholder="Car Model"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputPassword3" className="col-sm-2 control-label">Upload</label>

                                <div className="col-sm-10">
                                    <input type="file" onChange={this.onFile} name="model"
                                           id="inputPassword3" placeholder="Car Model"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox"/> Remember me
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="button" onClick={this.onSubmitForm} className="btn btn-info pull-right">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.userProfile,
        userLicense: state.user.userLicense,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createLicense: (data, file) => dispatch(createLicense(data, file)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm))


