USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_SelectAll_ForAnswers]    Script Date: 12/15/2022 11:06:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		James Harris
-- Create date: 20221215
-- Description:	Returns Paginated Response for users to answer questions to a specific survey
-- Code Reviewer: Ryan Pabalan


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================


CREATE PROC [dbo].[Surveys_SelectAll_ForAnswers]
	@pageIndex int
	,@pageSize int
	

/*

	execute dbo.Surveys_SelectAll_ForAnswers 0,20

*/
as

BEGIN

DECLARE @offset int = @pageSize * @pageIndex

SELECT su.Id
      ,su.[Name]
      ,su.[Description]
      ,su.StatusId
      ,[SurveyTypeId]
      ,u.Email as AuthorEmail
	  ,u.Id as AuthorId
	  ,u.FirstName as AuthorFirstName
	  ,u.LastName as AuthorLastName
	  ,u.AvatarUrl as AuthorPicture
	  ,Questions = (
			SELECT sq.[Id]
				  ,sq.[Question]
				  ,sq.[QuestionTypeId]
				  ,AnswerOptions=(
			SELECT ao.[Id]
					,ao.[QuestionId]
					,ao.[Text]
					FROM [dbo].[SurveyQuestionAnswerOptions] as ao
					Where ao.QuestionId = sq.Id
					FOR JSON AUTO)
			  FROM [dbo].[SurveyQuestions] as sq
			  WHERE sq.SurveyId = su.Id
			  FOR JSON AUTO)
		
      ,su.DateModified
	  ,COUNT(1) OVER() as TotalCount
  FROM [dbo].[Surveys] as su
  INNER JOIN dbo.SurveyQuestions as sq
  on sq.SurveyId = su.Id
  inner join dbo.Users as u on su.CreatedBy = u.Id


      GROUP BY su.Id
		   ,su.[Name]
		   ,su.[Description]
		   ,su.StatusId
		   ,su.SurveyTypeId
			,u.Email
			,u.FirstName
			,u.LastName
			,u.Id
			,u.AvatarUrl
		   ,su.DateModified 

  ORDER BY su.Id

  OFFSET @Offset ROWS 
  FETCH NEXT @pageSize ROWS ONLY
END
GO
