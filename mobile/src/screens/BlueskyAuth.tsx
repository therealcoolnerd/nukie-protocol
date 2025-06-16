import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function BlueskyAuth() {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  async function authenticate() {
    try {
      const res = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: handle, password }),
      });
      if (res.ok) {
        setStatus('Authenticated');
      } else {
        setStatus('Authentication failed');
      }
    } catch (e) {
      setStatus('Error connecting');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluesky Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Handle"
        autoCapitalize="none"
        value={handle}
        onChangeText={setHandle}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={authenticate} />
      {status ? <Text style={styles.status}>{status}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
  status: {
    marginTop: 10,
    textAlign: 'center',
  },
});
