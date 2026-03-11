import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const docs = [
  {
    filename: "neural-networks-intro.pdf",
    title: "Introduction to Neural Networks",
    subject: "Machine Learning",
    sections: [
      {
        heading: "What is a Neural Network?",
        body: "A neural network is a computing system loosely modeled after the human brain. It consists of layers of interconnected nodes (neurons) that process data through forward propagation and refine their weights through backpropagation during training.",
      },
      {
        heading: "Key Concepts",
        body: "• Perceptron: A single-layer linear classifier that can separate linearly separable data.\n• Activation Functions: Non-linear functions applied at each node (ReLU, Sigmoid, Tanh).\n• Layers: Input layer, hidden layers, and output layer.\n• Backpropagation: Gradient-based algorithm that propagates error backwards to update weights.\n• Dropout: A regularization technique where random neurons are ignored during training to prevent overfitting.",
      },
      {
        heading: "Important Formulas",
        body: "Linear transformation:  z = Wx + b\nActivation:             a = f(z)\nCross-entropy loss:     L = -SUM y*log(y_hat)\nGradient descent:       W = W - a*(dL/dW)",
      },
      {
        heading: "Exam Topics",
        body: "1. Explain how backpropagation updates weights in a neural network.\n2. What is the role of activation functions and why are non-linear ones needed?\n3. Describe the difference between underfitting and overfitting.\n4. How does dropout prevent overfitting?\n5. Compare ReLU and Sigmoid activation functions.",
      },
    ],
  },
  {
    filename: "organic-chem-functional-groups.pdf",
    title: "Organic Chemistry: Functional Groups",
    subject: "Chemistry",
    sections: [
      {
        heading: "What Are Functional Groups?",
        body: "Functional groups are specific atoms or groups of atoms within a molecule that are responsible for its characteristic chemical reactions. They largely determine the physical and chemical properties of the molecule and allow chemists to predict reactivity.",
      },
      {
        heading: "Key Functional Groups",
        body: "• Alcohols (-OH): Polar, capable of hydrogen bonding, high boiling points relative to alkanes.\n• Aldehydes (-CHO): Oxidizable to carboxylic acids; found at the end of carbon chains.\n• Ketones (C=O): Carbonyl group flanked by two carbon atoms; not easily oxidized.\n• Carboxylic Acids (-COOH): Weak acids that can form esters and amides.\n• Amines (-NH2): Act as bases, can accept protons; important in amino acids.",
      },
      {
        heading: "Key Reactions",
        body: "Substitution:    R-OH + HBr -> R-Br + H2O\nEsterification:  R-COOH + R'-OH -> R-COO-R' + H2O\nOxidation:       R-CHO + [O] -> R-COOH",
      },
      {
        heading: "Exam Topics",
        body: "1. Identify functional groups from structural and condensed formulas.\n2. Predict the reactivity and polarity of a molecule based on its functional groups.\n3. Write the mechanism for esterification.\n4. Distinguish between aldehydes and ketones.\n5. Explain why alcohols have higher boiling points than alkanes of similar molecular weight.",
      },
    ],
  },
  {
    filename: "macro-gdp-fiscal-policy.pdf",
    title: "Macroeconomics: GDP and Fiscal Policy",
    subject: "Economics",
    sections: [
      {
        heading: "Gross Domestic Product (GDP)",
        body: "GDP is the total monetary value of all final goods and services produced within a country's borders during a specific period. It is the primary indicator of an economy's health and can be measured via the expenditure, income, or production approaches.",
      },
      {
        heading: "Components and Formulas",
        body: "Expenditure approach:  GDP = C + I + G + (X - M)\n  C  = Private consumption\n  I  = Business investment\n  G  = Government spending\n  X-M = Net exports (exports minus imports)\n\nFiscal Multiplier:  dY = Multiplier x dG\nMultiplier:         1 / (1 - MPC)\nBudget deficit:     G - T",
      },
      {
        heading: "Fiscal Policy",
        body: "• Expansionary Policy: Increase government spending or cut taxes to stimulate economic growth during recessions. Leads to higher deficits in the short run.\n• Contractionary Policy: Reduce spending or raise taxes to cool an overheating economy and curb inflation.\n• Crowding Out: Government borrowing can raise interest rates, displacing private investment.\n• Automatic Stabilizers: Built-in mechanisms (e.g., unemployment insurance) that moderate economic swings without new legislation.",
      },
      {
        heading: "Exam Topics",
        body: "1. Define and calculate GDP using the expenditure approach.\n2. Distinguish between nominal and real GDP.\n3. Explain the fiscal multiplier effect with an example.\n4. When should a government use expansionary vs. contractionary fiscal policy?\n5. What is crowding out and how does it limit fiscal policy effectiveness?",
      },
    ],
  },
  {
    filename: "data-structures-trees-graphs.pdf",
    title: "Data Structures: Trees and Graphs",
    subject: "Computer Science",
    sections: [
      {
        heading: "Trees",
        body: "A tree is a hierarchical, non-linear data structure with a root node and child nodes. Each node has exactly one parent (except the root). Trees are acyclic connected graphs.\n\n• Binary Tree: Each node has at most 2 children.\n• Binary Search Tree (BST): For every node, left subtree values < node value < right subtree values.\n• Balanced BST: Height is O(log n), ensuring efficient search, insert, and delete.",
      },
      {
        heading: "Graphs",
        body: "A graph G = (V, E) consists of vertices V and edges E connecting them. Graphs can be:\n• Directed (digraph) or Undirected\n• Weighted or Unweighted\n• Cyclic or Acyclic\n• Connected or Disconnected\n\nTrees are a special case of acyclic connected undirected graphs.",
      },
      {
        heading: "Key Algorithms",
        body: "BFS (Breadth-First Search):\n  - Uses a queue; explores level by level.\n  - Time: O(V + E)  Space: O(V)\n  - Use for: shortest path in unweighted graphs.\n\nDFS (Depth-First Search):\n  - Uses a stack (or recursion); explores as far as possible before backtracking.\n  - Time: O(V + E)  Space: O(V)\n  - Use for: cycle detection, topological sort.\n\nDijkstra's Algorithm:\n  - Finds shortest path in weighted graphs (non-negative weights).\n  - Time: O((V + E) log V) with a min-heap.",
      },
      {
        heading: "Exam Topics",
        body: "1. Perform in-order, pre-order, and post-order traversals on a given binary tree.\n2. Compare BFS and DFS and state when you would use each.\n3. Trace Dijkstra's algorithm on a small weighted graph.\n4. Detect a cycle in directed and undirected graphs.\n5. What is the time complexity of inserting into a balanced vs. unbalanced BST?",
      },
    ],
  },
];

