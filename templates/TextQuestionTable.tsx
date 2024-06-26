import smileyImage from "@/public/smiley-o-meter.jpg";
import thumbsImage from "@/public/thumbs.jpg";
import wordsImage from "@/public/words.jpg";
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
  baseQuestions: IBaseQuestion[];
  introductionQuestions?: IIntroductionQuestion[];
  landscape?: boolean;
  showIntroduction?: boolean;
  fileId: string;
  imageBase64Data?: string[];
}

// Create Document Component
const TextQuestionTable = ({
  heading,
  baseQuestions,
  introductionQuestions = [],
  landscape,
  showIntroduction = true,
  fileId,
  imageBase64Data,
}: Props) => {
  const getImageSrc = (question: IBaseQuestion) => {
    return question.ratingType === "smilies"
      ? smileyImage.src
      : question.ratingType === "thumbs"
        ? thumbsImage.src
        : wordsImage.src;
  };

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
          {baseQuestions.length === 0 ? (
            <Text style={{ textAlign: "center" }}>No questions added</Text>
          ) : (
            <>
              <Text style={styles.heading}>{heading}</Text>

              {baseQuestions?.map((question, idx) => (
                <View
                  key={idx}
                  wrap={false}
                  style={[
                    styles.question,
                    {
                      // border width only if last question to avoid double border
                      borderBottomWidth:
                        idx === baseQuestions.length - 1 ? 1 : 0,
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
                    src={
                      imageBase64Data
                        ? imageBase64Data[idx]
                        : getImageSrc(question)
                    }
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
