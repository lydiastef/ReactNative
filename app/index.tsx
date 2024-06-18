import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Task from '../components/Task';

const App = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <Task task={item} onDelete={() => deleteTask(index)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '80%',
  },
  button: {
    backgroundColor: '#1282A2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
