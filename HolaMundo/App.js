import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

class Users extends React.Component {
  state = {
    loading: true,
    users: []
  };

  constructor(props) {
    super(props);
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const pre = await response.json();
    // Debe tener un key para el FlatList
    /* pre.map(x => ({ ...copiaElemento, key: Cadena })) */
    const users = pre.map(x => ({ ...x, key: String(x.id) }));
    this.setState({ users, loading: false });
  };

  render() {
    const { loading, users } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Cargando...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}

export default function App() {
  return <Users></Users>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
