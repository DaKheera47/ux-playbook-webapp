import { $showIntroduction } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { ParticipantIntroduction } from "./ParticipantIntroduction";

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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    color: "#777",
  },
  col: {
    width: "50%",
    padding: 10,
  },
});

interface Props {
  heading: string;
  questions: IQuestion[];
  introductionQuestions?: IQuestion[];
  smileyImage: string;
  landscape?: boolean;
  showIntroduction?: boolean;
}

// Create Document Component
const TextQuestionTable = ({
  heading,
  questions,
  introductionQuestions = [],
  smileyImage,
  landscape,
  showIntroduction = true,
}: Props) => {
  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
        orientation={landscape ? "landscape" : "portrait"}
      >
        {showIntroduction && (
          <ParticipantIntroduction questions={introductionQuestions} />
        )}

        <View style={styles.section}>
          {questions.length === 0 ? (
            <Text style={{ textAlign: "center" }}>No questions added</Text>
          ) : (
            <>
              <Text style={styles.heading}>{heading}</Text>

              {questions?.map((question, idx) => (
                <View
                  key={idx}
                  wrap={false}
                  style={[
                    styles.question,
                    {
                      // border width only if last question to avoid double border
                      borderBottomWidth: idx === questions.length - 1 ? 1 : 0,
                    },
                  ]}
                >
                  <View style={[styles.col, {}]}>
                    <Text>{question.text}</Text>
                    <Text style={styles.description}>
                      {question.description}
                    </Text>
                  </View>

                  <Image
                    style={[
                      styles.col,
                      {
                        width: "50%",
                        paddingLeft: "10px",
                        borderLeftWidth: "1px",
                        borderLeftColor: "#000",
                        borderLeftStyle: "solid",
                      },
                    ]}
                    src={smileyImage}
                  />
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};

export { TextQuestionTable };
