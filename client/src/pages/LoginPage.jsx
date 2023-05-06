import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { login } from '../auth'
import {useNavigate} from 'react-router-dom'


const LoginPage = () => {
    const {register, handleSubmit} = useForm()
    const navigate=useNavigate()
    const [error, setError] = useState(null)

    const loginUser=(data)=>{
       const requestOptions={
           method:"POST",
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify(data)
       }
       fetch('/login', requestOptions)
       .then(res => res.json())
       .then(data => {
            if (data) {
                setError(null)
                login(data.data.access_token)
                navigate("/");
            } else {
                setError('Некорректный логин или пароль')
            }
        }).catch(_ => {
            setError('Некорректный логин или пароль')
        })
    }

    return(
        <div className="roundbox container">
        <div className="form">
            <form>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text"
                        {...register('username',{})}
                    />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password"
                        {...register('password',{})}
                    />
                </Form.Group>
                {error && <span className="error subscription-row">{error}</span>}
                <br></br>
                <Form.Group>
                    <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>Войти</Button>
                </Form.Group>
                <br></br>
            </form>
        </div>
    </div>
    )
}

export default LoginPage