import type {UploadFile} from "antd";
import type {RcFile} from "antd/es/upload";

export interface IRegisterUser {
    email: string;
    username:string;
    phone:string;
    first_name:string;
    last_name:string;
    password: string;
    confirmPassword: string;
    image: RcFile | null | UploadFile | Array<UploadFile>;
}

