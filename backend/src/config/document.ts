// types/document.ts
// src/types/document.types.ts
export type AllowedFileType = 'document' | 'image' | 'other';

export interface CreateDocumentInput {
  fileName: string;
  originalName: string;
  filePath: string;
  mimeType: string;
  size: number;
  fileType: AllowedFileType;
  uploadedBy: number;
}

export interface DocumentType extends CreateDocumentInput {
  id: number;
  uploadedAt: Date;
}
