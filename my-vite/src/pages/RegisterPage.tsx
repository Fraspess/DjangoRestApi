import {Button, Form, Input, Upload} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import type {IRegisterUser} from "../types/IRegisterUser.ts";


const RegisterPage = () => {
    const [form] = Form.useForm<IRegisterUser>();

    const onFinish = (values: IRegisterUser) => {
        if(Array.isArray(values.image)){
            values.image = values.image[0].originFileObj!
            console.log(values.image)

        }
        console.log('Success:', values);

    }

    const normFile = (e : any) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e
        }

        const n = e.fileList.length
        if(n < 1) return e.fileList;
        return [e.fileList[n-1]]

    };

    return (
        <div className={"min-h-screen xl:flex"}>
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                    Реєстрація користувача
                </h1>

                <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">

                    <div className="max-w-full overflow-x-auto">
                        <Form onFinish={onFinish}
                              form={form}
                              layout={"vertical"}
                        >
                            <Form.Item<IRegisterUser>
                                label={"Електронна пошта"}
                                name={"email"}
                                rules={[{ required: true, message: 'Вкажіть пошту'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Прізвище"}
                                name={"lastName"}
                                rules={[{ required: true, message: 'Вкажіть прізвище'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Ім'я"}
                                name={"firstName"}
                                rules={[{ required: true, message: "Вкажіть ім'я"}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Телефон"}
                                name={"phoneNumber"}
                                rules={[{ required: true, message: "Вкажіть телефон"}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Пароль"}
                                name={"password"}
                                rules={[{ required: true, message: "Вкажіть пароль"}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item<IRegisterUser>
                                label={"Підтвердження паролю"}
                                name={"confirmPassword"}
                                rules={[
                                    { required: true, message: "Вкажіть підтвердження пароль"}
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item label="Dragger">
                                <Form.Item<IRegisterUser> name="image" valuePropName="fileList"
                                           getValueFromEvent={normFile}
                                           noStyle>
                                    <Upload.Dragger accept="image/*" listType={"picture"} name="files" multiple={false} beforeUpload={() => {return false}}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
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