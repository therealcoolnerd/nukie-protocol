import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TikTokFeed() {
  return (
    <WebView
      source={{ uri: 'https://www.tiktok.com/@tiktok' }}
      style={styles.webview}
      originWhitelist={['*']}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
