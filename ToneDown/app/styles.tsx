import { StyleSheet } from 'react-native';

// Define your global color scheme and other constants3

export const COLORS = {
    background: "#f2f2f2",
  backgroundGrey: "#f5f4f9",
    yellow: "#dac780",
    beige: "#f1e6df",
    lightblue: "#bfc9f8",
    red: "#db8f7e",
    green: "#8f9869",
    blue: "#bfc9f8",
    lightgreen:"#cbe0dd",
    offwhite: "#fdfdfd",
    white: "#ffffff",
    black: "#131313",
    darkbeige: "#eddbd1",
    textPrimary: "#131313",
    textSecondary: "#131313",
    darkYellow: "#c9b255"
};

// Global Styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 24,
    fontWeight: 'thin',
    color: COLORS.textPrimary,
  },
  subtitle:{
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  titleBold: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.beige,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row', // Arrange elements side by side
    flexWrap: 'wrap', // Allow wrapping when needed
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // Add spacing between elements
    marginBottom: 10,
    backgroundColor: COLORS.background,
  },
  text: {
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
  },
  input:{
    padding: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: COLORS.offwhite,
    borderColor: COLORS.beige,
    borderWidth: 2,
  },
buttonGroup: {
  flexDirection: 'row',
  flexWrap: 'wrap',  // Add this to enable wrapping
  justifyContent: 'center',
  marginBottom: 10,
  gap: 8,  // Optional: add some spacing between buttons
},
  buttonGroupButton: {
      backgroundColor: COLORS.offwhite,
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
      width: '60%',
  },
  // Add this to your styles
buttonOptionsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
},
buttonGroupSmall: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 10,
},
buttonGroupSmallButton: {
  backgroundColor: COLORS.offwhite,
  padding: 15,
  borderRadius: 15,
  alignItems: 'center',
  width: '30%',
},
optionButtonSmall: {
  backgroundColor: COLORS.beige,
  paddingVertical: 12,
  paddingHorizontal: 20,
  margin: 5,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 100,
},
  buttonGroupWide: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
  },
  buttonGroupWideButton: {
      backgroundColor: COLORS.offwhite,
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
      width: '65%',
  },
  optionButton: {
    backgroundColor: COLORS.beige, // More visually appealing
    paddingVertical: 12, // Adjust vertical padding for better fit
    paddingHorizontal: 20, // Ensures text doesn't get cut off
    margin: 5,
    borderRadius: 30, // Slightly larger for smoother look
    alignItems: 'center',
    minWidth: 100, // Ensure text has enough space
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.darkYellow, // More contrast
},
  
  optionButtonWide: {
      backgroundColor: COLORS.beige,
      paddingVertical: 12,
      paddingHorizontal: 25,
      margin: 5,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%', // Adjusted for better proportion
      borderWidth: 2,
      borderColor: COLORS.darkbeige,
  },
  optionButtonSelected: {
      backgroundColor: COLORS.yellow, // Highlight selection
      borderColor: COLORS.darkYellow,
      borderWidth: 4, // More emphasis when selected
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
  },
    intervention: {
        fontSize: 18,
        marginBottom: 10,
    },
barContainer: {
    backgroundColor: COLORS.beige, // Color for the bar container
    borderRadius: 5,
    height: 20,
    marginBottom: 10,
    overflow: 'hidden', // Ensures the bar does not overflow
    borderWidth:0, // Debug border
    width: '100%',
    },
    bar: {
    backgroundColor: COLORS.green, // Change the color of the bar to green for better visibility
    height: '100%',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
      },
      navButton: {
        padding: 12,
      },
      mainNavButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileDetails: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
      },
});
