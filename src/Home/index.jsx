
import api from '../services/api'
import { useEffect, useState } from 'react'
import { FaTrashCan } from "react-icons/fa6";

import './style.css'

function Home() {
  const [users, setUsers] = useState([])

   async function getUsers() {
      const usersFromApi = await api.get('/usuarios')
      setUsers(usersFromApi.data)
      console.log(users)
    }
    useEffect(() => {
      getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de usuário</h1>
          <input type='text' placeholder='Nome' />
          <input type='number' placeholder='Idade' />
          <input type='email' placeholder='Email' />
          <button type='button'>Cadastrar</button>          
        </form>  

        <h1>Usuários Cadastrados</h1>
        {users.map((user) => (
          <div className='card' key={user.id}>
              <div>
                <p>Nome: <span>{user.name}</span> </p>
                <p>Idade: <span>{user.age}</span> </p>
                <p>Email: <span>{user.email}</span> </p>
              </div> 
              <button>
                <FaTrashCan size={15}/>
              </button>
          </div>
        ))}
      </div>

    </>
  )
}

export default Home
