import {useState, type FormEvent, useEffect} from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/input'

import {FiTrash} from 'react-icons/fi'

import { db } from '../../services/firebase'
import {
    addDoc, collection,onSnapshot,query,orderBy,doc,deleteDoc
} from 'firebase/firestore'

import { toast } from 'react-toastify'


interface LinkProps {
  id: string,
  url : string,
  bg: string,
  name: string,
  color: string,
}

export function Admin () {
    const [nameInput,setNameInput] =  useState('');
    const [url, setUrl] = useState ('');
    const [textColor,setTextColor] = useState ("#f1f1f1");
    const [backgroundColor, setBackgroundColor] = useState('#121212')

    const [links,setLinks] = useState<LinkProps[]>([]);

    useEffect(()=>{
       const linksRef = collection(db, "links");
       const queryRef = query(linksRef, orderBy("created","asc"))

       const unsub = onSnapshot(queryRef, (snapshot)=>{
        let lista = [] as LinkProps[];

        snapshot.forEach((doc)=>{
             lista.push({
                id: doc.id,
                name : doc.data().name,
                url: doc.data().url,
                bg : doc.data().bg,
                color: doc.data().color
        })
        })

        setLinks(lista);

         
       })

       return () => {
           unsub();
       }
    },[])

    async function handleRegister (e: FormEvent) {
        e.preventDefault();
         
        if (nameInput === '' || url === '') {
              toast.error('Preencha todos os campos')

              return;
        }
        await addDoc(collection(db, "links"), {name: nameInput, url: url, bg: backgroundColor, color: textColor, created: new Date()}) 
        setNameInput('');
        setUrl('');
        toast.success('Link cadastrado com sucesso!')
        
    }

    async function handleDeleteLink ( id : string) {
        const docRef = doc(db, 'links', id);
        await deleteDoc(docRef);
    }


        return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2"> 
        <Header/>
            <form onSubmit = {handleRegister} className='flex flex-col w-full mt-8 mb-3 max-w-xl'> 
                
                <label className='text-white font-medium mt-2 mb-2'> Nome do link </label>
                <Input placeholder='digite o nome do link...'
                value={nameInput}
                onChange={(e)=> setNameInput(e.target.value)}
                />

                <label className='text-white font-medium mt-2 mb-2'> Url do link </label>
                <Input placeholder='digite a url do link'
                type='url'
                value={url}
                onChange={(e)=> setUrl(e.target.value)}
                />

                <section className='flex flex-row'>
                    <div className='flex gap-2'>
                        <label className='text-white font-medium mt-2 mb-2'> Cor do link </label>
                        <input type='color'
                        value={textColor}
                        onChange={(e)=> setTextColor(e.target.value)}
                        />

                     
                    </div>

                    <div className='flex gap-2'>
                    <label className='text-white font-medium mt-2 mb-2'> Fundo do link</label>
                        <input type='color'
                        value={backgroundColor}
                        onChange={(e)=> setBackgroundColor(e.target.value)}
                        />
                    </div>
                    
                </section>
              
                 {nameInput !== '' && (
                        <div className='flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border-1 rounded-md'>
                <label className='text-white font-medium mt-2 mb-3'> Veja como está ficando: </label>
                <article className='w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3'
                style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColor}}> 
                    <p className='font-medium' style={{color: textColor}}>{nameInput}</p>
                </article>
              </div>
                 )}

              <button type='submit' className= 'cursor-pointer mb-7 bg-blue-600 h-9 text-white rounded-md font-medium gap-4 flex items-center justify-center'> 
                Cadastrar 
              </button>
            </form>

            <h2 className='font-bold text-white mb-4 text-2xl'>
                Meus links
            </h2>

            {links.map ((item)=> (
               <article key = {item.id}className='flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none'
            style={{backgroundColor: item.bg, color: item.color}}>
                <p>
                 {item.name}
                </p>
                <div>
                    <button
                      className='border border-dashed p-1 rounded cursor-pointer '
                      onClick={ () => handleDeleteLink( item.id )}
                    >
                         <FiTrash size = {18} color = "#fff"/>
                    </button>
                </div>
            </article>
            ))}
        </div>
    )

}

