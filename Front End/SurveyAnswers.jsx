import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Breadcrumb } from "react-bootstrap";
import PropTypes from "prop-types";
import toastr from "toastr";
import "../../toastr/build/toastr.css";
import surveyAnswersService from "services/surveyAnswersService";
import AvailableSurvey from "./AvailableSurvey";

const SurveyAnswers = ({ currentUser }) => {
  const [pageData] = useState({
    pageIndex: 0,
    pageSize: 30,
    userId: currentUser.id,
  });

  const [surveys, setSurveys] = useState({
    arrayOfSurveys: [],
    surveyComponents: [],
  });

  useEffect(() => {
    surveyAnswersService
      .getAllSurveysDetailedPaginated(pageData.pageIndex, pageData.pageSize)
      .then(onGetUserSurveySuccess)
      .catch(onGetError);
  }, []);

  const onGetUserSurveySuccess = (response) => {
    let getData = response.item.pagedItems;
    setSurveys((prevState) => {
      const pd = { ...prevState };
      let filteredData = getData.filter((survey) => survey.statusId === 1);
      pd.surveyComponents = filteredData.map(mapSurveys);
      pd.arrayOfSurveys = getData;
      return pd;
    });
  };
  const onGetError = () => {
    toastr.error("Failed to load surveys on AnswersPage.", "Error");
  };

  const mapSurveys = (survey) => {
    return (
      <AvailableSurvey
        singleSurvey={survey}
        key={survey.id}
        name={survey.surveyName}
        description={survey.surveyDescription}
        authors={survey.createdBy}
        available={survey.dateModified}
      ></AvailableSurvey>
    );
  };

  return (
    <Fragment>
      <div className="py-4 py-lg-6 bg-colors-gradient d-lg-flex align-items-center justify-content-between">
        <Container>
          <Row>
            <Col lg={{ span: 11, offset: 1 }} md={12} sm={12}>
              <div className="mb-4 mb-lg-0">
                <h1 className="text-black mb-1">Please Take Our Survey!</h1>
                <p className="mb-0 text-black lead">
                  We here at MiVet would love your input and how we can provide
                  better service to you and our patients.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Card className="border-0">
        <Card.Body>
          <div>
            <Row>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                    <div className="mb-3 mb-md-0">
                      <Breadcrumb>
                        <Breadcrumb.Item href="/dashboard/admin">
                          Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                          Available Surveys
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </div>
                </Col>
              </Row>
            </Row>
          </div>
        </Card.Body>
        {/*Table*/}
        <Card.Body>
          <Table responsive className="table">
            <thead>
              <tr>
                <th scope="col">SURVEY</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">AVAILABLE SINCE</th>
                <th scope="col">BY</th>
                <th scope="col">TAKE SURVEY</th>
              </tr>
            </thead>
            <tbody>{surveys.surveyComponents}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

SurveyAnswers.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default SurveyAnswers;
