
import api from '../services/api'
import { useEffect, useState, useRef } from 'react'
import { FaTrashCan } from "react-icons/fa6";

import './style.css'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef() 

  async function getUsers() {
      const usersFromApi = await api.get('/usuarios')
      setUsers(usersFromApi.data)
    }

    async function createUser() {
      await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
      }) 
      getUsers()
    }

    async function deleteUser(id) {
      await api.delete(`/usuarios/${id}`)
        getUsers()
      }
      
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de usuário</h1>
          <input type='text' placeholder='Nome' ref={inputName} />
          <input type='number' placeholder='Idade' ref={inputAge}/>
          <input type='email' placeholder='Email' ref={inputEmail}/>
          <button type='button' onClick={createUser}>Cadastrar</button>          
        </form>  

        <h1>Usuários Cadastrados</h1>
        {users.map((user) => (
          <div className='card' key={user.id}>
              <div>
                <p>Nome: <span>{user.name}</span> </p>
                <p>Idade: <span>{user.age}</span> </p>
                <p>Email: <span>{user.email}</span> </p>
              </div> 
              <button onClick={() => deleteUser(user.id)}>
                <FaTrashCan size={15}/>
              </button>
          </div>
        ))}
      </div>

    </>
  )
}

export default Home
