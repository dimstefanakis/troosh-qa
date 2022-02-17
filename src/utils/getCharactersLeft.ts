import {QuestionInterface} from '../features/Question/interface'

function getCharactersLeft(question: QuestionInterface){
  let feedbackText = ''
  if (question.body.length == 0) {
    feedbackText = "Type a question!";
  } else if (question.body.length < 15) {
    feedbackText = "Your question is too broad";
  } else if (question.body.length < 30) {
    feedbackText = "Try to be a bit more specific, almost there!";
  } else {
    feedbackText = "Ready to go!";
  }

  return feedbackText;
}

export default getCharactersLeft;
