export interface  IUserProfile{
    username:string;
    email:string;
    first_name:string;
    last_name:string;
    phone:string;
    image_small:File | null;
    image_medium:File | null;
    image_large:File | null;
}