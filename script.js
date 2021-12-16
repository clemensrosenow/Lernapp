let beantworteteFragen = 0;
let richtigInFolge = 0;
let richtigeAntworten = 0;
let stats = document.querySelectorAll(".number");
const answerBoxes = document.querySelectorAll(".verb");
const answerButtons = document.querySelectorAll(".box");
let answerBoxNumber = 0;
let positionRightAnswer = answerBoxes[answerBoxNumber];
let highScore = parseInt(localStorage.getItem("highScore"));
if(localStorage.getItem("highScore") == null) {
    localStorage.setItem("highScore", 0);
};

stats[1].innerHTML = parseInt(localStorage.getItem("highScore"));


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
    new IrregularVerb("arise", "arose", "arouse", "arised", "arisen"),
    new IrregularVerb("awake", "awoke", "awoken", "awaked", "awaken"),
    new IrregularVerb("be", "was/were", "been", "bed", "wos/wer"),
    new IrregularVerb("bear", "bore", "bear", "beared", "boren"),
    new IrregularVerb("beat", "beat", "bat", "beated", "boat"),
    new IrregularVerb("become", "became", "become", "becamed", "becomed"),
    new IrregularVerb("begin", "began", "beginned", "begun", "begin"),
    new IrregularVerb("bend", "bent", "bented", "bended", "bond"),
    new IrregularVerb("bet", "bet", "bid", "bett", "bot"),
    new IrregularVerb("bind", "bound", "binted", "bint", "bund"),
    new IrregularVerb("bite", "bit", "bite", "bout", "bote"),
    new IrregularVerb("bleed", "bled", "blood", "bleed", "blet"),
    new IrregularVerb("blow", "blew", "blown", "blow", "bluw"),
    new IrregularVerb("break", "broke", "broken", "break", "breaked"),
    new IrregularVerb("breed", "bred", "breed", "brod", "breeded"),
    new IrregularVerb("bring", "brought", "brang", "brung", "bring"),
    new IrregularVerb("broadcast", "broadcast", "broadcasted", "breadcast", "broadcost"),
    new IrregularVerb("build", "built", "build", "builden", "builted"),
    new IrregularVerb("burn", "burnt/burned", "burn/burnted", "burnt", "burn"),
    new IrregularVerb("burst", "burst", "busted", "bursted", "borst"),
    new IrregularVerb("buy", "bought", "boght", "bord", "bored"),
    new IrregularVerb("can", "could", "cold", "can", "cauld"),
    new IrregularVerb("catch", "caught", "cought", "catched", "cotch"),
    new IrregularVerb("choose", "chose", "choose", "chosen", "chuse"),
    new IrregularVerb("cling", "clung", "clought", "clang", "cling"),
    new IrregularVerb("come", "came", "come", "comm", "comed"),
    new IrregularVerb("cost", "cost", "costed", "coast", "coust"),
    new IrregularVerb("creep", "crept", "crep", "creeped", "creept"),
    new IrregularVerb("cut", "cut", "cutted", "cot", "cutting"),
    new IrregularVerb("deal", "dealt", "dealing", "dealed", "deal"),
    new IrregularVerb("dig", "dug", "dig", "duck", "digged"),
    new IrregularVerb("do", "did", "done", "does", "dod"),
    new IrregularVerb("draw", "drew", "drawn", "drewn", "drawed"),
    new IrregularVerb("dream", "dreamt/dreamed", "dreamted/dream", "dream", "dreaming"),
    new IrregularVerb("drink", "drank", "drunk", "dranken", "dronk"),
    new IrregularVerb("drive", "drove", "driven", "drived", "drouve"),
    new IrregularVerb("eat", "ate", "eaten", "eating", "eaded"),
    new IrregularVerb("fall", "fell", "full", "filled", "falled"),
    new IrregularVerb("feed", "fed", "feed", "feet", "fet"),
    new IrregularVerb("feel", "felt", "fault", "feeled", "fealt"),
    new IrregularVerb("fight", "fought", "foght", "fighted", "fight"),
    new IrregularVerb("find", "found", "founded", "fund", "fand"),
    new IrregularVerb("fly", "flew", "flown", "flied", "flyed"),
    new IrregularVerb("forbid", "forbade", "forbid", "forbad", "forbidden"),
    new IrregularVerb("forget", "forgot", "forgotted", "forgetted", "forgit"),
    new IrregularVerb("forgive", "forgave", "forgiven", "forgaven", "forgive"),
    new IrregularVerb("freeze", "froze", "frooze", "freezed", "frozen"),
    new IrregularVerb("get", "got", "gott", "gotten", "getten"),
    new IrregularVerb("give", "gave", "given", "gaved", "gouve"),
    new IrregularVerb("go", "went", "gone", "got", "goed"),
    new IrregularVerb("grind", "ground", "grinded", "grint", "grounded"),
    new IrregularVerb("grow", "grew", "grewn", "grown", "gruw"),
    new IrregularVerb("hang", "hung", "hang", "hanging", "heng"),
    new IrregularVerb("have", "had", "haven", "haved", "have"),
    new IrregularVerb("hear", "heard", "heart", "heared", "hearet"),
    new IrregularVerb("hide", "hid", "hidden", "hide", "hode"),
    new IrregularVerb("hit", "hit", "hitt", "hitted", "hited"),
    new IrregularVerb("hold", "held", "hold", "helt", "holded"),
    new IrregularVerb("hurt", "hurt", "hurting", "hourt", "hort"),
    new IrregularVerb("keep", "kept", "keep", "keeped", "keept"),
    new IrregularVerb("kneel", "knelt", "kneelt", "kneeled", "kneed"),
    new IrregularVerb("know", "knew", "known", "knewn", "knuw"),
    new IrregularVerb("lay", "laid", "layd", "lay", "lait"),
    new IrregularVerb("lead", "led", "leat", "lead", "let"),
    new IrregularVerb("lean", "leant/leaned", "leanted/lean", "leant", "lean"),
    new IrregularVerb("learn", "learnt/learned", "learnted/learn", "learnt", "learn"),
    new IrregularVerb("leave", "left", "leaved", "leavt", "leave"),
    new IrregularVerb("lend", "lent", "lend", "lended", "lented"),
    new IrregularVerb("lie (in bed)", "lay", "laid", "lied", "lain"),
    new IrregularVerb("light", "lit/lighted", "light/litted", "litt", "light"),
    new IrregularVerb("lose", "lost", "losen", "losed", "losd"),
    new IrregularVerb("make", "made", "maked", "maden", "make"),
    new IrregularVerb("may", "might", "may", "mayd", "mighted"),
    new IrregularVerb("mean", "meant", "meand", "meaned", "meanted"),
    new IrregularVerb("meet", "met", "meet", "meeted", "mett"),
    new IrregularVerb("pay", "paid", "payed", "paied", "payd"),
    new IrregularVerb("put", "put", "putt", "pud", "puted"),
    new IrregularVerb("read", "read", "rode", "ride", "ridden"),
    new IrregularVerb("ride", "rode", "ridden", "read", "rided"),
    new IrregularVerb("ring", "rang", "rung", "ringed", "ranged"),
    new IrregularVerb("rise", "rose", "risen", "ruse", "rosed"),
    new IrregularVerb("run", "ran", "run", "rann", "runned"),
    new IrregularVerb("say", "said", "sayd", "say", "saied"),
    new IrregularVerb("see", "saw", "seed", "sawed", "see"),
    new IrregularVerb("sell", "sold", "selled", "solled", "seld"),
    new IrregularVerb("send", "sent", "send", "sendt", "sended"),
    new IrregularVerb("set", "set", "sett", "sedt", "sad"),
    new IrregularVerb("shake", "shook", "shaken", "shaked", "shocked"),
    new IrregularVerb("shall", "should", "shall", "shalled", "shoud"),
    new IrregularVerb("shed", "shed", "shet", "sheded", "shedt"),
    new IrregularVerb("shine", "shone", "shine", "shined", "shune"),
    new IrregularVerb("shoot", "shot", "shoot", "shout", "shouted"),
    new IrregularVerb("shrink", "shrank", "shrunk", "schrank", "shrenk"),
    new IrregularVerb("shut", "shut", "shot", "shoot", "shutt"),
    new IrregularVerb("sing", "sang", "sung", "song", "sing"),
    new IrregularVerb("sink", "sank", "sunk", "sinked", "sanked"),
    new IrregularVerb("sit", "sat", "sad", "sid", "sit"),
    new IrregularVerb("sleep", "slept", "sleept", "sleeped", "sleeted"),
    new IrregularVerb("slide", "slid", "slided", "slide", "slode"),
    new IrregularVerb("smell", "smelt", "smell", "smoll", "smeld"),
    new IrregularVerb("speak", "spoke", "spoken", "speakt", "speaked"),
    new IrregularVerb("spend", "spent", "spend", "spendt", "spenden"),
    new IrregularVerb("spit", "spat", "spot", "spitt", "spit"),
    new IrregularVerb("spread", "spread", "spreaded", "spred", "spreded"),
    new IrregularVerb("stand", "stood", "stand", "standed", "stooden"),
    new IrregularVerb("steal", "stole", "stolen", "stealt", "steald"),
    new IrregularVerb("stick", "stuck", "stock", "stack", "stick"),
    new IrregularVerb("stink", "stank", "stunk", "stink", "stonk"),
    new IrregularVerb("strike", "struck", "striked/struck", "stricked/struk", "strike"),
    new IrregularVerb("swear", "swore", "sweat", "sweart", "sword"),
    new IrregularVerb("sweep", "swept", "sweeped", "swep", "sweep"),
    new IrregularVerb("swim", "swam", "swum", "swim", "swom"),
    new IrregularVerb("swing", "swung", "swang", "swing", "swong"),
    new IrregularVerb("take", "took", "taked", "toked", "taken"),
    new IrregularVerb("teach", "taught", "tought", "teaght", "teacht"),
    new IrregularVerb("tear", "tore", "tear", "teart", "tored"),
    new IrregularVerb("tell", "told", "tellt", "telled", "tolt"),
    new IrregularVerb("think", "thought", "thaught", "thank", "thauked"),
    new IrregularVerb("throw", "threw", "thrown", "three", "throwed"),
    new IrregularVerb("understand", "understood", "understooden", "understanded", "understand"),
    new IrregularVerb("wake", "woke", "waken", "woken", "wake"),
    new IrregularVerb("wear", "wore", "worn", "wer", "war"),
    new IrregularVerb("weep", "wept", "weept", "weepet", "weeped"),
    new IrregularVerb("will", "would", "wood", "willt", "willed"),
    new IrregularVerb("win", "won", "wan", "woun", "winn"),
    new IrregularVerb("wind", "wound", "weind", "wount", "weint"),
    new IrregularVerb("write", "wrote", "written", "writted", "write")
]

