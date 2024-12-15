import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const Search = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const userMessage = query;
    setQuery('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('http://192.168.12.120:8000/api/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Search error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Apologies, I seem to be having trouble connecting. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (message, index) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      key={index}
      style={[
        styles.messageContainer,
        message.type === 'user' ? styles.userMessage : styles.botMessage
      ]}
    >
      {message.type === 'bot' && (
        <View style={styles.avatarContainer}>
          <Icon name="glass-wine" size={24} color="#D52247" />
        </View>
      )}
      <View style={[
        styles.messageContent,
        message.type === 'user' ? styles.userMessageContent : styles.botMessageContent
      ]}>
        <Text style={[
          styles.messageText,
          message.type === 'user' ? styles.userMessageText : styles.botMessageText
        ]}>
          {message.content}
        </Text>
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((message, index) => renderMessage(message, index))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#D52247" />
            <Text style={styles.loadingText}>Sommelier is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <Animatable.View
        animation="slideInUp"
        duration={500}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Ask about wines..."
          placeholderTextColor="#666"
          value={query}
          onChangeText={setQuery}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSearch}
          disabled={loading || !query.trim()}
        >
          <Icon
            name="send"
            size={24}
            color={query.trim() ? "#D52247" : "#999"}
          />
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  messageContent: {
    maxWidth: '80%',
    borderRadius: 20,
    padding: 15,
  },
  userMessageContent: {
    backgroundColor: '#D52247',
    borderBottomRightRadius: 5,
  },
  botMessageContent: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#0D1B2A',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        paddingBottom: 30 // Add extra padding for iPhone X and newer
      }
    })
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
