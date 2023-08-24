    public class SurveyAnswerAddRequest
    {
        [Required]
        public int SurveyInstance { get; set; }
        [Required]
        public int SurveyQuestion { get; set; }
#nullable enable
        public int? AnswerOptionId { get; set; }
        [MinLength(1)]
        [MaxLength(500)]
        public string? Answer { get; set; }
        [Range(1, int.MaxValue)]
        public int? AnswerNumber { get; set; }
#nullable disable
    }
