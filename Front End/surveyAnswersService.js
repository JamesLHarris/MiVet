import axios from "axios";
import {
	onGlobalSuccess,
	onGlobalError,
	API_HOST_PREFIX,
} from "./serviceHelpers";

const surveyQuestionsEndpoint = `${API_HOST_PREFIX}/api/survey/questions`;
const surveysEndpoint = `${API_HOST_PREFIX}/api/surveys`;
const surveyInstancesEndpoint = `${API_HOST_PREFIX}/api/instances`
const surveyDetailedEnpoint = `${API_HOST_PREFIX}/api/answers/available`
const surveyAnswersEndpoint = `${API_HOST_PREFIX}/api/answers`

const deleteSurveyOnly = (id) => {
	const config = {
		method: "DELETE",
		url: `${surveysEndpoint}/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllSurveyQuestionsPaginated = () => {
	const config = {
		method: "GET",
		url: `${surveyQuestionsEndpoint}/paginate?pageIndex=0&pageSize=10`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllSurveysDetailedPaginated = (pageIndex,pageSize) => {
	const config = {
		method: "GET",
		url: `${surveyDetailedEnpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};


const editTitle = (id, payload) => {
	const config = {
		method: "PUT",
		url: `${surveysEndpoint}/${id}`,
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllSurveysPaginated = (pageIndex, pageSize,) => {
	const config = {
		method: "GET",
		url: `${surveyQuestionsEndpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getSurveysById = (id) => {
	const config = {
		method: "GET",
		url: `${surveyDetailedEnpoint}/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const sumbitSurvey = (payload) =>{
	const config = {
		method: "POST",
		url: `${surveyQuestionsEndpoint}`,
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" }
	  };
	  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const sumbitAnswer = (payload) =>{
	const config = {
		method: "POST",
		url: `${surveyAnswersEndpoint}`,
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" }
	  };
	  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const createInstance = (id) =>{

	const config = {
		method: "POST",
		url: `${surveyInstancesEndpoint}`,
		data: id,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" }
	  };
	
	  return axios(config).then(onGlobalSuccess).catch(onGlobalError);

}


const surveyAnswersService = {
	editTitle,
	deleteSurveyOnly,
	getAllSurveysPaginated,
	getAllSurveyQuestionsPaginated,
	getSurveysById,
	sumbitSurvey,
	sumbitAnswer,
	createInstance,
	getAllSurveysDetailedPaginated,
};

export default surveyAnswersService;