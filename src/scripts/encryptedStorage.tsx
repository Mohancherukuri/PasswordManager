import EncryptedStorage from 'react-native-encrypted-storage';
import { PasswordDataTypeWithId } from '../@types/PasswordDataType';

export const addToStorage = (data:PasswordDataTypeWithId[]) =>{
    async function storeUserSession() {
        try {
            await EncryptedStorage.setItem(
                "userName_password",
                JSON.stringify({data})
            );
            // Congrats! You've just stored your first value!
        } catch (error) {
            // There was an error on the native side
        }
    }
    storeUserSession();
}


export const getFromStorage = () : Promise<PasswordDataTypeWithId[] | undefined> => {
    async function retrieveUserSession() {
        let passwordList : PasswordDataTypeWithId[] = []
        try {   
            const userData = await EncryptedStorage.getItem("userName_password");
            if (userData !== undefined) {
                if(userData !== null){
                    passwordList = JSON.parse(userData).data as PasswordDataTypeWithId[];
                    return passwordList
                }
            }
            
        } catch (error) {
            // There was an error on the native side
        }
        
    }
    return retrieveUserSession();
}