function displayContent() {
    const question = document.querySelector(".question");
    let randomNumber = Math.floor(Math.random() * irregularVerbList.length);
    const randomWrongAnswer = (irregularVerbList[randomNumber].randomOrder());
    let usedWrongAnswers = 0;
    answerBoxNumber = Math.floor(Math.random() * 4);

    question.innerHTML = "(to) " + irregularVerbList[randomNumber].verb;
    answerBoxes[answerBoxNumber].innerHTML = irregularVerbList[randomNumber].rightAnswer;
    for (let i = 0; i < 4; i++) {
        if (i !== answerBoxNumber) {
            answerBoxes[i].innerHTML = randomWrongAnswer[usedWrongAnswers];
            usedWrongAnswers++;
        }
    }
}

displayContent();


function buttonInput(buttonNumber) {
    const audioFalse = new Audio("FalseSound.mov");
    const audioTrue = new Audio("TrueSound.mov");
    if (buttonNumber === answerBoxNumber) {
        answerButtons[buttonNumber].style = "border: 5px solid #18b432; padding: 5px 5px;";
        richtigInFolge++;
        richtigeAntworten++;
        audioTrue.play();
    } else {
        answerButtons[buttonNumber].style = "border: 5px solid #c96814; padding: 5px 5px;";
        answerButtons[answerBoxNumber].style = "border: 5px solid #18b432; padding: 5px 5px;";
        richtigInFolge = 0;
        audioFalse.play()
    }
    beantworteteFragen++;

    if (richtigInFolge > parseInt(localStorage.getItem("highScore"))) {
        localStorage.setItem("highScore", richtigInFolge);
    } 

    stats[0].innerHTML = Math.round(richtigeAntworten / beantworteteFragen * 100) + "%";
    stats[1].innerHTML = parseInt(localStorage.getItem("highScore"));
    stats[2].innerHTML = richtigInFolge;
    answerButtons.forEach(element => element.disabled = true);

    setTimeout(() => {
        answerButtons[answerBoxNumber].style = "border: none; padding: 10% 10%;";
        if (buttonNumber !== answerBoxNumber) {
            answerButtons[buttonNumber].style = "border: none; padding: 10% 10%;";
        }
        answerButtons.forEach(element => element.disabled = false);
        displayContent()
    }, 1500);
}

setTimeout(() => window.confirm("@ alle Binzer Schüler:\nJeder mit mehr als 20 Punkten ist cool."), 2000);