import Toast from 'react-native-toast-message';


type type = "success" | "error"
export type ShowToastProps = {
    type: type;
    text1 : string;
    text2:string;
    visibilityTime ?: number
}
export const showToast = ({type,text1,text2,visibilityTime = 4000} : ShowToastProps) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: visibilityTime,
      text1Style : {fontSize : 24},
      text2Style : {fontSize : 16}
    });
  };