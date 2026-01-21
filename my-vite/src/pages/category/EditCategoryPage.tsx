import {Button, Form, Input, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import type {ICreateCategory} from "../../types/category/ICreateCategory.ts";
import {useGetCategoryQuery, usePatchCategoryMutation} from "../../services/categoryService.ts";
import {useNavigate, useParams} from "react-router-dom";
import type {ICategory} from "../../types/category/ICategory.ts";

const EditCategoryPage = () => {
    const [form] = Form.useForm<ICategory>();
    const {id} = useParams();

    const navigate = useNavigate();

    if (!id) {
        navigate("/categories")
    }
    const {data: category, isLoading} = useGetCategoryQuery(id!)
    const [patchCategory] = usePatchCategoryMutation();

    const onFinish = async (values: ICategory) => {
        try {
            if(values.image !=null && Array.isArray(values.image) && values.image.length>0)
                values.image = values.image[0].originFileObj!
            console.log(values)
            await patchCategory(values);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

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
        <>
            {isLoading ? (
                <div><h1>Загрузка категорії</h1></div>
            ) : (

                <div className={"min-h-screen xl:flex"}>
                    <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                            Редагування категорії
                        </h1>

                        <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/3 sm:px-6">

                            <div className="w-full overflow-x-auto">
                                <Form onFinish={onFinish} encType="multipart/form-data"
                                      form={form}
                                      layout={"vertical"}
                                >
                                    <Form.Item<ICategory>
                                        name={"id"}
                                        hidden
                                        initialValue={category?.id}

                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item<ICategory>
                                        label={"Назва категорії"}
                                        name={"name"}
                                        initialValue={category?.name}
                                        rules={[
                                            {min: 3, message: "Мінімум 3 символи"},
                                            {max: 20, message: "Максимум 20 символів"}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item<ICategory>
                                        label={"Опис категорії"}
                                        name={"description"}
                                        initialValue={category?.description}
                                        rules={[
                                            {min: 3, message: "Мінімум 3 символи"},
                                            {max: 20, message: "Максимум 20 символів"}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item<ICategory>
                                        label={"Слаг"}
                                        name={"slug"}
                                        initialValue={category?.slug}
                                        rules={[
                                            {min: 3, message: "Мінімум 3 символи"},
                                            {max: 20, message: "Максимум 20 символів"}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item label="Картинка категорії">
                                        <Form.Item<ICategory> name="image" valuePropName="fileList"
                                                                    getValueFromEvent={normFile}
                                                                    noStyle>
                                            <Upload.Dragger accept="image/*" listType={"picture"} name="files"
                                                            multiple={false}
                                                            beforeUpload={(file) => {
                                                                if (!file.type.startsWith("image")) {
                                                                    return
                                                                }
                                                                return false
                                                            }}>
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined/>
                                                </p>
                                                <p className="ant-upload-text">Нажміть або перетягніть картинку до цієї
                                                    області щоб загрузити картинку
                                                </p>
                                                <p className="ant-upload-hint">
                                                </p>
                                            </Upload.Dragger>
                                        </Form.Item>
                                    </Form.Item>


                                    <Form.Item label={null}>
                                        <Button className="min-w-full" type="primary" htmlType="submit">
                                            Створити
                                        </Button>
                                    </Form.Item>

                                </Form>


                            </div>
                        </div>


                    </div>
                </div>


            )
            }

            )
        </>

    )
}

export default EditCategoryPage