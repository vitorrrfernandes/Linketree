
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { useEffect, useState, type FormEvent } from "react";

import { db } from '../../services/firebase'
import { setDoc, doc, getDoc} from 'firebase/firestore'

import { toast } from 'react-toastify'

export function Networks () {

    const [linkedin,setLinkedin] = useState('');
    const [github,setGithub] = useState('');
    

    useEffect (()=>{
        const docRef = doc(db, "social", "link");
        getDoc(docRef)

        .then ((snapshot)=>{
            if(snapshot.data !== undefined) {
                setLinkedin(snapshot.data()?.linkedin)
                setGithub(snapshot.data()?.github)
                
            }
        })
    }, [])

    function handleRegister (e:FormEvent) {
        e.preventDefault();
        
        setDoc(doc(db,"social", "link"),{
            linkedin : linkedin,
            github : github
        })
        .then (()=>{ 
             toast.success('Link salvo com sucesso!')
        })
 
        .catch((error)=>{
            console.log ('ERRO AO SALVAR' + error)
              toast.error('Erro ao salvar link')
        })
    } 
    return (
        <div className="flex flex-col items-center min-h-screen pb-7 px-2"> 
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4"> Minhas redes sociais </h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-3"> Link do Linkedin </label>
                <Input placeholder="Digite a url do Linkedin..."
                value={linkedin}
                onChange={(e)=> setLinkedin(e.target.value)}
                type="url"
                />

                <label className="text-white font-medium mt-2 mb-3"> Link do Github </label>
                <Input placeholder="Digite a url do  Github..."
                value={github}
                onChange={(e)=> setGithub(e.target.value)}
                type="url"
                />

              
                
                <button type="submit" className="text-white p-1 bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 mt-1 cursor-pointer"> Salvar links</button>
 

            </form>
        </div>
    )
}