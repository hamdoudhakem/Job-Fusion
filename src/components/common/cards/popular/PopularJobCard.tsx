import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { COLORS } from "../../../../constants";
import { checkImageURL } from "../../../../utils";

type PopularJobCardProps = {
  item: any;
  selectedJob?: string;
  handleCardPress?: (item: any) => void;
};

const PopularJobCard = ({
  item,
  selectedJob,
  handleCardPress,
}: PopularJobCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            selectedJob === item.job_id ? COLORS.primary : "#FFF",
          marginTop: 3,
          marginBottom: 7,
          marginRight: 3,
          marginLeft: 3,
        },
      ]}
      onPress={() => handleCardPress?.(item)}
    >
      <TouchableOpacity
        style={[
          styles.logoContainer,
          {
            backgroundColor:
              selectedJob === item.job_id ? "#FFF" : COLORS.white,
          },
        ]}
      >
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.jobName,
            {
              color:
                selectedJob === item.job_id ? COLORS.white : COLORS.primary,
            },
          ]}
          numberOfLines={1}
        >
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
