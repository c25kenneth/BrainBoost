brainboost/
├── app/ # Next.js App Router
│ ├── (auth)/ # Auth route group
│ │ ├── login/page.tsx
│ │ └── signup/page.tsx
│ ├── dashboard/
│ │ ├── page.tsx # Dashboard home (Server Component)
│ │ └── layout.tsx
│ ├── notes/
│ │ ├── page.tsx # Notes list (Server Component)
│ │ ├── [id]/page.tsx # Individual note/summary view
│ │ ├── new/page.tsx # Create note (PDF upload or text input)
│ │ └── actions.ts # Server Actions: create, delete, update
│ ├── api/
│ │ ├── auth/
│ │ │ └── [...all]/route.ts # BetterAuth catch-all handler
│ │ ├── upload/
│ │ │ └── route.ts # PDF binary upload handler
│ │ └── ai/
│ │ └── summarize/route.ts # Streaming Gemini summarization
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx # Landing page
│
├── components/
│ ├── ui/ # Primitives
│ │ ├── Button.tsx
│ │ ├── Card.tsx
│ │ └── Modal.tsx
│ ├── notes/
│ │ ├── UploadZone.tsx # PDF drag-and-drop
│ │ ├── TextInputZone.tsx # Paste/type notes
│ │ ├── SummaryCard.tsx # AI summary display
│ │ ├── ConceptsList.tsx # Key concepts
│ │ └── NotesList.tsx # Grid of past notes
│ └── layout/
│ ├── Navbar.tsx
│ └── Sidebar.tsx
│
├── lib/
│ ├── mongodb.ts # MongoDB connection singleton
│ ├── auth.ts # BetterAuth server config
│ ├── auth-client.ts # BetterAuth browser client
│ ├── gemini.ts # Gemini API wrapper
│ └── pdfParser.ts # PDF → raw text (pdf-parse)
│
├── models/
│ ├── User.ts
│ └── Note.ts # Source text + Gemini output
│
├── hooks/
│ ├── useNotes.ts
│ └── useUpload.ts
│
├── types/
│ └── index.ts
│
├── public/
├── .env.local
├── next.config.ts
├── package.json
└── tsconfig.json
