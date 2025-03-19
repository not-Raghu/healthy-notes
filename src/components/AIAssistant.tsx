import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  variant?: 'floating' | 'sidebar';
}

const AIAssistant: React.FC<AIAssistantProps> = ({ variant = 'floating' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your health assistant. I can help you navigate the website and provide general healthcare information. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (input: string): string => {
    const normalizedInput = input.toLowerCase();

    // Basic response patterns
    if (normalizedInput.includes('hello') || normalizedInput.includes('hi')) {
      return "Hello! How can I help you today?";
    }

    if (normalizedInput.includes('help') || normalizedInput.includes('how to use')) {
      return `Here's how to use our healthcare platform:

1. **Dashboard**: View your health metrics and upcoming appointments
2. **Medical History**: Track conditions, procedures, and medications
3. **Allergies**: Manage your allergy information
4. **Appointments**: Schedule and track medical appointments
5. **Documents**: Store and access medical records
6. **Emergency**: Quick access to emergency contacts and services
7. **Find Healthcare**: Locate nearby healthcare providers

Need specific help with any of these features?`;
    }

    if (normalizedInput.includes('appointment') || normalizedInput.includes('schedule')) {
      return "To manage appointments:\n\n1. Click 'Appointments' in the sidebar\n2. Click 'Add New Appointment'\n3. Fill in the doctor's details, date, and time\n4. Optionally sync with Google Calendar";
    }

    if (normalizedInput.includes('emergency')) {
      return "For emergencies:\n\n- Call 911 immediately for life-threatening situations\n- Access emergency contacts in the Emergency section\n- Find nearby hospitals using the Find Healthcare feature";
    }

    if (normalizedInput.includes('document') || normalizedInput.includes('record')) {
      return "To manage medical documents:\n\n1. Go to the Documents section\n2. Upload files by dragging and dropping or clicking 'browse'\n3. View and organize your medical records\n4. Link with DigiLocker for official documents";
    }

    if (normalizedInput.includes('allergy') || normalizedInput.includes('allergies')) {
      return "To manage allergies:\n\n1. Navigate to the Allergies section\n2. Click 'Add New Allergy'\n3. Enter allergy details including severity and reactions\n4. Your healthcare providers can access this information";
    }

    if (normalizedInput.includes('thank')) {
      return "You're welcome! Let me know if you need anything else.";
    }

    // Default response for unrecognized inputs
    return "I can help you with:\n\n- Navigating the website\n- Finding healthcare services\n- Managing appointments\n- Accessing medical records\n- Emergency information\n\nWhat would you like to know more about?";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getResponse(input),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  const containerClasses = variant === 'sidebar' 
    ? 'flex flex-col h-[calc(100vh-16rem)] bg-white rounded-lg shadow-sm border border-gray-200 mx-3 mb-4'
    : 'flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-200';

  const headerClasses = variant === 'sidebar'
    ? 'flex items-center p-3 border-b border-gray-200'
    : 'flex items-center p-4 border-b border-gray-200';

  const messageContainerClasses = variant === 'sidebar'
    ? 'flex-1 overflow-y-auto p-3 space-y-3'
    : 'flex-1 overflow-y-auto p-4 space-y-4';

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className={headerClasses}>
        <Bot className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-base font-semibold text-gray-900">Health Assistant</h2>
      </div>

      {/* Messages */}
      <div className={messageContainerClasses}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'bg-blue-600' : 'bg-gray-100'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-blue-600" />
                )}
              </div>
              <div
                className={`rounded-lg p-2 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <ReactMarkdown
                  className={`prose ${message.type === 'user' ? 'prose-invert' : ''} max-w-none text-sm`}
                >
                  {message.content}
                </ReactMarkdown>
                <div
                  className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;