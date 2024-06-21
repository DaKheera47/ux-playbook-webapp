import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { ParticipantIntroduction } from "./ParticipantIntroduction";

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
    display: "flex",
    flexDirection: "column",
    fontSize: 16,
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
    marginBottom: 5,
    color: "#777",
  },
  fileId: {
    position: "absolute",
    padding: 5,
    color: "#777",
    top: 10,
    zIndex: 100,
    right: 10,
    fontSize: 10,
  },
});

interface Props {
  heading: string;
  questions: IQuestion[];
  introductionQuestions: IQuestion[];
  showIntroduction: boolean;
  smileyImage: string;
  landscape?: boolean;
  fileId: string;
}

// Create Document Component
const TextQuestion = ({
  heading,
  questions,
  introductionQuestions,
  showIntroduction,
  smileyImage,
  landscape,
  fileId,
}: Props) => {
  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
        orientation={landscape ? "landscape" : "portrait"}
      >
        <View fixed style={styles.fileId}>
          <Text>File {fileId}</Text>
        </View>

        {showIntroduction && (
          <ParticipantIntroduction questions={introductionQuestions} />
        )}

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
