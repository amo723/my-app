import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";
import { Picker, PickerItemProps } from "@react-native-picker/picker";
import api from "@/constants/api";
import { Colors } from "@/constants/Colors";

interface PickerProps {
  data: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
}

const AppSelectComponent: React.FC<PickerProps> = ({
  data,
  selectedValue,
  onValueChange,
}) => {
  data = data || [];
  selectedValue = selectedValue || "";

  const [focused, setFocused] = useState(false);

  return (
    <Picker
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Sélectionner le type de loge"
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
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
    >
      <Picker.Item label="Sélectionner un élément" value={""} />
      {data &&
        data.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
    </Picker>
  );
};

export default AppSelectComponent;
