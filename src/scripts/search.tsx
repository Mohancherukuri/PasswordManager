
import { appListDataWithSelection } from "../config/appListData";

export function searchFunction(input : string) {
    const data = [...appListDataWithSelection]
    input = input.toLowerCase(); 
    return data.filter(item => {
        return item.title.toLowerCase().startsWith(input); 
    }); 
}