import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({ task, onDelete }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{task}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
  },
  taskText: {
    fontSize: 16,
    marginRight: 16,
  },
  deleteText: {
    color: '#FF574D',
  },
});

export default Task;
