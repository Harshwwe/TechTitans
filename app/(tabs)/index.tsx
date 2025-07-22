import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Search, Filter, Star, MapPin, Shield } from 'lucide-react-native';
import { router } from 'expo-router';

interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  safetyScore: number;
  reviewCount: number;
  distance: string;
  ratings: {
    lighting: number;
    staff: number;
    crowd: number;
    emergency: number;
  };
}

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Chai Point Cafe',
    category: 'Cafe',
    address: 'Connaught Place, New Delhi',
    safetyScore: 4.5,
    reviewCount: 28,
    distance: '0.5 km',
    ratings: { lighting: 5, staff: 4, crowd: 4, emergency: 5 },
  },
  {
    id: '2',
    name: 'Gold\'s Gym',
    category: 'Fitness',
    address: 'Bandra West, Mumbai',
    safetyScore: 4.8,
    reviewCount: 45,
    distance: '1.2 km',
    ratings: { lighting: 5, staff: 5, crowd: 5, emergency: 4 },
  },
  {
    id: '3',
    name: 'Karim\'s Restaurant',
    category: 'Restaurant',
    address: 'Chandni Chowk, Old Delhi',
    safetyScore: 4.2,
    reviewCount: 67,
    distance: '2.1 km',
    ratings: { lighting: 4, staff: 4, crowd: 4, emergency: 5 },
  },
  {
    id: '4',
    name: 'Kaya Skin Clinic',
    category: 'Wellness',
    address: 'Koramangala, Bangalore',
    safetyScore: 4.9,
    reviewCount: 33,
    distance: '3.0 km',
    ratings: { lighting: 5, staff: 5, crowd: 5, emergency: 5 },
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBusinesses(mockBusinesses);
    } else {
      const filtered = mockBusinesses.filter(
        (business) =>
          business.name.toLowerCase().includes(query.toLowerCase()) ||
          business.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBusinesses(filtered);
    }
  };

  const getSafetyColor = (score: number) => {
    if (score >= 4.5) return '#10B981';
    if (score >= 3.5) return '#F59E0B';
    return '#EF4444';
  };

  const getSafetyLabel = (score: number) => {
    if (score >= 4.5) return 'Very Safe';
    if (score >= 3.5) return 'Moderately Safe';
    return 'Use Caution';
  };

  const handleReportIncident = () => {
    router.push('/(tabs)/report-incident');
  };

  const renderBusinessCard = (business: Business) => (
    <TouchableOpacity key={business.id} style={styles.businessCard}>
      <View style={styles.businessHeader}>
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>{business.name}</Text>
          <Text style={styles.businessCategory}>{business.category}</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.businessAddress}>{business.address}</Text>
          </View>
        </View>
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>{business.distance}</Text>
        </View>
      </View>

      <View style={styles.safetySection}>
        <View style={styles.safetyScore}>
          <View
            style={[
              styles.scoreCircle,
              { backgroundColor: getSafetyColor(business.safetyScore) },
            ]}>
            <Shield size={16} color="#FFFFFF" />
            <Text style={styles.scoreText}>{business.safetyScore}</Text>
          </View>
          <View style={styles.scoreDetails}>
            <Text style={styles.safetyLabel}>
              {getSafetyLabel(business.safetyScore)}
            </Text>
            <View style={styles.reviewInfo}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.reviewCount}>{business.reviewCount} reviews</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ratingCategories}>
        {Object.entries(business.ratings).map(([category, rating]) => (
          <View key={category} style={styles.categoryRating}>
            <Text style={styles.categoryName}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  color={star <= rating ? '#F59E0B' : '#E5E7EB'}
                  fill={star <= rating ? '#F59E0B' : '#E5E7EB'}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SafeSpaces</Text>
        <Text style={styles.subtitle}>Find safe spaces near you</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants, cafes, gyms, malls..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.businessList} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Safe Spaces</Text>
          <Text style={styles.resultsCount}>
            {filteredBusinesses.length} places found
          </Text>
        </View>
        
        {filteredBusinesses.map(renderBusinessCard)}
        
        <View style={styles.bottomSpacer} />
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.reportButton} onPress={handleReportIncident}>
            <Shield size={20} color="#FFFFFF" />
            <Text style={styles.reportButtonText}>Report Safety Incident</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.emergencyButton} onPress={() => {
            Alert.alert(
              'Emergency Assistance',
              'Contact Women Helpline for immediate assistance.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Call 1091', onPress: () => {
                  Alert.alert('Emergency Call', 'This would dial 1091 (Women Helpline) in a real app.');
                }}
              ]
            );
          }}>
            <Text style={styles.emergencyButtonText}>Emergency: Call 1091</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  businessList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  businessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  businessAddress: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  distanceContainer: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  safetySection: {
    marginBottom: 16,
  },
  safetyScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  scoreDetails: {
    flex: 1,
  },
  safetyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  reviewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  categoryRating: {
    alignItems: 'center',
    flex: 1,
  },
  categoryName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  bottomSpacer: {
    height: 20,
  },
  quickActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});