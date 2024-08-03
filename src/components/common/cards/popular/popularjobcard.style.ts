import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

interface JobItem {
  job_id: string;
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: SIZES.xLarge,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  } as ImageStyle,
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  } as TextStyle,
  infoContainer: {
    marginTop: SIZES.large,
  } as ViewStyle,
  jobName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  } as ViewStyle,
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  } as TextStyle,
});

export default styles;
