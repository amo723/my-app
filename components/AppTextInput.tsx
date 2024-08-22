import { View, Text, TextInput, TextInputProps } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Entrer votre nom utilisateur"
      placeholderTextColor={Colors.darkText}
      style={[
        {
          fontFamily: Font["poppins-regular"],
          fontSize: FontSize.small,
          padding: Spacing * 2,
          backgroundColor: Colors.lightPrimary,
          borderRadius: Spacing,
          marginVertical: Spacing,
          textAlignVertical: "top",
        },
        focused && {
          borderWidth: 2,
          borderColor: Colors.primary,
          shadowOffset: { width: 4, height: Spacing },
          shadowColor: Colors.primary,
          shadowOpacity: 0.2,
          shadowRadius: Spacing,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;
