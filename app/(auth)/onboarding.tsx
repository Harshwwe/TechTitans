import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Shield, Users, MapPin, Star, ChevronRight, Check } from 'lucide-react-native';

interface OnboardingStep {
  id: number;
  icon: any;
  title: string;
  description: string;
  color: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    icon: <Shield size={48} color="#FFFFFF" />,
    title: 'Safety First',
    description: 'Discover safe spaces through community-verified reviews and ratings from women like you.',
    color: '#8B5CF6',
  },
  {
    id: 2,
    icon: <Users size={48} color="#FFFFFF" />,
    title: 'Community Driven',
    description: 'Join a supportive community where your experiences help keep other women safe.',
    color: '#10B981',
  },
  {
    id: 3,
    icon: <MapPin size={48} color="#FFFFFF" />,
    title: 'Find Safe Spaces',
    description: 'Locate nearby businesses with detailed safety information and real-time updates.',
    color: '#F59E0B',
  },
  {
    id: 4,
    icon: <Star size={48} color="#FFFFFF" />,
    title: 'Share Your Experience',
    description: 'Rate venues on lighting, staff behavior, crowd safety, and emergency response.',
    color: '#EF4444',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, { backgroundColor: currentStepData.color }]}>
            {currentStepData.icon}
          </View>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.description}>{currentStepData.description}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressDots}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.progressDotActive,
                  index < currentStep && styles.progressDotCompleted,
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          {currentStep === onboardingSteps.length - 1 ? (
            <Check size={20} color="#FFFFFF" />
          ) : (
            <ChevronRight size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      {currentStep === 0 && (
        <View style={styles.welcomeOverlay}>
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeHeader}>
              <Shield size={32} color="#8B5CF6" />
              <Text style={styles.welcomeTitle}>Welcome to SafeSpaces</Text>
            </View>
            <Text style={styles.welcomeDescription}>
              Your privacy and safety are our top priorities. All data is encrypted and you can choose to remain anonymous at any time.
            </Text>
            <View style={styles.privacyFeatures}>
              <View style={styles.privacyFeature}>
                <Check size={16} color="#10B981" />
                <Text style={styles.privacyFeatureText}>End-to-end encryption</Text>
              </View>
              <View style={styles.privacyFeature}>
                <Check size={16} color="#10B981" />
                <Text style={styles.privacyFeatureText}>Anonymous posting options</Text>
              </View>
              <View style={styles.privacyFeature}>
                <Check size={16} color="#10B981" />
                <Text style={styles.privacyFeatureText}>No location tracking</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  progressDotActive: {
    backgroundColor: '#8B5CF6',
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: '#10B981',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  welcomeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  privacyFeatures: {
    alignSelf: 'stretch',
    gap: 8,
  },
  privacyFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  privacyFeatureText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});