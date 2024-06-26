import React from "react";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  question: {
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

interface Props {
  questions: IBaseQuestion[];
}

// Create Document Component
const ParticipantIntroduction = ({ questions }: Props) => {
  return (
    <View wrap={false} style={styles.section}>
      <Text style={styles.heading}>About Me</Text>

      {questions.length === 0 && (
        <Text style={{ textAlign: "center" }}>No questions added</Text>
      )}

      {questions?.map((question, idx) => {
        return (
          <View key={idx} wrap={false} style={[styles.question]}>
            <Text>{question.text}</Text>

            <View
              style={{
                width: "50%",
                marginLeft: "auto",
                borderBottomWidth: 1,
                borderBottomColor: "#000",
                borderBottomStyle: "solid",
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export { ParticipantIntroduction };
