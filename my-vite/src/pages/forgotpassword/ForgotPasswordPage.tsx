import {Button, Form, Input} from "antd";

    interface IForgotPasswordUser{
        email:string
    }
const ForgotPasswordPage = () => {
    const [form] = Form.useForm<IForgotPasswordUser>()

    const onFinish = (values : IForgotPasswordUser) => {
        console.log(values)
    }

    return (
        <>
            <div className={"min-h-screen xl:flex"}>
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                        Відновлення пароля
                    </h1>

                    <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/3 sm:px-6">

                        <div className="w-full overflow-x-auto">
                            <Form onFinish={onFinish} encType="multipart/form-data"
                                  form={form}
                                  layout={"vertical"}
                            >

                                <Form.Item<IForgotPasswordUser>
                                    label={"Електронна пошта"}
                                    name={"email"}
                                    rules={[{required: true, message: 'Вкажіть пошту'}, {
                                        type: 'email',
                                        message: "Це не почта!"
                                    }, {max: 30}]}
                                >
                                    <Input />
                                </Form.Item>



                                <Form.Item label={null}>
                                    <Button className="min-w-full" type="primary" htmlType="submit">
                                        Відновити пароль
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


export default ForgotPasswordPage;