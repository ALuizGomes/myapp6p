import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacityProps } from 'react-native'

import { TextInputMask } from 'react-native-masked-text'

type InputProps = TextInputProps

// interface ButtonProps extends TouchableOpacityProps {
//   title: string;
// }
// export function Button({title, ...rest}: ButtonProps){}

export function InputMaskSalary({ ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInputMask type={'money'}{...rest} style={styles.inputStyle} 
        options={{precision: 2, separator: ',', delimiter: '.'}}/>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10
  },
  inputStyle: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 14,
    marginTop: 2
  }
})