import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Link,
  Font,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
      backgroundColor: "#e9ebe6",
      color: "#080807",
      padding: 16
  },
  section: {
      borderRadius: 4,
      backgroundColor: "#d1d6c7",
      padding: 8,
      margin: 8,
  },
  title: {
      fontSize: 16,
  },
  evidence: {
      fontSize: 12,
      borderRadius: 4,
      borderColor: "#373b30",
      padding: 8,
  },
  link: {
      fontSize: 12,
      marginBottom: 4,
      color: '#373b30',
  },
  logo: {
      width: 50,
  },
  header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
  },
  contentionText: {
      fontSize: 16,
      color: "#e9ebe6"
  },
  contentionSection: {
      borderRadius: 4,
      backgroundColor: "#545b49",
      padding: 8,
      margin: 8,
  }
});

// Create Document Component
const RenderCase = () => {
  return (
    <PDFViewer className="w-full h-full">
      <Document>
          <Page size="A4" style={styles.page}>
              <View style={styles.header}>
                  <Image src="./DebateToolLogo.png" style={styles.logo}></Image>
                  <Text>Debate Tool</Text>
              </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default RenderCase;