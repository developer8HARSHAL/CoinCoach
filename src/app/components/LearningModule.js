"use client"
import Conclusion from "./LearningModulesComponents/Concluding"
import Example from "./LearningModulesComponents/Example"
import Theory from "./LearningModulesComponents/Theroy"
import Welcome from "./LearningModulesComponents/Welcome"

export default function LearningModule(props){
    return(
        <div>
            <Welcome/>
            <Theory/>
            <Example/>
            <Conclusion/>
        </div>
    )
}