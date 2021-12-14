/*
1. Elemente zufällig abfragen
--> Math.random Funktion und aus Objekt oder Array wählen
2. bestimmtes Wort, dazu eine richtige Antwort und 3 falsche
--> großes Objekt oder Array
3. Eingabe durch Buttons
--> mit EventListener
4. visuelles Feedback, ob richtig oder falsch
--> hinzufügen von CSS Klasse
5. Updaten von Stats auf Unterseite
--> Variablen und Funktionen
*/

class IrregularVerb {
    constructor(verb, right, wrongFirst, wrongSecond, wrongThird) {
        this._verb = verb;
        this._right = right;
        this._wrong = [wrongFirst, wrongSecond, wrongThird];
    }

    get verb() {
        return this._verb;
    }
    get rightAnswer() {
        return this._right;
    }
    randomOrder() {
        return this._wrong.sort(() => 0.5 - Math.random());
    }
}

const irregularVerbList = [
    new IrregularVerb("read", "read", "rode", "ride", "ridden"),
    new IrregularVerb("go", "went", "gone", "got", "goed")
]


function displayContent() {
    const question = document.querySelector(".question");
    const answerBoxes = document.querySelectorAll(".verb");
    const positionRightAnswer = answerBoxes[Math.floor(Math.random() * 4)];
    let randomNumber = Math.floor(Math.random() * irregularVerbList.length);
    const randomWrongAnswer = (irregularVerbList[randomNumber].randomOrder());
    let usedWrongAnswers = 0;
    
    question.innerHTML = "(to) " + irregularVerbList[randomNumber].verb;
    positionRightAnswer.innerHTML = irregularVerbList[randomNumber].rightAnswer;
    console.log(irregularVerbList[randomNumber].rightAnswer);
    console.log(randomWrongAnswer);
    for (let i = 0; i < 4; i++) {
        if (answerBoxes[i] !== positionRightAnswer) {
            answerBoxes[i].innerHTML = randomWrongAnswer[usedWrongAnswers];
            usedWrongAnswers++; 
        }
    }
}

displayContent();