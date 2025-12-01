// config/fileValidation.ts

// Allowed document types
export const DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

// Allowed image types
export const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const ALLOWED_MIME_TYPES = [...DOCUMENT_MIME_TYPES, ...IMAGE_MIME_TYPES];

// 10MB max for images/documents
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
