export class QuizPageQuizobject {
    questionID: number;
    question: string;
    answers: string[];
    correctAnswer: number;

    constructor(questionID: number, question: string, answers: string[], correctAnswer: number) {

        this.questionID = questionID;
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;

    }
}