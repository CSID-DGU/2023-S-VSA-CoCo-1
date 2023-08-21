import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SelectStepScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Introduction of the nurse</Text>
      <Text style={styles.subtitle}>name, role</Text>
      <Text style={styles.content}>안녕하세요. 간호사입니다. 간호사를 소개합니다.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>step 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>step 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>step 3</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.confirmButton}>
        <Text>확인하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default SelectStepScreen;
