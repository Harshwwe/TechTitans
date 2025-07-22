import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { User, Star, Shield, Bell, Lock, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Award, MapPin } from 'lucide-react-native';

interface UserStats {
  reviewsWritten: number;
  helpfulVotes: number;
  safetyScore: number;
  level: string;
}

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);

  const userStats: UserStats = {
    reviewsWritten: 12,
    helpfulVotes: 48,
    safetyScore: 4.6,
    level: 'Safety Guardian',
  };

  const recentReviews = [
    {
      id: '1',
      businessName: 'Chai Point Cafe',
      rating: 4.5,
      date: '2 days ago',
      helpful: 8,
    },
    {
      id: '2',
      businessName: 'Gold\'s Gym',
      rating: 4.8,
      date: '1 week ago',
      helpful: 12,
    },
    {
      id: '3',
      businessName: 'Karim\'s Restaurant',
      rating: 4.2,
      date: '2 weeks ago',
      helpful: 5,
    },
  ];

  const renderStatCard = (icon: any, label: string, value: string, color: string) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderSettingItem = (
    icon: any,
    title: string,
    subtitle?: string,
    hasSwitch = false,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={hasSwitch}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>{icon}</View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
          thumbColor={switchValue ? '#8B5CF6' : '#F3F4F6'}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <User size={32} color="#8B5CF6" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Priya Sharma</Text>
              <Text style={styles.userLevel}>{userStats.level}</Text>
              <View style={styles.badgeContainer}>
                <Award size={16} color="#F59E0B" />
                <Text style={styles.badgeText}>Community Contributor</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            {renderStatCard(
              <Star size={20} color="#FFFFFF" />,
              'Reviews',
              userStats.reviewsWritten.toString(),
              '#8B5CF6'
            )}
            {renderStatCard(
              <Shield size={20} color="#FFFFFF" />,
              'Safety Score',
              userStats.safetyScore.toString(),
              '#10B981'
            )}
            {renderStatCard(
              <Award size={20} color="#FFFFFF" />,
              'Helpful Votes',
              userStats.helpfulVotes.toString(),
              '#F59E0B'
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {recentReviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewBusiness}>{review.businessName}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <View style={styles.reviewDetails}>
                <View style={styles.reviewRating}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{review.rating}</Text>
                </View>
                <Text style={styles.helpfulText}>
                  {review.helpful} found helpful
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Reviews</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {renderSettingItem(
            <Bell size={20} color="#6B7280" />,
            'Notifications',
            'Safety alerts and updates',
            true,
            notificationsEnabled,
            setNotificationsEnabled
          )}
          
          {renderSettingItem(
            <MapPin size={20} color="#6B7280" />,
            'Location Services',
            'Find nearby safe spaces',
            true,
            locationEnabled,
            setLocationEnabled
          )}
          
          {renderSettingItem(
            <Lock size={20} color="#6B7280" />,
            'Anonymous Mode',
            'Hide your name on reviews',
            true,
            anonymousMode,
            setAnonymousMode
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          {renderSettingItem(
            <Shield size={20} color="#6B7280" />,
            'Safety Guidelines',
            'Learn about safety features'
          )}
          
          {renderSettingItem(
            <Lock size={20} color="#6B7280" />,
            'Privacy Policy',
            'How we protect your data'
          )}
          
          {renderSettingItem(
            <HelpCircle size={20} color="#6B7280" />,
            'Help & Support',
            'Get help or contact us'
          )}
          
          {renderSettingItem(
            <Shield size={20} color="#DC2626" />,
            'Emergency Helpline',
            'Call 1091 for immediate assistance',
            false,
            undefined,
            undefined,
            () => {
              Alert.alert(
                'Emergency Helpline',
                'Contact Women Helpline (1091) for immediate assistance.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Call 1091', onPress: () => {
                    Alert.alert('Emergency Call', 'This would dial 1091 (Women Helpline) in a real app.');
                  }}
                ]
              );
            }
          )}
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewBusiness: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  reviewDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  reviewDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  helpfulText: {
    fontSize: 14,
    color: '#6B7280',
  },
  viewAllButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 40,
  },
});