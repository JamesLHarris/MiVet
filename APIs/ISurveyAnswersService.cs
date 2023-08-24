    public interface ISurveyAnswersService
    {
        int AddSurveyAnswer(SurveyAnswerAddRequest model, int userId);
        void DeleteSurveyAnswers(int id);
        SurveyQuestionForMappingParent GetQuestionsDetailedById(int id);
        Paged<SurveyQuestionForMappingParent> GetQuestionsDetailedPaginated(int pageSize, int pageIndex);
        SurveyAnswers GetSurveyAnswersById(int id);
        Paged<SurveyAnswers> GetSurveyAnswersPaginated(int pageIndex, int pageSize);
        Paged<SurveyAnswers> SurveyAnswersCreatedBy(int pageIndex, int pageSize, int userId);
        void UpdateSurveyAnswers(ServeyAnswerUpdateRequest model, int userId);
    }
