import {Button, Form, Input} from "antd";
import type {ILoginUser} from "../../types/ILoginUser.ts";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useNavigate} from "react-router-dom";
import {GoogleLogin, useGoogleLogin} from "@react-oauth/google";

const LoginPage = () => {
    const [form] = Form.useForm<ILoginUser>();
    const navigate = useNavigate();

    const onFinish = (values: ILoginUser) => {
        console.log(values);

        axios.post(APP_ENV.SERVER_URL + "api/users/login/",
            values,
            {
                headers: {
                    'Content-Type':
                        'multipart/form-data',
                }
            }
        ).then(response => {
            console.log(response)
            if (response.status == 200) {
                const {data} = response;
                const refresh = data.refresh
                localStorage.setItem("refreshToken", refresh)

                navigate("/");
            }
        })

            .catch(error => console.log(error));
        // navigate("/");
    }

    const handleLoginGoogle = useGoogleLogin({
        onSuccess: tokenResponse =>{
            console.log(tokenResponse)
            const token = tokenResponse.access_token
            console.log(token)
            axios.post(APP_ENV.SERVER_URL + "api/users/google-auth/", token)
                .then(response => {
                    console.log(response)
                })
        }
    });


    return (
        <>
            <div className={"min-h-screen xl:flex"}>
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                        Вхід користувача
                    </h1>

                    <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/3 sm:px-6">

                        <div className="w-full overflow-x-auto">
                            <Form onFinish={onFinish} encType="multipart/form-data"
                                  form={form}
                                  layout={"vertical"}
                            >

                                <Form.Item<ILoginUser>
                                    label={"Ім'я користувача"}
                                    name={"username"}
                                    rules={[{required: true, message: "Вкажіть ім'я користувача"}, {
                                        min: 3,
                                        message: "Ім'я користувача повинно мати щонайменше 3 символи"
                                    }, {max: 20}]}
                                >
                                    <Input/>
                                </Form.Item>


                                <Form.Item<ILoginUser>
                                    label={"Пароль"}
                                    name={"password"}
                                    rules={[{
                                        required: true,
                                        message: "Вкажіть пароль"
                                    },
                                        {max: 20, message: "Пароль не може містити більше 20 символів"},
                                        {
                                            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                            message: "Пароль має містити 1 велику, 1 маленьку букву, 1 цифру і 1 спеціальний символ"
                                        }]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                                <a href="/forgot-password">Забули пароль?</a>`


                                <Form.Item label={null}>
                                    <Button className="min-w-full" type="primary" htmlType="submit">
                                        Вхід
                                    </Button>
                                </Form.Item>


                                <div className={"mt-2"}>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLoginGoogle();
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                                    >
                                        {'Вхід через Google'}
                                    </button>
                                </div>
                            </Form>


                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}

export default LoginPage