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
import { TriangleAlert as AlertTriangle, MapPin, Clock, Camera, Send, ChevronDown, Shield } from 'lucide-react-native';

interface IncidentType {
  id: string;
  label: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const incidentTypes: IncidentType[] = [
  {
    id: 'harassment',
    label: 'Harassment',
    description: 'Unwanted attention, comments, or behavior',
    severity: 'high',
  },
  {
    id: 'poor-lighting',
    label: 'Poor Lighting',
    description: 'Inadequate lighting creating safety concerns',
    severity: 'medium',
  },
  {
    id: 'staff-behavior',
    label: 'Staff Behavior',
    description: 'Inappropriate or unprofessional staff conduct',
    severity: 'high',
  },
  {
    id: 'security-issues',
    label: 'Security Issues',
    description: 'Lack of security measures or personnel',
    severity: 'medium',
  },
  {
    id: 'emergency-access',
    label: 'Emergency Access',
    description: 'Blocked or unclear emergency exits',
    severity: 'medium',
  },
  {
    id: 'crowd-behavior',
    label: 'Crowd Behavior',
    description: 'Unsafe or threatening behavior from other patrons',
    severity: 'high',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Other safety concerns not listed above',
    severity: 'medium',
  },
];

export default function ReportIncidentScreen() {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [selectedIncidentType, setSelectedIncidentType] = useState<IncidentType | null>(null);
  const [showIncidentPicker, setShowIncidentPicker] = useState(false);
  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [contactAuthorities, setContactAuthorities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const validateForm = () => {
    if (!businessName.trim()) {
      Alert.alert('Missing Information', 'Please enter the business name.');
      return false;
    }

    if (!selectedIncidentType) {
      Alert.alert('Missing Information', 'Please select the type of incident.');
      return false;
    }

    if (!incidentDescription.trim()) {
      Alert.alert('Missing Information', 'Please describe what happened.');
      return false;
    }

    if (incidentDescription.trim().length < 20) {
      Alert.alert('Description Too Short', 'Please provide more details about the incident (at least 20 characters).');
      return false;
    }

    return true;
  };

  const handleSubmitReport = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      
      Alert.alert(
        'Report Submitted',
        'Thank you for reporting this incident. Your report helps keep our community safe. We will review it and notify nearby users if necessary.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setBusinessName('');
              setBusinessAddress('');
              setSelectedIncidentType(null);
              setIncidentDescription('');
              setIncidentTime('');
              setIsAnonymous(true);
              setContactAuthorities(false);
            }
          }
        ]
      );
    }, 2000);
  };

  const handleEmergency = () => {
    Alert.alert(
      'Emergency Assistance',
      'If you are in immediate danger, please contact emergency services immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call 1091', onPress: () => {
          // In a real app, this would initiate a phone call
          Alert.alert('Emergency Call', 'This would dial 1091 (Women Helpline) in a real app.');
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <AlertTriangle size={32} color="#EF4444" />
          </View>
          <Text style={styles.title}>Report Safety Incident</Text>
          <Text style={styles.subtitle}>
            Help keep our community safe by reporting safety concerns
          </Text>
        </View>

        <View style={styles.emergencyBanner}>
          <Shield size={20} color="#EF4444" />
          <View style={styles.emergencyText}>
            <Text style={styles.emergencyTitle}>In immediate danger?</Text>
            <Text style={styles.emergencyDescription}>Contact emergency services first</Text>
          </View>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
            <Text style={styles.emergencyButtonText}>Call 1091</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Information</Text>
          
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
            <Text style={styles.label}>Address (Optional)</Text>
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
          <Text style={styles.sectionTitle}>Incident Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type of Incident *</Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowIncidentPicker(!showIncidentPicker)}>
              <Text style={[styles.pickerText, !selectedIncidentType && styles.placeholderText]}>
                {selectedIncidentType ? selectedIncidentType.label : 'Select incident type'}
              </Text>
              <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>
            {showIncidentPicker && (
              <View style={styles.incidentList}>
                {incidentTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.incidentItem}
                    onPress={() => {
                      setSelectedIncidentType(type);
                      setShowIncidentPicker(false);
                    }}>
                    <View style={styles.incidentItemContent}>
                      <Text style={styles.incidentLabel}>{type.label}</Text>
                      <Text style={styles.incidentDescription}>{type.description}</Text>
                    </View>
                    <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(type.severity) }]}>
                      <Text style={styles.severityText}>
                        {type.severity.charAt(0).toUpperCase() + type.severity.slice(1)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>When did this happen?</Text>
            <View style={styles.timeContainer}>
              <Clock size={20} color="#6B7280" />
              <TextInput
                style={styles.timeInput}
                placeholder="e.g., 2 hours ago, yesterday evening"
                value={incidentTime}
                onChangeText={setIncidentTime}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <Text style={styles.labelDescription}>
              Please provide details about what happened. Your description helps others stay safe.
            </Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe the incident, including specific details about what happened, who was involved, and any safety concerns..."
              value={incidentDescription}
              onChangeText={setIncidentDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.characterCount}>
              {incidentDescription.length}/500 characters
            </Text>
          </View>

          <TouchableOpacity style={styles.photoButton}>
            <Camera size={20} color="#8B5CF6" />
            <Text style={styles.photoButtonText}>Add Photos (Optional)</Text>
            <Text style={styles.photoButtonSubtext}>Help illustrate the safety concern</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Follow-up</Text>
          
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsAnonymous(!isAnonymous)}>
            <View style={[styles.checkbox, isAnonymous && styles.checkboxChecked]}>
              {isAnonymous && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkboxText}>
              <Text style={styles.checkboxLabel}>Submit anonymously</Text>
              <Text style={styles.checkboxDescription}>
                Your identity will not be shared with the business or other users
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setContactAuthorities(!contactAuthorities)}>
            <View style={[styles.checkbox, contactAuthorities && styles.checkboxChecked]}>
              {contactAuthorities && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkboxText}>
              <Text style={styles.checkboxLabel}>Contact local authorities</Text>
              <Text style={styles.checkboxDescription}>
                Share this report with local law enforcement (for serious incidents)
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmitReport}
          disabled={isSubmitting}>
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
          </Text>
        </TouchableOpacity>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            By submitting this report, you confirm that the information provided is accurate to the best of your knowledge. 
            False reports may result in account suspension.
          </Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyText: {
    flex: 1,
    marginLeft: 12,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 2,
  },
  emergencyDescription: {
    fontSize: 12,
    color: '#7F1D1D',
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
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
  labelDescription: {
    fontSize: 12,
    color: '#6B7280',
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
  placeholderText: {
    color: '#9CA3AF',
  },
  incidentList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    maxHeight: 300,
  },
  incidentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  incidentItemContent: {
    flex: 1,
  },
  incidentLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  incidentDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  timeInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    minHeight: 120,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  photoButton: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 20,
    gap: 4,
  },
  photoButtonText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  photoButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
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
    backgroundColor: '#EF4444',
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
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disclaimer: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 40,
  },
});