    [Route("api/answers")]
    [ApiController]
    public class SurveysAnswersApiController : BaseApiController
    {
        private IAuthenticationService<int> _authService = null;
        private ISurveyAnswersService _service = null;
        private ILogger _logger;


        public SurveysAnswersApiController(ISurveyAnswersService service
          , IAuthenticationService<int> authService
          , ILogger<SurveysApiController> logger) : base(logger)
        {
            _authService = authService;
            _service = service;
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(SurveyAnswerAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int currentUserId = _authService.GetCurrentUserId();

                int id = _service.AddSurveyAnswer(model, currentUserId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());

                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ServeyAnswerUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int currentUserId = _authService.GetCurrentUserId();

                _service.UpdateSurveyAnswers(model, currentUserId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<SurveyAnswers>> GetBy(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveyAnswers course = _service.GetSurveyAnswersById(id);

                if (course == null)
                {
                    code = 404;
                    response = new ErrorResponse("Not found.");
                }
                else
                {
                    response = new ItemResponse<SurveyAnswers> { Item = course };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");

            }
            return StatusCode(code, response);
        }

        [HttpGet("available/{id:int}")]
        public ActionResult<ItemResponse<SurveyQuestionForMappingParent>> GetQuestionsDetailedById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveyQuestionForMappingParent course = _service.GetQuestionsDetailedById(id);

                if (course == null)
                {
                    code = 404;
                    response = new ErrorResponse("Not found.");
                }
                else
                {
                    response = new ItemResponse<SurveyQuestionForMappingParent> { Item = course };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");

            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteSurveyAnswers(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);

            }

            return StatusCode(code, response);
        }

        [HttpGet("available")]
        public ActionResult<ItemResponse<Paged<SurveyQuestionForMappingParent>>> GetQuestionsPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyQuestionForMappingParent> pages = _service.GetQuestionsDetailedPaginated(pageIndex, pageSize);

                if (pages == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyQuestionForMappingParent>> { Item = pages };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<SurveyAnswers>>> Search(int pageIndex, int pageSize, int search)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {

                Paged<SurveyAnswers> page = _service.SurveyAnswersCreatedBy(pageIndex, pageSize, search);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyAnswers>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
