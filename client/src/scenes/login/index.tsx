import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {login} from '../../auth'
import React from "react";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate()

    const handleFormSubmit = (values: { login: string; password: string; }) => {
        const body = {
            username: values.login,
            password: values.password
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        fetch('/auth/login', requestOptions)
            .then(
                res => {
                    if (res.status === 401) {
                        throw new Error("Некорректный логин или пароль");
                    } else {
                        return res.json()
                    }
                }
            )
            .then(data => {
                login(data.data)
                navigate("/");
            }).catch(e => {
            setErrorMessage(e.message);
        })
    }

    return (
        <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center">
            <Box width="50%"
                 mt={10}>
                <Header title="Вход"/>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Логин"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.login}
                                    name="login"
                                    error={!!touched.login && !!errors.login}
                                    helperText={touched.login && errors.login}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Пароль"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{gridColumn: "span 4"}}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Войти
                                </Button>
                            </Box>
                            {errorMessage && <div className="error">{errorMessage}</div>}
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    login: yup.string().required("required"),
    password: yup.string().required("required")
});
const initialValues = {
    login: "",
    password: ""
};

export default Login;
