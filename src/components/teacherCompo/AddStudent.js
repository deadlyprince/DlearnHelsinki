import React from "react";
import { withTranslate } from 'react-redux-multilingual';


class AddStudent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            getStudentSelected: false,
            createStudentSelected: true,
        }
    }

    componentDidMount() {
        document.getElementById('get').checked = true;
    }

    renderExistedStudent = function () {
	const { translate } = this.props;
        let lst = this.props.allStudentsList;

        let options = [];
        if (lst != null) {
            options.push(<option value={-1}> {translate('select_student')} </option>);
            lst.forEach(function (s) {
                options.push(<option value={s._id}> {s.username} </option>)
            });
        }
        return (
            <select hidden={this.state.getStudentSelected} defaultValue={null} onChange={this.props.onChangeSelect}>
                {options}
            </select>
        )
    }

    renderCreateNewStudent = function () {
	const { translate } = this.props;
        return (
            <div hidden={this.state.createStudentSelected}>

                <h6>{translate('username')} :</h6>
                <p>
                  <input type="text" placeholder={this.props.username}
                    onChange={this.props.onChangeUsername} />
                </p>
                <h6>{translate('gender')} :</h6>
                <p>
                <select onChange={this.props.onChangeGender}>
                    <option>{translate('gender')} </option>
                    <option>{translate('male')}</option>
                    <option>{translate('female')}</option>
                </select>
                </p>
                <p>
                <h6>{translate('age')} :</h6><input type="number" min={1} max={99} placeholder={this.props.age}
                    onChange={this.props.onChangeAge} />
                </p>
                <p>
                <h6>{translate('password')} :</h6><input type="text" placeholder={this.props.password}
                    onChange={this.props.onChangePassword} />
                  </p>
                <p className="bg-warning"> {translate('warning_password')}</p>
            </div>
        )
    }

    renderFrom = function (e) {


        // UNCOMMENT WHEN BACK END READY TO SUPPORT ASS ALREADY EXISTING STUDENTS
        if (e.target.id === "get") {
            let checkGet = e.target;
            let checkCreate = document.getElementById('create');
            if (checkGet.checked) {
                checkCreate.checked = false;
            } else {
                checkCreate.checked = true;
            }
        } else if (e.target.id === "create") {
            let checkGet = document.getElementById('get');
            let checkCreate = e.target;
            if (checkCreate.checked) {
                checkGet.checked = false;
            } else {
                checkGet.checked = true;
            }
        }


        this.setState({
            getStudentSelected: !document.getElementById('get').checked,
            createStudentSelected: !document.getElementById('create').checked,

        })


    }

    render() {
	const { translate } = this.props;
        return (
            <div>


                <input type="checkbox" id="get" value={1} onChange={this.renderFrom.bind(this)} /> {translate('existing_student')} <br />
                {this.renderExistedStudent()}

                <hr wight='2px' />


                <input type="checkbox" id="create" value={2} onChange={this.renderFrom.bind(this)} /> {translate('make_a_student')}<br />
                {this.renderCreateNewStudent()}
            </div>
        )


    }
}


export default withTranslate(AddStudent);
