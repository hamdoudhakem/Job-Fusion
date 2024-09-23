import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./Field.styles";

export const Field = ({
  text, 
  placeholder, 
  isPassword,
  value,
  setValue,
} : {
  text : string, 
  placeholder : string,
  isPassword?: boolean,
  value : string,
  setValue : (value: string) => void,
}) => (  
  <View style={styles.FieldContainer}>
    <Text style={styles.FieldText}>{text}</Text>
    <View style={styles.InputContainer}>
      <TextInput 
        placeholder={placeholder} 
        secureTextEntry={!!isPassword} 
        value={value}
        onChangeText={setValue}       
      />
    </View>
  </View>
);
