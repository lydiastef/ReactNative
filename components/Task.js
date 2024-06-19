import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Task = ({ task, onDelete, onToggleComplete, onEdit }) => {
  return (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={task.completed}
        onPress={() => onToggleComplete(task.id)}
      />
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>
        {task.text}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  actions: {
    flexDirection: 'row',
  },
  editText: {
    color: 'blue',
    marginRight: 10,
    marginLeft: 32,
  },
  deleteText: {
    color: 'red',
  },
});

export default Task;
