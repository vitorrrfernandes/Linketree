import { Link  } from "react-router-dom"
import { Input } from "../../components/input"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"

import {auth } from '../../services/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

import { toast } from 'react-toastify'

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
              
              navigate ('/admin', {replace : true });
              toast.success('Login realizado com sucesso!')

        })
        .catch((error)=>{
            console.log("ERRO AO FAZER O LOGIN : " + error);
            toast.error ('Usuário ou senha inválidos!')
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
             className="h-9 bg-blue-600 rounded border-0 text-lg text-white font-bold cursor-pointer">
                Acessar
                </button>
           </form>
        </div>
    )
}