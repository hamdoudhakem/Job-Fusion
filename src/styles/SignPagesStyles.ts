import { StyleSheet} from 'react-native'
import { COLORS, SIZES } from '../constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,    
  },
  header: {    
    fontFamily: 'bold',
    fontSize: SIZES.xxLarge,
    paddingVertical: 15,
    marginLeft: 10,   
  },  
  FieldsContainer:{    
    marginTop: 120,
    marginBottom: 20,
    alignItems: 'center',
  },
  SubmitButton:{
    marginTop: 20,
    paddingVertical: 20, 
    paddingHorizontal: 80,
    marginHorizontal: 30,
    backgroundColor: COLORS.tertiary,
  },
  SubmitText:{
    textAlign: 'center',
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.white
  },
  SignInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  SignInText:{
    fontFamily: 'regular',
    fontSize: SIZES.medium,
  },
  SignInButtonText:{
    color: COLORS.blue, 
    fontFamily: 'medium', 
    fontSize: SIZES.medium,
  },
  FieldError:{
    color: 'red', 
    fontFamily: 'regular', 
    fontSize: 12
  }
})