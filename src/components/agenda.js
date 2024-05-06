import React, { useEffect } from "react";
import {
  AlignmentType,
  Document,
  ImageRun,
  LevelFormat,
  Numbering,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const Agenda = ({ title, presents, absent, image, data = [], actives }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  const createDocument = () => {
    const newDataParagraphs = data.flatMap((v) => [
      new Paragraph({
        children: [new TextRun(v.topic)],
        bullet: {
          level: 1, // Bullet list level, 0 is the first level
        },
        spacing: {
          before: 70,
          after: 70,
        },
      }),
      new Paragraph({
        children: [new TextRun("Public Comment / Vote")],
        bullet: {
          level: 2, // Bullet list level, 0 is the first level
        },
        spacing: {
          before: 70,
          after: 70,
        },
      }),
    ]);

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: image, // Your base64 image string
                  transformation: {
                    width: 100,
                    height: 100,
                  },
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "MICHIGAN CITY PARK BOARD",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Meeting Agenda, Wednesday, _____, 2024 at 5 p.m.",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "City Hall in the Council Chambers (lower level)",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "100 E. Michigan Blvd., Michigan City, IN 46360",
                  bold: true,
                  size: 25,
                }),
              ],
              spacing: {
                after: 500,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t1. Pledge of Allegiance\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t2. Roll Call\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t3. Minutes of Previous Meeting (________, 2024)\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t4. Project Updates\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t5. Old Business\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t6. Tabled Business\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t7. New Business\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            ...newDataParagraphs,

            new Paragraph({
              children: [
                new TextRun({
                  text: "\t8. Reports of Officers\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),

            new Paragraph({
              children: [new TextRun("Superintendent’s Report")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),
            new Paragraph({
              children: [new TextRun("Vandalism Report")],
              bullet: {
                level: 2, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "\t9. Planning Commission Liaison Report – Mr. Latchford\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t10. Port Authority Liaison Report – Mr. Freese\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t11. Michigan City Zoological Society Liaison Report – Mr. Glidden\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t12. Attorney’s Report\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t13. Director Reports\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t14. Department Finances\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),

            new Paragraph({
              children: [new TextRun("City Claims")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),
            new Paragraph({
              children: [new TextRun("Payroll No. ___")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),
            new Paragraph({
              children: [new TextRun("Reports of Gifts and Donations")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),
            new Paragraph({
              children: [new TextRun("Minor Transfers")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),
            new Paragraph({
              children: [new TextRun("Zoo Endowment Bills")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),
            new Paragraph({
              children: [new TextRun("Board of Works Bills")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),
            new Paragraph({
              children: [new TextRun("Credit Card Charges")],
              bullet: {
                level: 1, // Bullet list level, 0 is the first level
              },
              spacing: {
                before: 70,
                after: 70,
              },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "\t15. Comments from the Public\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t16. Comments from the Park Board\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\t17. Adjourn\n",
                  size: 24,
                }),
              ],
              spacing: {
                after: 100,
                before: 100,
              },
            }),

            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({
              children: [
                new TextRun({
                  text: "DATE AND TIME OF NEXT PARK BOARD MEETING:  Wednesday, ______, 2024 at 5 p.m.",
                  size: 24,
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Use Packer to generate a blob from the document
    Packer.toBlob(doc).then((blob) => {
      // Save the document using FileSaver
      saveAs(blob, title + ".docx");
    });
  };

  return (
    <Button onClick={createDocument} variant="contained" color="secondary">
      Create {title} Document
    </Button>
  );
};

export default Agenda;
