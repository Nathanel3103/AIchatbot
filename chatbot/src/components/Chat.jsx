import { useRef, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import styles from './Chat.module.css';

// default welcome message
const WELCOME_MESSAGE_GROUP = [
  {
    role: "assistant",
    content: "Hello! How can I assist you right now?",
  },
];

export function Chat({ messages }) {
  // Reference to scroll to the latest message
  const messagesEndRef = useRef(null);

  // Group messages by user interactions
  // Each new user message starts a new group
  const messagesGroups = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") groups.push([]);
        groups[groups.length - 1].push(message);
        return groups;
      }, []),
    [messages]
  );

  // Auto-scroll to the latest message whenever messages update
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.role === "user") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.Chat}>
      {/* groups all messages into groups */}
      {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map(
        (messages, groupIndex) => (


          // Message group container
          <div key={groupIndex} className={styles.Group}>
            {messages.map(({ role, content }, index) => (


              // Message container
              <div key={index} className={styles.Message} data-role={role}>
                
                <Markdown>{content}</Markdown>
              </div>
            ))}
          </div>
        )
      )}

      {/* Scroll to the latest message */}
      <div ref={messagesEndRef} />
    </div>
  );
}