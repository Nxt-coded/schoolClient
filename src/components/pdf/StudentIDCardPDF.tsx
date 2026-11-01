import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },
  card: {
    width: 170,
    height: 240,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    color: "#1e293b",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  header: {
    padding: 12,
    backgroundColor: "#0f172a",
    color: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  schoolInfo: {
    flexDirection: "column",
    alignItems: "center",
  },
  schoolName: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  idTag: {
    fontSize: 7,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 2,
  },
  body: {
    paddingTop: 15,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  infoSection: {
    alignItems: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
    color: "#0f172a",
    textAlign: "center",
  },
  className: {
    fontSize: 9,
    color: "#2563eb", // Professional Blue
    marginBottom: 8,
    fontWeight: "medium",
  },
  enrollmentLabel: {
    fontSize: 6.5,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 1,
  },
  enrollmentID: {
    fontSize: 10,
    color: "#1e293b",
    fontWeight: "bold",
  },
  qrSection: {
    alignItems: "center",
    marginTop: 10,
  },
  qrCode: {
    width: 75,
    height: 75,
    backgroundColor: "#ffffff",
    padding: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  footer: {
    padding: 6,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  sessionInfo: {
    fontSize: 7,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});

interface Student {
  _id: string;
  studentFirstName: string;
  studentLastName: string;
  classAssigned: string;
  enrollmentID: string;
  avatar?: string;
  schoolName?: string;
  schoolIDs?: string;
}

interface Props {
  students: Student[];
  qrCodes: { [key: string]: string }; // Map of student ID to QR data URL
}

const chunkArray = (arr: any[], size: number) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
};

const StudentIDCardPDF = ({ students, qrCodes }: Props) => {
  const studentChunks = chunkArray(students, 9); // 3x3 = 9 cards per page

  return (
    <Document>
      {studentChunks.map((chunk, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.cardContainer}>
            {chunk.map((student) => (
              <View key={student._id} style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                  <View style={styles.schoolInfo}>
                    <Text style={styles.schoolName}>
                      {student.schoolName || student.schoolIDs || "SCHOOL"}
                    </Text>
                    <Text style={styles.idTag}>STUDENT ID CARD</Text>
                  </View>
                </View>

                <View style={styles.body}>
                  <View style={styles.infoSection}>
                    <Text style={styles.name}>
                      {student.studentFirstName} {student.studentLastName}
                    </Text>
                    <Text style={styles.className}>
                      {student.classAssigned || "Student"}
                    </Text>
                    <View>
                      <Text style={styles.enrollmentLabel}>Enrollment ID</Text>
                      <Text style={styles.enrollmentID}>{student.enrollmentID}</Text>
                    </View>
                  </View>
                </View>

                {/* QR Section */}
                <View style={styles.qrSection}>
                  {qrCodes[student._id] ? (
                    <Image style={styles.qrCode} src={qrCodes[student._id]} />
                  ) : (
                    <View style={[styles.qrCode, { backgroundColor: "#eee" }]} />
                  )}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                  <Text style={styles.sessionInfo}>Academic Session</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default StudentIDCardPDF;
