import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles, COLORS } from './styles';

interface QuestionProps {
  title: string;
  value: string | number;
  setValue: (value: any) => void;
  inputType: 'text' | 'number' | 'button' | 'slider' | "buttons" | "buttonsWider" | "buttonsSmall";
  options: string[];
}

export default function Question({ title, value, setValue, inputType, options }: QuestionProps) {
  const renderInput = () => {
    switch (inputType) {
      case 'text':
        return (
          <TextInput
            style={styles.input}
            value={value as string}
            onChangeText={setValue}
          />
        );
      case 'number':
        return (
          <TextInput
            style={styles.input}
            value={value as string}
            onChangeText={setValue}
            keyboardType="numeric"
          />
        );
      case 'button':
        return (
          <View style={styles.buttonContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  value === option && styles.selectedButton
                ]}
                onPress={() => setValue(option)}
              >
                <ThemedText style={styles.optionText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'buttons':
          if (options == null) {
            options = ["m", "f", "d"];  
          }
        return (
          <View style={styles.buttonGroup}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  value === option && styles.optionButtonSelected,
                ]}
                onPress={() => setValue(option)}
              >
                <ThemedText style={styles.optionButtonText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'buttonsWider':
        return (
          <View style={[styles.buttonGroupWide, {backgroundColor: COLORS.offwhite}]}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButtonWide,
                  value === option && styles.optionButtonSelected,
                ]}
                onPress={() => setValue(option)}
              >
                <ThemedText style={styles.optionButtonText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'buttonsSmall':
        return (
          <View style={styles.buttonGroupSmall}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButtonSmall,
                  value === option && styles.optionButtonSelected,
                ]}
                onPress={() => setValue(option)}
              >
                <ThemedText style={styles.optionButtonText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.subtitle}>{title}</ThemedText>
      {renderInput()}
    </View>
  );
}

