
CREATE proc [dbo].[SurveyAnswers_Select_ById]
@Id int 
as
/*
			--TEST CODE--
			Execute SurveyAnswers_Select_ById 8
*/

Begin

SELECT		sa.[Id]
			,si.[SurveyId] as SurveyInstance
			,su.[Id] as SurveyId
			,su.[Name] as SurveyName
			,su.[Description] as SurveyDescription
			,stt.[Id] as SurveyStatusId
			,stt.[Name] as SurveyStatusName
			,sut.[Id] as StatusTypeId
			,sut.[Name] as StatusTypeName
			,u.[Email] as CreatorEmail
			,u.[FirstName] as CreatorFirstName
			,u.[LastName] as CreatorLastName
			,u.[Id] as CreatorId
			,u.[AvatarUrl] as CreatorAvatar
			,su.[DateCreated] as SurveyCreatedDate
			,su.[DateModified] as SurveyModifiedDate
			,si.[UserId] as SurveyUser
			,si.[DateCreated] as InstanceCreatedDate
			,si.[DateModified] as InstanceModifiedDate
			,sq.[Id] as QuestionId
			,sq.[UserId] as QuestionUser
			,sq.[Question]
			,sq.[HelpText]
			,sq.[IsRequired]
			,sq.[IsMultipleAllowed]
			,qt.[Id] as QuestionTypeId
			,qt.[Name] as QuestionTypeName
			,sq.[SurveyId]
			,ss.[Id] as SurveyStatusId
			,ss.[Name] as SurveyStatusName
			,sq.[SortOrder]
			,sq.[DateCreated] as SurveyQuestionDateCreated
			,sq.[DateModified] as SurveyQuestionDateModified
			,sa.[AnswerOptionId] as AnswerOption
			,sa.[Answer]
			,sa.[AnswerNumber]
			,sa.[DateCreated]
			,sa.[DateModified]
			,TotalCount = COUNT(1) OVER()

FROM [dbo].[SurveyAnswers] as sa
inner join dbo.SurveysInstances as si on sa.InstanceId = si.Id
inner join dbo.Surveys as su on si.SurveyId = su.Id
inner join dbo.StatusTypes as stt on su.StatusId = stt.Id
inner join dbo.SurveyTypes as sut on su.SurveyTypeId = sut.Id
inner join dbo.Users as u on su.CreatedBy = u.Id
inner join dbo.SurveyQuestions as sq on sa.QuestionId = sq.Id
inner join dbo.QuestionTypes as qt on sq.QuestionTypeId = qt.Id
inner join dbo.SurveyStatus as ss on sq.StatusId = ss.Id

WHERE sa.Id=@Id;
END
GO
