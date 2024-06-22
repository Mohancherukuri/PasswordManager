import {ReactNode, createContext, useState} from 'react';
import {
  PasswordDataType,
  PasswordDataTypeWithId,
} from '../@types/PasswordDataType';
import uuid from 'react-native-uuid';
import {addToStorage, getFromStorage} from '../scripts/encryptedStorage';

type PasswordContextProp = {
  passwordList: PasswordDataTypeWithId[];
  addPasswordData: (data: PasswordDataType) => void;
  getPasswords: () => void;
  deletePasswordData: (id: string) => void;
  updatePasswordData : (id : string,updatedData : PasswordDataTypeWithId) => void;
};

const PasswordContext = createContext<PasswordContextProp>({
  passwordList: [],
  addPasswordData: (data: PasswordDataType) => {},
  getPasswords() {},
  deletePasswordData: (id: string) => {},
  updatePasswordData: (id: string,updatedData : PasswordDataTypeWithId) => {},
});

type PasswordProviderProp = {
  children: ReactNode;
};

const PasswordProvider = ({children}: PasswordProviderProp) => {
  const [passwordList, setPasswordList] = useState<PasswordDataTypeWithId[]>(
    [],
  ); // Initialize as an array of strings

  const addPasswordData = (data: PasswordDataType) => {
    const newAppData: PasswordDataTypeWithId = {id: uuid.v4(), ...data};
    const updatedData = [...passwordList, newAppData];
    setPasswordList([...passwordList, newAppData]);
    addToStorage(updatedData);
  };

  const getPasswords = async () => {
    const passwords = await getFromStorage();
    if (passwords !== undefined) {
      setPasswordList(passwords);
    }
  };

  const deletePasswordData = (id : string) => {
        const filterdData = passwordList.filter((item)=>item.id !== id);
        setPasswordList(filterdData);
        addToStorage(filterdData);
  }

  const updatePasswordData = (id : string,updatedData : PasswordDataTypeWithId) => {
    const filteredData = passwordList.filter((item)=>item.id !== id)
    const updatedList = [...filteredData,updatedData]
    setPasswordList(updatedList)
    addToStorage(updatedList)
  }

  return (
    <PasswordContext.Provider
      value={{updatePasswordData,deletePasswordData, passwordList, addPasswordData, getPasswords}}>
      {children}
    </PasswordContext.Provider>
  );
};

export {PasswordProvider, PasswordContext};
