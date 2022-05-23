import React from "react"
import Background from "./Background";
import {nanoid} from "nanoid"



export default function QuizPage(){

    const [questionsArray, setQuestionsArray] = React.useState([]);

    React.useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestionsArray(data.results.map(objeto =>({
                questionId: nanoid(),
                question: objeto.question,
                answers: objeto.incorrect_answers.concat(objeto.correct_answer).map(resp => ({texto: resp, isHeld:false,answerId:nanoid()}))
            }))))
        
    }, []);

    function handleClick(questionId,answerId){
        // Primero verificamos que no haya otra respuesta seleccionada en esa pregunta
        const pregunta = questionsArray.find(pregunta => pregunta.questionId === questionId); // preunta a la cual le dio click una respuesta
        const respuesta = pregunta.answers.find(res => res.answerId === answerId); // Respuesta a la que se dio click

        if(pregunta.answers.every((el)=>el.isHeld===false) || respuesta.isHeld ){
            setQuestionsArray(prev => prev.map(
                elemento => ({...elemento, answers:elemento.answers.map(
                    respuesta => respuesta.answerId === answerId ? {...respuesta, isHeld:!respuesta.isHeld}: respuesta )})))
        }else{
            console.log('Ya hay una seleccionada')
        }
    }

    const respuestas = (questionId,respuestas) =>{
        const casillas = respuestas.map(element =>{
            return(
                <div
                key={element.answerId}
                style={{backgroundColor: element.isHeld? '#D6DBF5': 'transparent'}}
                onClick={()=>handleClick(questionId,element.answerId)} 
                className=" mx-1 rounded-pill border border-4 px-3 my-1 d-flex align-items-center justify-content-center">
                    <p className="m-0 py-2 fs-6">{element.texto}</p>
                </div>
            )
        });
        return casillas
    }

    const questionElements = questionsArray.map(element => 
        <div className="mx-5 my-4" key={element.questionId}>
            <h6>{element.question}</h6>
            <div className="d-flex mx-2  justify-content-start flex-wrap">
                {respuestas(element.questionId,element.answers)}
            </div>
            <hr/>

        </div>
        )

    // ------------- RETURN DE QUIZ PAGE --------------------------------
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