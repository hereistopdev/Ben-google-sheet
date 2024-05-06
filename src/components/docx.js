import React, { useEffect } from "react";
import {
  AlignmentType,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const Docx = ({ title, presents, absent, image, data = [], actives }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  const createDocument = () => {
    console.log(data);
    data.map((v) => console.log(v));

    const newDataParagraphs = data.map((v) => {
      const temp =
        v.activeStatus === 3
          ? "removed the " + v.topic + " from the table"
          : actives[v.activeStatus] + " the " + v.topic;
      return new Paragraph({
        text:
          "On a motion made by " +
          presents[v.mentioned] +
          ", seconded by " +
          presents[v.seconded] +
          " and voted for unanimously by the Board, the Board " +
          temp +
          ".",
        bullet: {
          level: 0, // Bullet list level, 0 is the first level
        },
        spacing: {
          after: 100,
        },
      });
    });

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
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "100 E. Michigan Blvd. / Suite 2",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Michigan City, IN 46360-3293",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Phone (219) 873-1506",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Fax (219) 873-1506",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "www.michigancityparks.com",
                  bold: true,
                  size: 25,
                }),
              ],
            }),
            new Paragraph(""),
            new Paragraph({
              children: [
                new TextRun({
                  text: "The Michigan City Park and Recreation Board met ",
                  bold: true,
                  size: 24,
                }),
                new TextRun({
                  text: "in regular session on Wednesday, February 7th, 2024, at the hour of 5:00 P.M. in the Council Chambers at City Hall, City of Michigan City, Indiana.",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph(""),
            new Paragraph({
              text: "The Pledge of Allegiance was recited.",
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph(""),
            new Paragraph({
              text: "On the call of the roll, the following Board Members were found to be present or absent:",
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph(""),
            new Paragraph({
              children: [
                new TextRun({
                  text:
                    "Present : " +
                    presents.join(",") +
                    "  ( " +
                    presents.length +
                    " )",
                  bold: true,
                  size: 25,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text:
                    "Absent : " +
                    absent.join(",") +
                    "  ( " +
                    absent.length +
                    " )",
                  bold: true,
                  size: 25,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: {
                after: 100,
                before: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  bold: true,
                  text: "Also present were ",
                }),
                new TextRun({
                  text: " Shannon Eason, Superintendent; William Walker, Assistant Superintendent; Laura Nirenberg, Park Board Attorney; Pat Voltz, Maintenance Director; Bryant Dabney, City Council Liaison; Drew White, ALCO TV; Bruce Manner, Port Authority; Kyle Petter, City Planning; Victor Tieri, Harbor Country Adventures; Eric Willliams, Special Events; Terry Greetham, Special Events; Larry Spaeth, Dunescape; Scott Miller, CVB; Marty Niemann, Golf Manager; and Rick Wright, CVB.",
                }),
              ],
              spacing: {
                before: 100,
                after: 200,
              },
            }),
            ...newDataParagraphs,
            data.map((v) => {
              console.log(v);
              return new Paragraph({
                text:
                  "On a motion made by " +
                  // v.mentioned +
                  ", seconded by " +
                  // v.seconded +
                  " and voted for unanimously by the Board, the Board " +
                  // actives[v.activeStatus] +
                  " the ",
                // v.topic,
                bullet: {
                  level: 0, // Bullet list level, 0 is the first level
                },
                spacing: {
                  after: 100,
                },
              });
            }),
            // new Paragraph({
            //   text: "On a motion made by Mr. Glidden, seconded by Mrs. Sperling and voted for unanimously by the Board, the Board approved the Harbor Country Adventures Request to Place a Stage and Concession Stand at Millennium Plaza, contingent on the City’s Engineers approval of the design.",
            //   bullet: {
            //     level: 0,
            //   },
            //   spacing: {
            //     after: 100,
            //   },
            // }),
            // new Paragraph({
            //   text: "Superintendent Shannon Eason reported that the Park and Recreation Department has resumed regular department head meetings twice a month, talked about being on the YMCA Advisory Committee, met with Sunset Grill to discuss the years operations and events, plans to present the 2023 Annual Report to the next board meeting, seeking further funding for the Fedder’s Alley Park Project, working on parking solutions at Patriot Park and the beach, touched on the current status of the Millenium Plaza Fountain project, announced that Golf Maintenance will take a training trip to Fort Wayne next month, and announced that all Park departments are currently in the hiring process for seasonal staff. ",
            //   spacing: {
            //     before: 150,
            //     after: 150,
            //   },
            // }),
            // new Paragraph({
            //   text: " Assistant Superintendent William Walker reported an update on Pantries in the Park, gave an update on the adult basketball league, and an update on baseball sign ups. The Recreation department plans to present two Easter events to the board at the next meeting.",
            //   spacing: {
            //     before: 150,
            //     after: 150,
            //   },
            // }),
            // new Paragraph({
            //   text: "Director of Park Maintenance Pat Voltz reported Park Maintenance’s January update which included their snow removal impact, wrapping up Christmas lights for the year, and announced that they are looking to hire twenty seasonal employees.",
            //   spacing: {
            //     before: 150,
            //     after: 150,
            //   },
            // }),
            // new Paragraph({
            //   text: "Assistant Events Coordinator Eric Williams gave a report on the special events that are lined up for the year. Each event is growing as they should. ",
            //   spacing: {
            //     before: 150,
            //     after: 150,
            //   },
            // }),

            // new Paragraph({
            //   text: "On a motion made by Mr. Hoffman, seconded by Mrs. Sperling and voted for unanimously by the Board, the Board approved the minutes of the January 17th, 2024, Board meeting.",
            //   bullet: {
            //     level: 0, // Bullet list level, 0 is the first level
            //   },
            //   spacing: {
            //     after: 100,
            //   },
            // }),
            // new Paragraph({
            //   text: "On a motion made by Mr. Glidden, seconded by Mrs. Sperling and voted for unanimously by the Board, the Board approved the Harbor Country Adventures Request to Place a Stage and Concession Stand at Millennium Plaza, contingent on the City’s Engineers approval of the design.",
            //   bullet: {
            //     level: 0,
            //   },
            //   spacing: {
            //     after: 100,
            //   },
            // }),

            // new Paragraph({
            //   text: "On a motion made by Mr. Hoffman, seconded by Mrs. Sperling and voted for unanimously by the Board, the Board approved the minutes of the January 17th, 2024, Board meeting.",
            //   bullet: {
            //     level: 0, // Bullet list level, 0 is the first level
            //   },
            //   spacing: {
            //     after: 100,
            //   },
            // }),
            // new Paragraph({
            //   text: "On a motion made by Mr. Glidden, seconded by Mrs. Sperling and voted for unanimously by the Board, the Board approved the Harbor Country Adventures Request to Place a Stage and Concession Stand at Millennium Plaza, contingent on the City’s Engineers approval of the design.",
            //   bullet: {
            //     level: 0,
            //   },
            //   spacing: {
            //     after: 100,
            //   },
            // }),
            new Paragraph({
              text: "________________________________",
              alignment: AlignmentType.RIGHT,
              spacing: {
                before: 500,
              },
            }),
            new Paragraph({
              spacing: {
                after: 500,
              },
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "William Walker, Assistant Superintendent",
                }),
              ],
            }),
            new Paragraph({
              text: "________________________________",
              alignment: AlignmentType.RIGHT,
              spacing: {
                before: 500,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Tim Glidden, Park Board Secretary",
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: {
                after: 500,
              },
            }),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({
              text: "Minutes prepared by William Walker",
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
    <Button onClick={createDocument} variant="contained">
      Create {title} Document
    </Button>
  );
};

export default Docx;
