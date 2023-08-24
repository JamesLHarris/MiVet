    public class ServeyAnswerUpdateRequest : SurveyAnswerAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
