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


export const addName = (name : string) => {
    async function sotreUserName() {
        try{
            await EncryptedStorage.setItem(
                "passwordManager_UserName",JSON.stringify({name})
            )
        }
        catch(error){

        }
    }
    sotreUserName();
}

export const getName = () => {
    async function retrieveName() {
        try {
            const userData = await EncryptedStorage.getItem("passwordManager_UserName");
            if(userData !== undefined){
                if(userData !== null){
                    const userName =  JSON.parse(userData).name;
                    return userName;
                }
            }
        return ''

        } catch (error) {
            
        }
    }
    return retrieveName();
}