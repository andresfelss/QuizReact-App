import React from "react"
import Background from "./Background";


export default function QuizPage(){
    const [questionsArray, setQuestionsArray] = React.useState([]);
    React.useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestionsArray(data.results))
    }, []);

    const respuestas = (corrects,incorrects) =>{
        const respuestas = incorrects.concat(corrects)
        const casillas = respuestas.map(element =>{
            return(
                <div className=" mx-1 rounded-pill border border-4 px-3 my-1 d-flex align-items-center justify-content-center">
                    <p className="m-0 py-2 fs-6">{element}</p>
                </div>
            )
        });
        return casillas
    }
    const questionElements = questionsArray.map(element => 
        <div className="mx-5 my-4">
            <h6>{element.question}</h6>
            <div className="d-flex mx-2  justify-content-start flex-wrap">
                {respuestas(element.correct_answer,element.incorrect_answers)}
            </div>
            <hr/>

        </div>
        )
    return(
        <section className="container ">
            <div className="row">
                <div className="col">
                    {questionElements}
                </div>
            </div>
            <div className="container d-flex justify-content-center mb-5">
                <button className="btn btn-lg btn-success">Check Answers</button>
            </div>
        </section>
    )
}