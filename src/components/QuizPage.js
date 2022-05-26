import React from "react"
import {nanoid} from "nanoid"



export default function QuizPage(){

    const [questionsArray, setQuestionsArray] = React.useState([]);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [playAgain, setPlayAgain] = React.useState(false);
    const [count, setCount] = React.useState(0);
    
    React.useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestionsArray(data.results.map(objeto =>({
                questionId: nanoid(),
                question: (objeto.question),
                answers: objeto.incorrect_answers.concat(objeto.correct_answer).map(resp => ({texto: resp, isHeld:false,answerId:nanoid(),claseId:'nada'}))
            }))))
            
        
    }, [playAgain]);

   
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
                key={ element.answerId}
                style={{backgroundColor: element.isHeld? '#D6DBF5': 'transparent'}}
                onClick={()=>handleClick(questionId,element.answerId)} 
                className= "mx-1 rounded-pill border border-4 px-3 my-1 d-flex align-items-center justify-content-center"
                id={element.claseId}
                >
                    <p className="m-0 py-2 fs-6"  dangerouslySetInnerHTML={{__html: element.texto }}></p>
                </div>
            )
        });
        return casillas
    }

    const questionElements = questionsArray.map(element =>

        <div className="mx-5 my-4" key={element.questionId}>
            <h6 dangerouslySetInnerHTML={{__html: element.question }}></h6>
            <div className="d-flex mx-2  justify-content-start flex-wrap">
                {respuestas(element.questionId,element.answers)}
            </div>
            <hr/>

        </div>
        )
       
          
    function checkAnsweres(){
        setIsCorrect(prev => !prev);
        if(questionsArray.length > 0){
            const resCor = questionsArray.map(preg => ({ questionId: preg.questionId, resCorrecta: preg.answers[preg.answers.length - 1].answerId}) )
            setQuestionsArray(prev => prev.map(pregunta => ({...pregunta, answers: pregunta.answers.map(res => ({...res, 
                claseId: res.isHeld? ((resCor.find(obj=>obj.questionId === pregunta.questionId).resCorrecta === res.answerId) ? 'Correcta' : 'Incorrecta'):res.claseId }))})))

                
        }
    }
    React.useEffect(()=>{
        let count2 = 0;
        for (let pregunta of questionsArray){
            for(let resp of pregunta.answers){
                console.log(resp.claseId)
                if (resp.claseId === 'Correcta'){
                    count2 += 1
                }
            }
        }
        console.log(count2)
        setCount(count2)
    },[isCorrect])
    function playAgainFunc(){
        
        setPlayAgain(prev => !prev);
    }
    
    // ------------- RETURN DE QUIZ PAGE --------------------------------
    return(
        <section className="container ">
            <div className="row">
                <div className="col">
                    {questionElements}
                </div>
            </div>
            <div className="container d-flex justify-content-center mb-5">
                {!(playAgain^isCorrect) ? <button className="btn btn-lg btn-success" onClick={checkAnsweres}>Check Answeres</button>: <><p className="mx-4 fw-bold fs-4 text-primary">You scored {count}/5</p> <button className="btn btn-lg btn-success shadow-sm" onClick={playAgainFunc}>Play Again</button></>}
            </div>
        </section>
    )
}