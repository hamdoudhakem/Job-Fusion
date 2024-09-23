import React from 'react'
import {Text, TouchableOpacity, View } from 'react-native'
import styles from './screenheader.style'

const ScreenHeaderProfileBtn = ({
  initial,
  handlePress
}: {
  initial: string;
  handlePress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.ProfileBtnContainer} onPress={handlePress}>
      <Text style={styles.InitialsText}>{initial.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

export default ScreenHeaderProfileBtn