import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

const ORIGIN = 'http://dlearn-helsinki-backend.herokuapp.com/webapi';
var GET_ANSWERS = '';
var GET_QUESTIONS_FOR_SURVEY = '';

class SpiderGraph extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cpt: 0,
			data: {
				labels: [], //label of the questions 
				datasets: [{
					label: this.props.name,
					lineTension: .1,
					backgroundColor: this.stringToColour(this.props.color),
					borderColor: 'rgba(179,181,198,1)',
					pointBackgroundColor: 'rgba(179,181,198,1)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(179,181,198,1)',
					data: []
				}
				]
			}
		};
	}

	componentDidMount() {
		this.getDataForGraph();
	}

	/*
	// Doesn't work 
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.name !== this.props.name;
	}
	*/


	// Called everytime a props value change
	componentWillReceiveProps(nextProps) {
		this.getDataForGraph();

	}

	// Fetch resquest for questions and answer
	getDataForGraph = function () {
		this.buildRequestRest();
		this.getSurveyQuestionsREST();
		this.getSurveyAnswersREST();
	}

	// Build request from props send to the component
	// ( looks ugly but it's a propotype :) )
	buildRequestRest = function () {

		var s = "";
		if (this.props.students != null) {
			s += '/students/' + this.props.students;
		}
		if (this.props.teachers != null) {
			s += '/teachers/' + this.props.teachers;
		}
		if (this.props.classes != null) {
			s += '/classes/' + this.props.classes;
		}
		if (this.props.groups != null) {
			s += '/groups/' + this.props.groups;
		}
		if (this.props.surveys != null) {
			s += '/surveys/' + this.props.surveys;
		}

		GET_ANSWERS = s + '/answers';
		GET_QUESTIONS_FOR_SURVEY = s + '/questions';

	}



	getSurveyQuestionsREST = function () {
		var component = this;

		var questionLabels = [];

		fetch(ORIGIN + GET_QUESTIONS_FOR_SURVEY, {
			method: "GET",
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Basic ' + btoa('teacher:password')
			}
		}).then(function (response) {
			if (response.ok) {
				response.json().then(data => {
					data.forEach(function (e) {
						questionLabels.push(e.question);
					}, this);

					if (questionLabels.length > 0) {
						component.setState({
							...component.state,
							data: {
								...component.state.data,
								labels: questionLabels
							}
						});
					} else {
						console.log("problem while parsing json data")
					}
				});
			} else {
				console.log('Network response was not ok.');
			}
		}).catch(function (err) {
			// Error :(
			console.log(err);
		});
	}

	getSurveyAnswersREST = function () {
		var component = this;
		var arrayAnswers = [];

		fetch(ORIGIN + GET_ANSWERS, {
			method: "GET",
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Basic ' + btoa('teacher:password')
			}
		}).then(function (response) {
			if (response.ok) {
				response.json().then(data => {
					data.forEach(function (e) {
						arrayAnswers.push(e.answer);
					}, this);

					if (arrayAnswers.length > 0) {
						component.setState({
							...component.state,
							data: {
								...component.state.data,
								datasets: [{
									...component.state.data.datasets,
									label: component.props.name,
									data: arrayAnswers,
									backgroundColor: component.stringToColour(component.props.color),
								}]
							}
						});
					} else {
						console.log("problem while parsing json data")
					}
				});
			} else {
				console.log('Network response was not ok.');
			}
		}).catch(function (err) {
			// Error :(
			console.log(err);
		});
	}

	//take a string and create a original color 
	stringToColour = function (str) {

		// default value if props null
		if (str == null) {
			str = 'unkle - lonely soul';
		}

		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = '#';
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}

		function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }
		function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
		function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
		function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }

		let R = hexToR(colour);
		let G = hexToG(colour);
		let B = hexToB(colour);

		return 'rgba(' + R + ',' + G + ',' + B + ',0.4)';
	}


	render() {
		return (
			<Radar data={this.state.data} />
		);
	}
}

export default SpiderGraph;