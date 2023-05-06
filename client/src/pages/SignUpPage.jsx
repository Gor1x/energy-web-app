import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const SignUpPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show,setShow]=useState(false)
    const [serverResponse,setServerResponse]=useState('')
    const [error, setError]=useState(null)

    const submitForm = (data) => {
        if (data.password === data.confirmPassword) {
            const body = {
                username: data.username,
                email: data.email,
                password: data.password
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            console.log(JSON.stringify(body))
            fetch('/signup', requestOptions)
                .then(res => {
                    if (res.status == 201) {
                        setError(null)
                        setServerResponse('Вы успешно зарегистрировались!')
                        setShow(true)
                    } else {
                        res.json().then(data => {
                            console.log(data)
                            setError(data.message)
                        })
                    }
                })
            reset()
        }
        else {
             setError('Пароли не совпадают')
        }
    }

    return (
        <div className="roundbox container" style={{"width": "30em", "margin": "2em auto"}}>
            <div className="form">
                {show &&
                    <Alert variant="success" 
                    onClose={() => { setShow(false) }} 
                    dismissible>
                        <div>{serverResponse}</div>
                    </Alert>             
                }
                <form>
                    <Form.Group>
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="text"
                            placeholder="Your username"
                            {...register("username", { required: true, maxLength: 25 })}
                        />
                        {errors.username?.type === "required" && <span className="error subscription-row">Обязательно</span>}
                        {errors.username?.type === "maxLength" && <span className="error subscription-row">Максимальная длина 25 символов</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Your email"
                            {...register("email", { required: true, maxLength: 80 })}
                        />
                        {errors.email?.type === "required" && <span className="error subscription-row">Обязательно</span>}
                        {errors.email?.type === "maxLength" && <span className="error subscription-row">Максимальная длина 80 символов</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your password"
                            {...register("password", { required: true, minLength: 8 })}

                        />
                        {errors.password?.type === "required" && <span className="error subscription-row">Обязательно</span>}
                        {errors.password?.type === "minLength" && <span className="error subscription-row">Минимальная длина - 8 символов</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control type="password" placeholder="Your password"
                            {...register("confirmPassword", { required: true })}
                        />
                        {errors.confirmPassword?.type === "required" && <span className="error subscription-row">Обязательно</span>}    
                    </Form.Group> 
                    {error && <span className="error subscription-row">{error}</span>}
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>Зарегистрироваться</Button>
                    </Form.Group>
                    <br></br>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;