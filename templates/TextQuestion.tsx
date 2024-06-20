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

// TODO: Register fonts here
// https://react-pdf.org/fonts
// Font.register({
//   family: "Poppins",
//   fonts: [
//     {
//       src: "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Regular.ttf/",
//     },
//     {
//       src: "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf/",
//       fontWeight: 700,
//     },
//   ],
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
    textAlign: "center",
    textTransform: "capitalize",
  },
  question: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    color: "#777",
  },
});

interface Props {
  heading: string;
  questions: IQuestion[];
  smileyImage: string;
  landscape?: boolean;
}

// Create Document Component
const TextQuestion = ({
  heading,
  questions,
  smileyImage,
  landscape,
}: Props) => {
  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
        orientation={landscape ? "landscape" : "portrait"}
      >
        <View style={styles.section}>
          <Text style={styles.heading}>{heading}</Text>

          {questions.length === 0 && (
            <Text style={{ textAlign: "center" }}>No questions added</Text>
          )}

          {questions?.map((question, idx) => {
            return (
              <View key={idx} style={styles.question} wrap={false}>
                <View>
                  <Text>{question.text}</Text>
                  <Text style={styles.description}>{question.description}</Text>
                </View>

                <Image src={smileyImage} />
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export { TextQuestion };
