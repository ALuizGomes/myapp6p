import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'

export function Dashboard() {
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [bankBranch, setBankBranch] = useState('')
  const [account, setAccount] = useState('')
  const [salary, setSalary] = useState('')

  async function handleAddUser() {
    const employee = {
      id: new Date().getTime(),
      cpf,
      name,
      bankBranch,
      account,
      salary
    }
    try {
      const data = await AsyncStorage.getItem('@si:employees')
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        employee
      ]
      await AsyncStorage.setItem('@si:employees',
        JSON.stringify(dataFormatted))
    } catch (err) {
      console.log(err)
      Alert.alert('Error ao salvar o funcionário')
    }
    setCpf('')
    setName('')
    setBankBranch('')
    setAccount('')
    setSalary('')
  }

  async function loadDataEmployee() {
    const data = await AsyncStorage.getItem('@si:employees')
    const currentData = data ? JSON.parse(data) : []
  }

  useEffect(() => {
    loadDataEmployee()
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Cadastro Funcionários' />

      <ScrollView>

        <Input placeholder='CPF' value={cpf} onChangeText={value => setCpf(value)} />

        <Input placeholder='Nome' value={name} onChangeText={value => setName(value)} />

        <Input placeholder='banco/agência' value={bankBranch} onChangeText={value => setBankBranch(value)} />

        <Input placeholder='conta' value={account} onChangeText={value => setAccount(value)} />

        <Input placeholder='salário' value={salary} onChangeText={value => setSalary(value)} />

        <Button title='Incluir' onPress={handleAddUser} />
        
      </ScrollView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})



