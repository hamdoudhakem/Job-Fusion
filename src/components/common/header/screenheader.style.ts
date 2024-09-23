import { ImageStyle, StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },  
  ProfileBtnContainer:{
    width: 40,
    height: 40,
    backgroundColor: COLORS.beige,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  InitialsText:{
    fontFamily: 'bold',
    fontSize: 20,
  }
});

export default styles;
