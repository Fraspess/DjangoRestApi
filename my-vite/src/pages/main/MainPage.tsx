import {Button, Card, Popconfirm} from "antd";
import {useDeleteCategoryMutation, useGetCategoriesQuery} from "../../services/categoryService.ts";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const {Meta} = Card;
const MainPage = () => {
    const {data, error, isLoading} = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    console.log(data)

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id.toString()).unwrap()
                .then((result) => {
                    console.log(result);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div style={{textAlign: "center"}}>
                <h1 style={{fontSize: 32}}>Список категорій</h1>
            </div>
            {error ? (
                {error}
            ) : (<div></div>)}
            {isLoading ? (
                <div style={{textAlign: "center"}}><h1>Категорії загружаються</h1></div>
            ) : (
                    <div className="flex gap-3 mt-4 flex-wrap ant-flex-align-center">
                        {data?.map((category) => (
                            <Card
                                hoverable
                                style={{width: 300}}
                                cover={
                                    <img
                                        draggable={false}
                                        alt="example"
                                        src={category.image}
                                    />
                                }
                            >

                                <Meta title={category.name} description={category.description}/>
                                <div style={{display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12}}>
                                    <Link to={`/category/update/${category.id}`}>
                                        <Button type="primary" icon={<EditOutlined/>}>
                                            Редагувати
                                        </Button>
                                    </Link>

                                    <Popconfirm
                                        title="Ви впевненні що ви хочете видалити цю категорію?"
                                        onConfirm={() => handleDelete(category.id)}
                                        okText="Так, видалити"
                                        cancelText="Ні"
                                        okType="danger"
                                    >
                                        <Button danger icon={<DeleteOutlined/>}>
                                            Видалити
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </Card>
                        ))}

                    </div>
            )}


        </>
    )


}


export default MainPage