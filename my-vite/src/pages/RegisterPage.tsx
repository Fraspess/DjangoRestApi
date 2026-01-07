import {Button, Form, Input, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import type {IRegisterUser} from "../types/IRegisterUser.ts";
import axios from "axios";
import {APP_ENV} from "../env";

const RegisterPage = () => {
    const [form] = Form.useForm<IRegisterUser>();

    const onFinish = (values: IRegisterUser) => {
        if (Array.isArray(values.image)) {
            const file: File = values.image[0].originFileObj!
            console.log(values.image)

            const data = new FormData();
            data.append("first_name", values.firstName)
            data.append("last_name", values.lastName)
            data.append("email", values.email)
            data.append("password", values.password)
            data.append("phone", values.phoneNumber)
            data.append("image", file)
            data.append("username", values.username)
            console.log('Success:', data);

            console.log(APP_ENV.SERVER_URL)
            axios.post(APP_ENV.SERVER_URL + "api/register/",
                data,
                {
                    headers: {
                        'Content-Type':
                            'multipart/form-data',
                    }
                }
            ).then(response => console.log(response))
                .catch(error => console.log(error));
        }

    }


    const normFile = (e: any) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e
        }

        const n = e.fileList.length
        if (n < 1) return e.fileList;
        return [e.fileList[n - 1]]

    };

    return (
        <div className={"min-h-screen xl:flex"}>
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                    Реєстрація користувача
                </h1>

                <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/3 sm:px-6">

                    <div className="max-w-full overflow-x-auto">
                        <Form onFinish={onFinish} encType="multipart/form-data"
                              form={form}
                              layout={"vertical"}
                        >
                            <Form.Item<IRegisterUser>
                                label={"Електронна пошта"}
                                name={"email"}
                                rules={[{required: true, message: 'Вкажіть пошту'}]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Ім'я користувача"}
                                name={"username"}
                                rules={[{required: true, message: "Вкажіть ім'я користувача"}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Прізвище"}
                                name={"lastName"}
                                rules={[{required: true, message: 'Вкажіть прізвище'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Ім'я"}
                                name={"firstName"}
                                rules={[{required: true, message: "Вкажіть ім'я"}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Телефон"}
                                name={"phoneNumber"}
                                rules={[{required: true, message: "Вкажіть телефон"}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Пароль"}
                                name={"password"}
                                rules={[{required: true, message: "Вкажіть пароль"}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Підтвердження паролю"}
                                name={"confirmPassword"}
                                rules={[
                                    {required: true, message: "Вкажіть підтвердження пароль"}
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item label="Аватарка">
                                <Form.Item<IRegisterUser> name="image" valuePropName="fileList"
                                                          getValueFromEvent={normFile}
                                                          noStyle>
                                    <Upload.Dragger accept="image/*" listType={"picture"} name="files" multiple={false}
                                                    beforeUpload={() => {
                                                        return false
                                                    }}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined/>
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Реєстрація
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default RegisterPage;