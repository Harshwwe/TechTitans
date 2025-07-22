import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'safety' | 'incident' | 'update';
  timestamp: Date;
  isRead: boolean;
  location?: string;
  businessName?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show alert for high-priority safety notifications
    if (notificationData.type === 'incident') {
      Alert.alert(
        'Safety Alert',
        notificationData.message,
        [
          { text: 'Dismiss', style: 'cancel' },
          { text: 'View Details', onPress: () => {
            // Navigate to alerts screen
          }}
        ]
      );
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Simulate receiving notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add safety notifications for demo purposes
      const randomNotifications = [
        {
          title: 'Safety Alert',
          message: 'New incident reported at Phoenix Mall Food Court - Exercise caution',
          type: 'incident' as const,
          location: 'Phoenix Mall Food Court',
          businessName: 'Phoenix Mall Food Court',
        },
        {
          title: 'Safety Update',
          message: 'Cult.fit Gym has improved lighting in parking area',
          type: 'update' as const,
          location: 'Cult.fit Gym',
          businessName: 'Cult.fit Gym',
        },
        {
          title: 'Safety Warning',
          message: 'Poor lighting reported at Select City Walk Mall',
          type: 'safety' as const,
          location: 'Select City Walk Mall',
          businessName: 'Select City Walk Mall',
        },
      ];

      if (Math.random() < 0.1) { // 10% chance every interval
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};