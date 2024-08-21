import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";
import { CheckBox, CheckBoxProps } from "react-native-elements";

const AppCheckBox: React.FC<CheckBoxProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState(false);

  return (
    <CheckBox
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[
        {
          padding: Spacing * 2,
          backgroundColor: Colors.lightPrimary,
          borderRadius: Spacing,
          marginVertical: Spacing,
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

export default AppCheckBox;
