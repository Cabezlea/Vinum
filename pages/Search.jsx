import React, { useState, useEffect } from 'react';
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
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SUGGESTED_PROMPTS = [
  {
    icon: '🍷',
    text: 'Wine recommendations',
    prompt: "I'm looking for wine recommendations for a special dinner."
  },
  {
    icon: '🍽️',
    text: 'Wine pairings',
    prompt: "What wine pairs well with pasta carbonara?"
  },
  {
    icon: '🥂',
    text: 'Learn about wines',
    prompt: "Explain the difference between Cabernet and Merlot."
  },
  {
    icon: '🎁',
    text: 'Gift suggestions',
    prompt: "What's a good wine for a wedding gift?"
  },
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentConversationId, setCurrentConversationId] = useState(Date.now());

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        type: 'bot',
        content: "Greetings, discerning wine enthusiast. I am your personal sommelier, ready to guide you through the world of wines. How may I assist you today?"
      }]);
    }
  }, []);

  const resetConversation = () => {
    setCurrentConversationId(Date.now());
    setMessages([{
      type: 'bot',
      content: "Greetings, discerning wine enthusiast. I am your personal sommelier, ready to guide you through the world of wines. How may I assist you today?"
    }]);
    setShowWelcome(true);
  };

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setQuery('');
    setMessages(prev => [...prev, { type: 'user', content: searchQuery }]);
    setLoading(true);
    setShowWelcome(false);

    try {
      const response = await fetch('http://192.168.12.120:8000/api/search/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
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
          <Text style={styles.avatarEmoji}>🍷</Text>
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
      <LinearGradient
        colors={['rgba(13, 27, 42, 0.95)', '#0D1B2A']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Wine Sommelier</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetConversation}
            onPressIn={() => Alert.alert('Reset Chat', 'Start a new conversation?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Reset', onPress: resetConversation }
            ])}
          >
            <Text style={styles.buttonEmoji}>🔄</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((message, index) => renderMessage(message, index))}

        {showWelcome && (
          <Animatable.View
            animation="fadeIn"
            style={styles.suggestedPromptsContainer}
          >
            <Text style={styles.suggestedTitle}>I can help you with:</Text>
            {SUGGESTED_PROMPTS.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.promptButton}
                onPress={() => handleSearch(prompt.prompt)}
              >
                <Text style={styles.promptIcon}>{prompt.icon}</Text>
                <Text style={styles.promptText}>{prompt.text}</Text>
              </TouchableOpacity>
            ))}
          </Animatable.View>
        )}

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
          style={[
            styles.sendButton,
            query.trim() ? styles.sendButtonActive : null
          ]}
          onPress={() => handleSearch()}
          disabled={loading || !query.trim()}
        >
          <Text style={styles.buttonEmoji}>{loading ? '⏳' : '📨'}</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#0D1B2A',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(213, 34, 71, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(213, 34, 71, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  buttonEmoji: {
    fontSize: 22,
  },
  messageContent: {
    maxWidth: '80%',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userMessageContent: {
    backgroundColor: '#D52247',
    borderBottomRightRadius: 5,
  },
  botMessageContent: {
    backgroundColor: '#073152',
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
    color: '#FFFFFF',
  },
  suggestedPromptsContainer: {
    padding: 20,
    backgroundColor: 'rgba(7, 49, 82, 0.5)',
    borderRadius: 15,
    margin: 10,
  },
  suggestedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  promptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(213, 34, 71, 0.1)',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promptIcon: {
    fontSize: 24,
    marginRight: 10,
    color: '#FFFFFF',
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#0D1B2A',
    ...Platform.select({
      ios: {
        paddingBottom: 30
      }
    })
  },
  input: {
    flex: 1,
    backgroundColor: '#073152',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#FFFFFF',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#073152',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#D52247',
  },
});

export default Search;
