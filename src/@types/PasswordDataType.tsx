export interface PasswordDataType {
    appName : string;
    password : string;
    email : string;
    userName : string;
}

export interface PasswordDataTypeWithId extends PasswordDataType{
    id : string | number[]
}