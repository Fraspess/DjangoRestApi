import {Button, Form, Input, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import type {IRegisterUser} from "../../types/IRegisterUser.ts";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm<IRegisterUser>();
    const navigate = useNavigate();
    const onFinish = (values: IRegisterUser) => {
        if (Array.isArray(values.image)) {
            values.image = values.image[0].originFileObj

            // const data = new FormData();
            // data.append("first_name", values.firstName)
            // data.append("last_name", values.lastName)
            // data.append("email", values.email)
            // data.append("password", values.password)
            // data.append("phone", values.phoneNumber)
            // data.append("image", file)
            // data.append("username", values.username)
            // console.log('Success:', data);

            console.log(values)
            axios.post(APP_ENV.SERVER_URL + "api/users/register/",
                values,
                {
                    headers: {
                        'Content-Type':
                            'multipart/form-data',
                    }
                }
            ).then(response => console.log(response))
                .catch(error => console.log(error));
            navigate("/login");
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
                                rules={[{required: true, message: 'Вкажіть пошту'}, {
                                    type: 'email',
                                    message: "Це не почта!"
                                }, {max: 30}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Ім'я користувача"}
                                name={"username"}
                                rules={[{required: true, message: "Вкажіть ім'я користувача"}, {min:3, message:"Ім'я користувача повинно мати щонайменше 3 символи"}, {max: 20}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Прізвище"}
                                name={"last_name"}
                                rules={[{required: true, message: 'Вкажіть прізвище'}, {max:20}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Ім'я"}
                                name={"first_name"}
                                rules={[{required: true, message: "Вкажіть ім'я"}, {max:20}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Телефон"}
                                name={"phone"}
                                rules={[{
                                    required: true,
                                    message: "Вкажіть телефон"
                                }, {max: 15}, {
                                    pattern: /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/,
                                    message: "Вкажіть валідний номер телефона!"
                                }]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Пароль"}
                                name={"password"}
                                rules={[{
                                    required: true,
                                    message: "Вкажіть пароль"
                                },
                                    {max: 20, message:"Пароль не може містити більше 20 символів"},
                                    {
                                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: "Пароль має містити 1 велику, 1 маленьку букву, 1 цифру і 1 спеціальний символ"
                                }]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Підтвердження паролю"}
                                name={"confirmPassword"}
                                rules={[
                                    {required: true, message: "Вкажіть підтвердження пароль"},
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Паролі не збігаються!'));
                                        },
                                    }),
                                    {max:20, message:"Пароль не може містити більше ніж 20 символів"}
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item label="Аватарка">
                                <Form.Item<IRegisterUser> name="image" valuePropName="fileList"
                                                          getValueFromEvent={normFile}
                                                          noStyle>
                                    <Upload.Dragger accept="image/*" listType={"picture"} name="files" multiple={false}
                                                    beforeUpload={(file) => {
                                                        if (!file.type.startsWith("image")) {
                                                            return
                                                        }
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
                                <Button className="min-w-full" type="primary" htmlType="submit">
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