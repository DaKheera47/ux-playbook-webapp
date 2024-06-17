import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  col: {
    width: "50%",
    padding: 10,
  },
});

interface Props {
  heading: string;
  questions: IQuestion[];
  smileyImage: string;
  landscape?: boolean;
}

// Create Document Component
const TextQuestionTable = ({
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
              <View
                key={idx}
                style={[
                  styles.question,
                  {
                    // border width only if last question to avoid double border
                    borderBottomWidth: idx === questions.length - 1 ? 1 : 0,
                  },
                ]}
                wrap={false}
              >
                <Text style={[styles.col, {}]}>{question.text}</Text>

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
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export { TextQuestionTable };
