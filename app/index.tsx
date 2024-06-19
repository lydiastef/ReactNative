import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../components/Task';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const App = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [currentTaskText, setCurrentTaskText] = useState<string>('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (task) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: task,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const editTask = (id: string, newText: string) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          return { ...task, text: newText };
        }
        return task;
      })
    );
    setIsEditModalVisible(false);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const openEditModal = (task: Task) => {
    setCurrentTaskId(task.id);
    setCurrentTaskText(task.text);
    setIsEditModalVisible(true);
  };

  const handleEditSave = () => {
    if (currentTaskId) {
      editTask(currentTaskId, currentTaskText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Task
            task={item}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={() => openEditModal(item)}
          />
        )}
        keyExtractor={item => item.id}
      />

      <Modal visible={isEditModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Edit task text"
            value={currentTaskText}
            onChangeText={setCurrentTaskText}
          />
          <Button title="Save" onPress={handleEditSave} />
          <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
        </View>
      </Modal>
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
    marginBottom: 24,
    borderRadius: 5,
    width: '80%',
  },
  button: {
    backgroundColor: '#1282A2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
