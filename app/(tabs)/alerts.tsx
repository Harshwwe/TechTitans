import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { TriangleAlert as AlertTriangle, MapPin, Clock, Users, Shield, Bell, Filter, ChevronRight } from 'lucide-react-native';

interface SafetyAlert {
  id: string;
  type: 'incident' | 'warning' | 'update';
  title: string;
  description: string;
  location: string;
  distance: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  businessName?: string;
  reportedBy: number;
  isRead: boolean;
}

const mockAlerts: SafetyAlert[] = [
  {
    id: '1',
    type: 'incident',
    title: 'Safety Incident Reported',
    description: 'Multiple reports of inappropriate behavior from staff members. Exercise caution when visiting.',
    location: 'Phoenix Mall Food Court',
    distance: '0.3 km',
    timestamp: '2 hours ago',
    severity: 'high',
    businessName: 'Phoenix Mall Food Court',
    reportedBy: 3,
    isRead: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Poor Lighting Conditions',
    description: 'Recent reviews indicate inadequate lighting in parking area and entrance.',
    location: 'Select City Walk Mall',
    distance: '0.8 km',
    timestamp: '4 hours ago',
    severity: 'medium',
    businessName: 'Select City Walk Mall',
    reportedBy: 2,
    isRead: false,
  },
  {
    id: '3',
    type: 'update',
    title: 'Safety Improvements Made',
    description: 'Business has installed additional security cameras and improved lighting based on community feedback.',
    location: 'Cult.fit Gym',
    distance: '1.2 km',
    timestamp: '1 day ago',
    severity: 'low',
    businessName: 'Cult.fit Gym',
    reportedBy: 1,
    isRead: true,
  },
  {
    id: '4',
    type: 'incident',
    title: 'Harassment Incident',
    description: 'Customer reported feeling unsafe due to persistent unwanted attention from other patrons.',
    location: 'Cafe Coffee Day',
    distance: '1.8 km',
    timestamp: '2 days ago',
    severity: 'high',
    businessName: 'Cafe Coffee Day',
    reportedBy: 1,
    isRead: true,
  },
  {
    id: '5',
    type: 'warning',
    title: 'Limited Emergency Exits',
    description: 'Users report difficulty locating clearly marked emergency exits during busy hours.',
    location: 'Hard Rock Cafe',
    distance: '2.1 km',
    timestamp: '3 days ago',
    severity: 'medium',
    businessName: 'Hard Rock Cafe',
    reportedBy: 4,
    isRead: true,
  },
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string, severity: string) => {
    const color = getSeverityColor(severity);
    switch (type) {
      case 'incident':
        return <AlertTriangle size={20} color={color} />;
      case 'warning':
        return <Shield size={20} color={color} />;
      case 'update':
        return <Bell size={20} color={color} />;
      default:
        return <AlertTriangle size={20} color={color} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'incident': return 'Safety Incident';
      case 'warning': return 'Safety Warning';
      case 'update': return 'Safety Update';
      default: return 'Alert';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread': return !alert.isRead;
      case 'high': return alert.severity === 'high';
      default: return true;
    }
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const handleReportIncident = () => {
    Alert.alert(
      'Report Safety Incident',
      'This will open the incident reporting form. Your report helps keep the community safe.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => {
          // Navigate to incident reporting form
          Alert.alert('Feature Coming Soon', 'Incident reporting form will be available in the next update.');
        }}
      ]
    );
  };

  const renderAlert = (alert: SafetyAlert) => (
    <TouchableOpacity
      key={alert.id}
      style={[styles.alertCard, !alert.isRead && styles.unreadAlert]}
      onPress={() => markAsRead(alert.id)}>
      <View style={styles.alertHeader}>
        <View style={styles.alertTypeContainer}>
          {getTypeIcon(alert.type, alert.severity)}
          <Text style={[styles.alertType, { color: getSeverityColor(alert.severity) }]}>
            {getTypeLabel(alert.type)}
          </Text>
        </View>
        {!alert.isRead && <View style={styles.unreadDot} />}
      </View>

      <Text style={styles.alertTitle}>{alert.title}</Text>
      <Text style={styles.alertDescription}>{alert.description}</Text>

      <View style={styles.alertDetails}>
        <View style={styles.locationInfo}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.locationText}>{alert.location}</Text>
          <Text style={styles.distanceText}>• {alert.distance}</Text>
        </View>
        <View style={styles.timeInfo}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.timeText}>{alert.timestamp}</Text>
        </View>
      </View>

      <View style={styles.alertFooter}>
        <View style={styles.reportInfo}>
          <Users size={14} color="#6B7280" />
          <Text style={styles.reportText}>
            {alert.reportedBy} {alert.reportedBy === 1 ? 'report' : 'reports'}
          </Text>
        </View>
        <ChevronRight size={16} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Safety Alerts</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Stay informed about safety incidents in your area
        </Text>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
            onPress={() => setFilter('all')}>
            <Text style={[styles.filterChipText, filter === 'all' && styles.filterChipTextActive]}>
              All ({alerts.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'unread' && styles.filterChipActive]}
            onPress={() => setFilter('unread')}>
            <Text style={[styles.filterChipText, filter === 'unread' && styles.filterChipTextActive]}>
              Unread ({unreadCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'high' && styles.filterChipActive]}
            onPress={() => setFilter('high')}>
            <Text style={[styles.filterChipText, filter === 'high' && styles.filterChipTextActive]}>
              High Priority
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {unreadCount > 0 && (
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.alertsList} showsVerticalScrollIndicator={false}>
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(renderAlert)
        ) : (
          <View style={styles.emptyState}>
            <Shield size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No alerts found</Text>
            <Text style={styles.emptyDescription}>
              {filter === 'unread' 
                ? "You're all caught up! No unread alerts."
                : filter === 'high'
                ? "No high priority alerts in your area."
                : "No safety alerts in your area right now."
              }
            </Text>
          </View>
        )}
        
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.floatingButton}>
        <TouchableOpacity style={styles.reportButton} onPress={handleReportIncident}>
          <AlertTriangle size={20} color="#FFFFFF" />
          <Text style={styles.reportButtonText}>Report Incident</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#8B5CF6',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  actionBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  markAllButton: {
    alignSelf: 'flex-end',
  },
  markAllText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  alertsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertType: {
    fontSize: 14,
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  alertDetails: {
    gap: 8,
    marginBottom: 16,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reportText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomSpacer: {
    height: 100,
  },
});