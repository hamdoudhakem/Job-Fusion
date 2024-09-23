import React from "react";
import { TouchableOpacity, Image, DimensionValue } from "react-native";
import { SIZES } from "../../../constants";
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  handlePress,
  disableBorderRadius,
}: {
  iconUrl: any;
  dimension: string;
  disableBorderRadius?: boolean;
  handlePress?: () => void;
}) => {

  
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        style={{
          borderRadius: disableBorderRadius ? 0 : SIZES.small / 1.25,
          width: dimension as DimensionValue,
          height: dimension as DimensionValue,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
