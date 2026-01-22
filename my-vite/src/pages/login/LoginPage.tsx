import {Button, Form, Input} from "antd";
import type {ILoginUser} from "../../types/account/ILoginUser.ts";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useNavigate} from "react-router-dom";
import {useGoogleLogin} from "@react-oauth/google";

const LoginPage = () => {
    const [form] = Form.useForm<ILoginUser>();
    const navigate = useNavigate();

    const onFinish = (values: ILoginUser) => {
        console.log(values);

        axios.post(APP_ENV.SERVER_URL + "api/users/login/",
            values
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
            const token = tokenResponse.access_token
            console.log(token)
            axios.post(APP_ENV.SERVER_URL + "api/users/google-auth/", {token : token},  {
                headers: { "Content-Type": "application/json" }
            })
                .then(response => {
                    console.log(response)
                    const {data} = response;
                    const refresh = data.refresh
                    localStorage.setItem("refreshToken", refresh)

                    navigate("/");
                })
                .catch(error => console.log(error));
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


                                <div className="mt-4">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLoginGoogle();
                                        }}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
                                    >
                                        {/* Іконка Google */}
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21.35 11.1h-9.18v2.92h5.26c-.23 1.23-1.09 3.6-5.26 3.6-3.16 0-5.75-2.6-5.75-5.8s2.59-5.8 5.75-5.8c1.8 0 3.0.78 3.72 1.46l2.54-2.48C18.03 3.05 15.94 2 12.17 2 6.64 2 2 6.64 2 12s4.64 10 10.17 10c5.86 0 9.72-4.12 9.72-9.88 0-.66-.07-1.15-.54-1.92z"
                                                fill="#4285F4"
                                            />
                                        </svg>
                                        Вхід через Google
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