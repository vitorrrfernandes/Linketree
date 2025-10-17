import { Social } from '../../components/social'
import { FaLinkedin, FaGithub, FaInstagram} from 'react-icons/fa'
import { Link  } from 'react-router'


export function Home () {
    return (
        <div className="flex flex-col w-full py-4 items-center justify-center"> 
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20"> Vitor </h1>
            <span className="text-gray-50 mb-5 mt-3"> Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center"> 
                <section className="bg-whit e mb-4 w-full py-2 rounded-lg select-none cursor-pointer transition-transform hover:scale-105">
                    
                    <a href='https://www.linkedin.com/in/vitor-fernandes-31a42336b' target='_blank'>
                        <p className="text-base md:text-lg">
                            Perfil Linkedin
                        </p>
                    </a>
                   
                </section>

                <footer className="flex justify-center gap-3 my-4">
                     
                     <Social url = "https://www.linkedin.com/in/vitor-fernandes-31a42336b">
                     <FaLinkedin size={35} color='#FFF '/>
                      </Social>
                     <Social url = "https://github.com/vitorrrfernandes">
                     <FaGithub size={35} color='#FFF '/>
                      </Social>

                     
                </footer>

            </main>
        </div>
    )
}   