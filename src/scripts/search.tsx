
import { PasswordDataTypeWithId } from "../@types/PasswordDataType";
import { appListDataWithSelection } from "../config/appListData";

export function searchFunction(input : string) {
    const data = [...appListDataWithSelection]
    input = input.toLowerCase(); 
    return data.filter(item => {
        return item.title.toLowerCase().startsWith(input); 
    }); 
}

export function searchAppPassword(text: string,list:PasswordDataTypeWithId[]) : PasswordDataTypeWithId[]{
    const data =[...list]
    text = text.toLowerCase(); 
    return data.filter(item => item.appName.toLowerCase().startsWith(text)); 
}