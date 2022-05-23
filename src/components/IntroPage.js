

export default function IntroPage(props){
    return(
        <div className="container1">
            <h1>Quizzical</h1>
            <p className="text-muted">Some description if needed</p>
            <button className="btn btn-success btn-lg px-5 py-3 mt-5" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}