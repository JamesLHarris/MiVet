import React, { useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import surveyAnswersService from "services/surveyAnswersService";
import Question from "./Question";
import PropTypes from "prop-types";
import toastr from "toastr";
import { useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { useMemo } from "react";
import "./surveyanswer.css";
import { useEffect } from "react";

function SingleSurvey() {
  const state = useLocation();
  const navigate = useNavigate();
  const [instanceData, setInstanceData] = useState({
    instanceId: 0,
  });

  const parentValue = {};

  const survey = state.state?.payload.singleSurvey;

  useEffect(() => {
    let payload = { surveyId: survey.id };
    surveyAnswersService
      .createInstance(payload)
      .then(createInstanceSuccess)
      .catch(createInstanceError);
  }, []);

  const createInstanceError = () => {
    toastr.error("Failed to create Instance.", "Error");
  };

  const createInstanceSuccess = (response) => {
    let getData = response.item;
    setInstanceData((prevState) => {
      const pd = { ...prevState };
      pd.instanceId = getData;
      return pd;
    });
  };

  const mapQuestions = (question) => (
    <Question
      question={question}
      surveyId={survey.id}
      key={question.id}
      answerState={parentValue}
      surveyInstance={instanceData.instanceId}
    ></Question>
  );

  const questionComponents = useMemo(
    () => survey?.questions?.map(mapQuestions),
    [survey?.questions, instanceData.instanceId]
  );

  const goBack = () => {
    navigate(`/dashboard/answers/available`);
  };

  const goSubmit = () => {
    onSubmitSuccess();
    navigate(`/dashboard/answers/available`);
  };

  const onSubmitSuccess = () => {
    toastr.success("Thank You!");
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className="d-flex m-1 w-75 justify-content-center">
        <Card.Header className="d-flex justify-content-center">
          <h1>{survey.surveyName}</h1>
        </Card.Header>
        <Card.Body className="survey-question-container">
          <Formik
            enableReinitialize={true}
            initialValues={parentValue}
          >
            <Form>
              {questionComponents}
              <Card.Footer>
                <div className="d-flex survey-button-container">
                  <Button
                    variant="primary"
                    type="button"
                    className="survey-submit-button"
                    onClick={goSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    className="survey-go-back-button"
                    onClick={goBack}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Footer>
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}

SingleSurvey.propTypes = {
  survey: PropTypes.shape({
    id: PropTypes.number.isRequired,
    surveyName: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        surveyName: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        questionTypeId: PropTypes.number.isRequired,
        answerOptions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            questionId: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
          })
        ),
      })
    ),
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default SingleSurvey;
