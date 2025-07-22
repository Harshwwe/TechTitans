import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MapPin, Shield, Navigation, Filter } from 'lucide-react-native';

interface MapBusiness {
  id: string;
  name: string;
  category: string;
  safetyScore: number;
  latitude: number;
  longitude: number;
}

const mockMapBusinesses: MapBusiness[] = [
  {
    id: '1',
    name: 'Chai Point Cafe',
    category: 'Cafe',
    safetyScore: 4.5,
    latitude: 28.6139,
    longitude: 77.2090,
  },
  {
    id: '2',
    name: 'Gold\'s Gym',
    category: 'Fitness',
    safetyScore: 4.8,
    latitude: 19.0760,
    longitude: 72.8777,
  },
  {
    id: '3',
    name: 'Karim\'s Restaurant',
    category: 'Restaurant',
    safetyScore: 4.2,
    latitude: 28.6562,
    longitude: 77.2410,
  },
];

export default function MapScreen() {
  const [selectedBusiness, setSelectedBusiness] = useState<MapBusiness | null>(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Safety Map</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color="#8B5CF6" />
          <Text style={styles.mapPlaceholderText}>Interactive Map</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Map integration coming soon
          </Text>
        </View>

        {/* Map pins simulation */}
        <View style={styles.pinsContainer}>
          {mockMapBusinesses.map((business, index) => (
            <TouchableOpacity
              key={business.id}
              style={[
                styles.mapPin,
                {
                  top: 120 + index * 80,
                  left: 60 + index * 60,
                  backgroundColor: getSafetyColor(business.safetyScore),
                },
              ]}
              onPress={() => setSelectedBusiness(business)}>
              <Shield size={16} color="#FFFFFF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.locationButton}>
          <Navigation size={20} color="#FFFFFF" />
          <Text style={styles.locationButtonText}>My Location</Text>
        </TouchableOpacity>
      </View>

      {selectedBusiness && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />
          <ScrollView style={styles.sheetContent}>
            <View style={styles.businessHeader}>
              <View style={styles.businessInfo}>
                <Text style={styles.businessName}>{selectedBusiness.name}</Text>
                <Text style={styles.businessCategory}>{selectedBusiness.category}</Text>
              </View>
              <View
                style={[
                  styles.safetyBadge,
                  { backgroundColor: getSafetyColor(selectedBusiness.safetyScore) },
                ]}>
                <Shield size={16} color="#FFFFFF" />
                <Text style={styles.safetyBadgeText}>
                  {selectedBusiness.safetyScore}
                </Text>
              </View>
            </View>
            
            <View style={styles.safetyInfo}>
              <Text style={styles.safetyLabel}>
                {getSafetyLabel(selectedBusiness.safetyScore)}
              </Text>
              <Text style={styles.safetyDescription}>
                Based on community reviews and safety ratings
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
                  Get Directions
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    margin: 20,
    borderRadius: 16,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  pinsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapPin: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  controlsContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  safetyBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  safetyInfo: {
    marginBottom: 20,
  },
  safetyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  safetyDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});