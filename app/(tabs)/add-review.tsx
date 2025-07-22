import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Star, MapPin, Camera, Send, ChevronDown } from 'lucide-react-native';

interface RatingCategory {
  key: string;
  label: string;
  description: string;
}

const ratingCategories: RatingCategory[] = [
  {
    key: 'lighting',
    label: 'Lighting',
    description: 'How well-lit is the venue?',
  },
  {
    key: 'staff',
    label: 'Staff Behavior',
    description: 'How professional and respectful is the staff?',
  },
  {
    key: 'crowd',
    label: 'Crowd Safety',
    description: 'How safe and respectful is the crowd?',
  },
  {
    key: 'emergency',
    label: 'Emergency Response',
    description: 'Are exits clearly marked and accessible?',
  },
];

export default function AddReviewScreen() {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Restaurant');
  const [ratings, setRatings] = useState<Record<string, number>>({
    lighting: 0,
    staff: 0,
    crowd: 0,
    emergency: 0,
  });
  const [reviewText, setReviewText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const categories = ['Restaurant', 'Cafe', 'Fitness', 'Shopping Mall', 'Beauty Salon', 'Wellness', 'Other'];

  const setRating = (category: string, rating: number) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const renderStarRating = (category: string, currentRating: number) => (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(category, star)}
          style={styles.starButton}>
          <Star
            size={24}
            color={star <= currentRating ? '#F59E0B' : '#E5E7EB'}
            fill={star <= currentRating ? '#F59E0B' : '#E5E7EB'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSubmitReview = () => {
    if (!businessName.trim()) {
      Alert.alert('Missing Information', 'Please enter the business name.');
      return;
    }

    const unratedCategories = ratingCategories.filter(
      category => ratings[category.key] === 0
    );

    if (unratedCategories.length > 0) {
      Alert.alert(
        'Missing Ratings',
        'Please rate all categories before submitting your review.'
      );
      return;
    }

    if (!reviewText.trim()) {
      Alert.alert('Missing Review', 'Please write a review to help other women.');
      return;
    }

    Alert.alert(
      'Review Submitted',
      'Thank you for contributing to our community! Your review will help keep other women safe.',
      [{ text: 'OK', onPress: resetForm }]
    );
  };

  const resetForm = () => {
    setBusinessName('');
    setBusinessAddress('');
    setSelectedCategory('Restaurant');
    setRatings({ lighting: 0, staff: 0, crowd: 0, emergency: 0 });
    setReviewText('');
    setIsAnonymous(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Safety Review</Text>
          <Text style={styles.subtitle}>
            Help other women make informed decisions
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Business Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter business name"
              value={businessName}
              onChangeText={setBusinessName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}>
              <Text style={styles.pickerText}>{selectedCategory}</Text>
              <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>
            {showCategoryPicker && (
              <View style={styles.categoryList}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={styles.categoryItem}
                    onPress={() => {
                      setSelectedCategory(category);
                      setShowCategoryPicker(false);
                    }}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.addressContainer}>
              <MapPin size={20} color="#6B7280" />
              <TextInput
                style={styles.addressInput}
                placeholder="Enter or detect location"
                value={businessAddress}
                onChangeText={setBusinessAddress}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Ratings</Text>
          <Text style={styles.sectionDescription}>
            Rate each aspect based on your experience
          </Text>
          
          {ratingCategories.map((category) => (
            <View key={category.key} style={styles.ratingGroup}>
              <View style={styles.ratingHeader}>
                <Text style={styles.ratingLabel}>{category.label}</Text>
                <Text style={styles.ratingDescription}>{category.description}</Text>
              </View>
              {renderStarRating(category.key, ratings[category.key])}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Review</Text>
          <Text style={styles.sectionDescription}>
            Share details about your experience to help other women
          </Text>
          
          <TextInput
            style={styles.reviewInput}
            placeholder="Describe your experience, safety features you noticed, any concerns, tips for other women..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity style={styles.photoButton}>
            <Camera size={20} color="#8B5CF6" />
            <Text style={styles.photoButtonText}>Add Photos (Optional)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsAnonymous(!isAnonymous)}>
            <View style={[styles.checkbox, isAnonymous && styles.checkboxChecked]}>
              {isAnonymous && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkboxText}>
              <Text style={styles.checkboxLabel}>Submit anonymously</Text>
              <Text style={styles.checkboxDescription}>
                Your name won't be shown with this review
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>

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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
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
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
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
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    fontSize: 16,
    color: '#1F2937',
  },
  categoryList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    maxHeight: 200,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryText: {
    fontSize: 16,
    color: '#1F2937',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  addressInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  ratingGroup: {
    marginBottom: 20,
  },
  ratingHeader: {
    marginBottom: 12,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    minHeight: 120,
    marginBottom: 16,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  photoButtonText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  checkboxText: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  checkboxDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 40,
  },
});