async function buildPDF(doc) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 60;
  const pageWidth = 595;
  const pageHeight = 842;
  const contentWidth = pageWidth - margin * 2;

  function wrapText(text, font, size, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let current = "";
    for (const word of words) {
      const test = current ? current + " " + word : word;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) {
        current = test;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // ── Title page header ──────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: pageHeight - 90, width: pageWidth, height: 90, color: rgb(0.18, 0.27, 0.8) });
  page.drawText(doc.title, { x: margin, y: pageHeight - 52, size: 20, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText(`Subject: ${doc.subject}`, { x: margin, y: pageHeight - 74, size: 11, font, color: rgb(0.85, 0.9, 1) });
  y = pageHeight - 110;

  for (const section of doc.sections) {
    // Ensure enough space for heading
    if (y < margin + 60) {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Section heading
    y -= 12;
    page.drawText(section.heading, { x: margin, y, size: 14, font: boldFont, color: rgb(0.18, 0.27, 0.8) });
    y -= 6;
    page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 1, color: rgb(0.7, 0.75, 0.95) });
    y -= 14;

    // Body text — handle newlines and wrapping
    for (const rawLine of section.body.split("\n")) {
      const wrapped = wrapText(rawLine || " ", font, 10, contentWidth);
      for (const line of wrapped) {
        if (y < margin + 20) {
          page = pdf.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(line, { x: margin, y, size: 10, font, color: rgb(0.1, 0.1, 0.1) });
        y -= 14;
      }
    }
    y -= 10;
  }

  // Page numbers
  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    p.drawText(`${i + 1} / ${pages.length}`, {
      x: pageWidth / 2 - 15,
      y: 30,
      size: 9,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
  });

  return pdf.save();
}

for (const doc of docs) {
  const bytes = await buildPDF(doc);
  const outPath = resolve(__dirname, doc.filename);
  writeFileSync(outPath, bytes);
  console.log(`✅ Generated: ${doc.filename}`);
}
