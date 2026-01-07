import type {UploadFile} from "antd";
import type {RcFile} from "antd/es/upload";

export interface IRegisterUser {
    email: string;
    phoneNumber:string;
    firstName:string;
    lastName:string;
    password: string;
    confirmPassword: string;
    image: RcFile | null | UploadFile | Array<UploadFile>;
}