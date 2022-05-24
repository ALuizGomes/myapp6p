import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, FlatList, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Header } from "../../components/Header";
import { ListCard } from '../../components/ListCard';

interface ListEmployeesProps {
  id: string,
  cpf: string,
  name: string,
  bankBranch: string,
  account: string,
  salary: string,
}

interface ListEmployeesCNABProps {
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

const payingBank = [
  { bankCode: '001', agency: '4530', account: '102030-1', bankName: 'BB' },
  { bankCode: '237', agency: '1230', account: '403020-2', bankName: 'Bradesco' },
  { bankCode: '241', agency: '0140', account: '123040-1', bankName: 'Itaú' },
  { bankCode: '033', agency: '1450', account: '011220-1', bankName: 'Santander' },
]

export function ListEmployees() {
  const [status, setStatus] = useState('')
  const [employeesCnab, setEmployeesCnab] = useState<ListEmployeesCNABProps[]>([])
  let emploeeysAll: ListEmployeesCNABProps[] = []
  let emploeeys: ListEmployeesProps[] = []

  function handleDeleteEmployee(id: string) {
    Alert.alert("Exclusão", 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          setStatus('E')
          setEmployeesCnab(employees =>
            employees.filter(employee => employee.id !== id))
        },
      }
    ])
  }

  async function loadDataEmployee() {
    const data = await AsyncStorage.getItem('@si:employees')
    if (data) {
      emploeeys = JSON.parse(data)
      emploeeysAll = emploeeys.map(employee => {
        const [codBank,] = employee.bankBranch.split('/')
        const dataPayingBank = payingBank.find(pk => pk.bankCode === codBank)
        const data = {
          id: employee.id,
          bank: dataPayingBank?.bankCode,
          agency: dataPayingBank?.agency,
          payingBankAccount: dataPayingBank?.account,
          bankName: dataPayingBank?.bankName,
          bankBranch: employee.bankBranch,
          account: employee.account,
          salary: employee.salary,
          name: employee.name,
        }
        return data
      })
      setEmployeesCnab(emploeeysAll)
    }
  }

  useEffect(() => {
    loadDataEmployee()
  }, [])

  useFocusEffect(useCallback(() => {
    loadDataEmployee()
  }, []))

  useEffect(() => {
    async function saveemployees() {
      await AsyncStorage.setItem('@si:employees', JSON.stringify(employeesCnab))
    }
    saveemployees()
  }, [employeesCnab])

  return (
    <View style={styles.container}>
      <Header title='Listam de Funcionários' />
      <FlatList
        data={employeesCnab}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
            onPress={() => handleDeleteEmployee(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})

