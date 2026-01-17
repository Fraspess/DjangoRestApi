import {Button, Form, Input} from "antd";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useNavigate, useSearchParams} from "react-router-dom";
import type {IRegisterUser} from "../../types/IRegisterUser.ts";


interface IResetPasswordUser {
    new_password: string
}

const ResetPasswordPage = () => {
    const [form] = Form.useForm<IResetPasswordUser>()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const onFinish = async(values: IResetPasswordUser) => {
        const token = searchParams.get("token");
        const uid = searchParams.get("uid");
        const new_password = values.new_password
        console.log(token)
        console.log(uid)
        console.log(new_password)
        await axios.post(APP_ENV.SERVER_URL + "api/users/reset-password/", {new_password, uid, token})
        navigate("/login")
    }
    return (
        <>
            <div className={"min-h-screen xl:flex"}>
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                        Змінення пароля
                    </h1>

                    <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/3 sm:px-6">

                        <div className="w-full overflow-x-auto">
                            <Form onFinish={onFinish} encType="multipart/form-data"
                                  form={form}
                                  layout={"vertical"}
                            >

                                <Form.Item<IResetPasswordUser>
                                    label={"Пароль"}
                                    name={"new_password"}
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
                                    <Input/>
                                </Form.Item>


                                <Form.Item label={null}>
                                    <Button className="min-w-full" type="primary" htmlType="submit">
                                        Змінити пароль
                                    </Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}

export default ResetPasswordPage