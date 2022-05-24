import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

interface ListEmployeesCnabProps {
  id: string;
  bank?: string;
  agency?: string;
  payingBankAccount?: string;
  bankName?: string;
  bankBranch: string;
  account: string;
  salary: string;
  name: string;
}

interface ListCardProps extends TouchableOpacityProps {
  item: ListEmployeesCnabProps;
}

export function ListCard({ item, ...rest }: ListCardProps) {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.buttonCard} key={item.id} {...rest}>
        
        <Text style={styles.titleCard}>Total de Bancos Pagadores</Text>
        <Text style={styles.textCard}>Bradesco: {}</Text>

        <Text style={styles.titleCard}>Dados do Recebimento</Text>
        <Text style={styles.textCard}>Bco/Agencia: {item.bankBranch}</Text>
        <Text style={styles.textCard}>Conta: {item.account}</Text>
        <Text style={styles.textCard}>Salario: {item.salary}</Text>
        <Text style={styles.textCard}>Nome: {item.name}</Text>

        <View style={styles.borderSeparator} />

        <Text style={styles.titleCard}>Dados do Banco Pagador</Text>
        <Text style={styles.textCard}>Nome do Banco: {item.bankName}</Text>
        <Text style={styles.textCard}>Codigo do Banco: {item.bank}</Text>
        <Text style={styles.textCard}>Codigo da Agencia: {item.agency}</Text>
        <Text style={styles.textCard}>Conta do Bco. Pagador: {item.payingBankAccount}</Text>
        
      </TouchableOpacity>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  buttonCard: {
    width: '100%',
    padding: 6,
    backgroundColor: '#969CB2',
    borderRadius: 10
  },
  textCard: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  titleCard: {
    color: '#ff872c',
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  borderSeparator: {
    borderBottomWidth: 1,
    margin: 20,
  }
})




