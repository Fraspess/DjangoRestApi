import {Layout, Menu, Button} from 'antd';

const {Header} = Layout;

const Navbar = () => {
    return (
        <>
            <Layout className="layout">
                <Header style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <a href="/"> <Menu.Item key="1">До хати</Menu.Item> </a>
                        <a href="/profile"><Menu.Item key="2">Профіль</Menu.Item></a>
                    </Menu>
                    <div>
                        <a href="/login">
                            <Button type="primary" style={{marginRight: '20px'}}>Вхід</Button>
                        </a>
                        <a href="/register">
                            <Button>
                                Реєстрація
                            </Button>
                        </a>
                    </div>
                </Header>
            </Layout>

            <style>{
                `.ant-menu-light .ant-menu-item-selected,
.ant-menu-dark .ant-menu-item-selected {
  background-color: transparent !important;
}

/* Removes blue border/line under active/selected items */
.ant-menu-item-selected::after,
.ant-menu-item:hover::after {
  border-bottom: none !important;
}

/* Optional: Removes blue text color */
.ant-menu-item-selected {
  color: inherit !important;
}`
            }</style>
        </>
    )
}

export default Navbar