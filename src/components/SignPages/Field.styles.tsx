import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants'

export const styles = StyleSheet.create({ 
  FieldContainer:{
    paddingHorizontal: 10,
  },
  FieldText:{
    fontFamily: 'medium',
    color: COLORS.primary,
    paddingBottom: 5,
  },
  InputContainer:{
    width: 250,
    paddingVertical: 10,
    paddingLeft: 15,
    marginBottom: 12,
    backgroundColor: 'rgba(253,237,217,0.5)',    
    borderRadius: 5,
  },
})