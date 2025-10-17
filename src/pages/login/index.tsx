import { Link  } from "react-router"
import { Input } from "../../components/input"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"

import {auth, db } from '../../services/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

export function Login () {

    const [email,setEmail] = useState ("");
    const [password,setPassword] = useState ("");
    const navigate = useNavigate();

    function HandleSubmit(e: FormEvent) {

        e.preventDefault()

        if(email === '' || password ===  '') {
            alert('preencha todos os campos!');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
              console.log ('LOGADO COM SUCESSO!')
              navigate ('/admin', {replace : true });
        })
        .catch((error)=>{
            console.log("ERRO AO FAZER O LOGIN : " + error);
        })
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col"> 
           <Link to="/"> 
           <h1 className="text-6xl font-bold mb-6">Dev<span className= "bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
           </Link>

           <form className="w-full max-w-80 flex flex-col px-2" onSubmit={HandleSubmit}>
            <Input
            placeholder="Digite seu email..."
            type="email"
            value = {email}
            onChange={ (e) => setEmail(e.target.value)}
            />

            <Input
            placeholder="**********"
            type="password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
            />


            <button
            type="submit"
             className="h-9 bg-blue-600 rounded border-0 text-lg text-white font-bold">
                Acessar
                </button>
           </form>
        </div>
    )
}