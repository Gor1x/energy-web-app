import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
//import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SignUpPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show,setShow]=useState(false)
    const [serverResponse,setServerResponse]=useState('')

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
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setServerResponse(data.message)
                    setShow(true)
                })
                .catch(err => console.log(err))
            reset()
        }
        else {
            alert("Passwords do not match")
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
                        {errors.username && <small style={{ color: "red" }}>Username is required</small>}
                        {errors.username?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 25 </small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Your email"
                            {...register("email", { required: true, maxLength: 80 })}
                        />
                        {errors.email && <p style={{ color: "red" }}><small>Email is required</small></p>}
                        {errors.email?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your password"
                            {...register("password", { required: true, minLength: 8 })}

                        />
                        {errors.password && <p style={{ color: "red" }}><small>Password is required</small></p>}
                        {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control type="password" placeholder="Your password"
                            {...register("confirmPassword", { required: true, minLength: 8 })}
                        />
                        {errors.confirmPassword && <p style={{ color: "red" }}><small>Confirm Password is required</small></p>}
                        {errors.confirmPassword?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>Зарегистрироваться</Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>Уже зарегистрированы?</small>
                    </Form.Group>
                    <br></br>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;