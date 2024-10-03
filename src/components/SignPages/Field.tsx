import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./Field.styles";
import { icons } from "../../constants";

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
}) => {
  const [show, setShow] = useState(!!isPassword)

  return (  
    <View style={styles.FieldContainer}>
      <Text style={styles.FieldText}>{text}</Text>
      <View style={styles.InputContainer}>
        <TextInput 
          style={{flex: 1}}
          placeholder={placeholder} 
          secureTextEntry={show}
          value={value}
          onChangeText={setValue}
        />

        {!!isPassword && (
          <TouchableOpacity style={styles.showButton} onPress={() => setShow((show) => !show)}>
            <Image 
              source={show ? icons.eye : icons.eyeHide} 
              style={{width: 22, height: 22}}
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
};
