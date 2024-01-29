import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import React from "react";

const Signup = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate()

    const handleFormSubmit = (values: { password: string; confirmation: any; login: string; email: string; }) => {
        if (values.password === values.confirmation) {
            const body = {
                username: values.login,
                email: values.email,
                password: values.password
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            fetch('/auth/signup', requestOptions)
                .then(res => {
                    if (res.status === 201) {
                        return res.json()
                    } else {
                        let error = res.status.toString()
                        throw new Error(error);
                    }
                })
                .then(data => {
                    navigate("/login")
                    alert("Регистрация прошла успешно")
                })
                .catch(error => {
                    if (error.message === 409) {
                        alert("Пользователь с таким логином уже зарегистрирован")
                    } else {
                        alert("Не удалось зарегистрировася")
                    }
                })
        } else {
            alert("Пароли не совпадают")
        }
    }

    return (
        <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center">
            <Box width="50%"
                 mt={10}>
                <Header title="Новый пользователь"/>
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
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
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
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Подтвердите пароль"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.confirmation}
                                    name="confirmation"
                                    error={!!touched.confirmation && !!errors.confirmation}
                                    helperText={touched.confirmation && errors.confirmation}
                                    sx={{gridColumn: "span 4"}}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Зарегистрироваться
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    login: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    confirmation: yup.string().required("required"),
});
const initialValues = {
    login: "",
    email: "",
    password: "",
    confirmation: "",
};

export default Signup;
