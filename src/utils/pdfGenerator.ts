import { SavedListItem } from '../context/MyListContext';

export interface PdfExportPayload {
  title: string;
  description: string;
  themeItems: SavedListItem[];
  animationItems: SavedListItem[];
  origin?: string;
}

/**
 * Sanitizes a user-defined list title into a safe, lowercase `.pdf` filename.
 */
export function sanitizePdfFilename(rawTitle: string): string {
  const trimmed = rawTitle.trim();
  if (!trimmed) {
    return 'my-design-list.pdf';
  }
  const slug = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]+/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 64);

  return `${slug || 'my-design-list'}.pdf`;
}

/**
 * Escapes characters for PDF literal strings `( ... )` and normalizes non-ASCII punctuation.
 */
function escapePdfText(input: string): string {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u2022/g, '*')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Wraps text into lines of at most `maxChars` characters, breaking on spaces or URL slashes/hyphens.
 */
function wrapText(text: string, maxChars: number): string[] {
  const paragraphs = text.replace(/\r\n/g, '\n').split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) {
      lines.push('');
      continue;
    }

    const words = trimmed.split(/\s+/);
    let currentLine = '';

    for (const word of words) {
      if (word.length > maxChars) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }
        for (let i = 0; i < word.length; i += maxChars) {
          lines.push(word.slice(i, i + maxChars));
        }
        continue;
      }

      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (candidate.length <= maxChars) {
        currentLine = candidate;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines.length > 0 ? lines : [''];
}

interface PdfLinkAnnotation {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  uri: string;
}

interface PdfPageCommand {
  ops: string[];
  links: PdfLinkAnnotation[];
}

/**
 * Generates a standards-compliant multi-page PDF 1.4 document (`%PDF-1.4`)
 * from the current My List state, with clickable "Visit Theme" and "Visit Animation/Effect" hyperlinks.
 */
export function buildMyListPdfBytes(payload: PdfExportPayload): Uint8Array {
  const pageWidth = 595.28; // A4 width in pt
  const pageHeight = 841.89; // A4 height in pt
  const marginX = 50;
  const topY = pageHeight - 54;
  const bottomLimitY = 66;

  const effectiveTitle = payload.title.trim() || 'My Design List';
  const cleanDescription = payload.description.trim();
  const origin =
    payload.origin ||
    (typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'http://127.0.0.1:5173');

  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const pages: PdfPageCommand[] = [{ ops: [], links: [] }];
  let cursorY = topY;

  const currentPage = () => pages[pages.length - 1];

  const startNewPage = () => {
    pages.push({ ops: [], links: [] });
    cursorY = topY;
  };

  const ensureSpace = (neededPt: number) => {
    if (cursorY - neededPt < bottomLimitY) {
      startNewPage();
    }
  };

  const addTextLine = (
    text: string,
    x: number,
    y: number,
    font: 'F1' | 'F2' | 'F3',
    size: number,
    gray = 0
  ) => {
    const safe = escapePdfText(text);
    currentPage().ops.push(
      `BT /${font} ${size} Tf ${gray.toFixed(2)} g ${x.toFixed(2)} ${y.toFixed(
        2
      )} Td (${safe}) Tj ET`
    );
  };

  const addHyperlinkLine = (
    label: string,
    uri: string,
    x: number,
    y: number,
    size = 9.5
  ) => {
    addTextLine(label, x, y, 'F2', size, 0.12);
    // Approximate width of Helvetica-Bold text in points (~0.54 * fontSize per char)
    const approxWidth = Math.max(48, label.length * size * 0.54);
    // Draw subtle underline beneath hyperlink text
    currentPage().ops.push(
      `0.60 w 0.12 G ${x.toFixed(2)} ${(y - 1.8).toFixed(2)} m ${(x + approxWidth).toFixed(
        2
      )} ${(y - 1.8).toFixed(2)} l S`
    );
    currentPage().links.push({
      x1: x,
      y1: y - 3,
      x2: x + approxWidth,
      y2: y + size + 2,
      uri,
    });
  };

  const addHorizontalRule = (y: number, lineWidth = 0.75, gray = 0.15) => {
    currentPage().ops.push(
      `${lineWidth.toFixed(2)} w ${gray.toFixed(2)} G ${marginX.toFixed(2)} ${y.toFixed(
        2
      )} m ${(pageWidth - marginX).toFixed(2)} ${y.toFixed(2)} l S`
    );
  };

  // 1. Document Masthead
  addTextLine('THEMELAB — DESIGN REFERENCE LIST', marginX, cursorY, 'F2', 9, 0.35);
  addTextLine(`Generated: ${dateStr}`, pageWidth - marginX - 115, cursorY, 'F1', 9, 0.35);
  cursorY -= 12;
  addHorizontalRule(cursorY, 1.2, 0.05);
  cursorY -= 28;

  // 2. List Title
  const titleLines = wrapText(effectiveTitle, 48);
  for (const tLine of titleLines) {
    ensureSpace(26);
    addTextLine(tLine, marginX, cursorY, 'F2', 20, 0.05);
    cursorY -= 24;
  }
  cursorY -= 4;

  // 3. Optional Description (Only included when non-empty)
  if (cleanDescription.length > 0) {
    const descLines = wrapText(cleanDescription, 78);
    for (const dLine of descLines) {
      ensureSpace(16);
      addTextLine(dLine, marginX, cursorY, 'F1', 10.5, 0.22);
      cursorY -= 15;
    }
    cursorY -= 8;
  }

  addHorizontalRule(cursorY, 0.5, 0.5);
  cursorY -= 22;

  // Helper to render a section (~ Themes ~ or ~ Animations / Effects ~)
  const renderSection = (sectionHeading: string, sectionItems: SavedListItem[]) => {
    if (sectionItems.length === 0) return;

    ensureSpace(44);
    addTextLine(sectionHeading, marginX, cursorY, 'F2', 13, 0.05);
    cursorY -= 8;
    addHorizontalRule(cursorY, 0.75, 0.2);
    cursorY -= 18;

    sectionItems.forEach((item, index) => {
      const commentTrimmed = item.comment.trim();
      const commentLines =
        commentTrimmed.length > 0 ? wrapText(`Comment: "${commentTrimmed}"`, 74) : [];
      const fullUrl = `${origin}${item.route}`;
      const linkLabel =
        item.itemType === 'theme' ? 'Visit Theme' : 'Visit Animation/Effect';

      // Calculate total block height so an item's heading is not split from its comment/link
      const estimatedHeight =
        18 + // Title line
        (item.category ? 14 : 0) + // Category line below name
        commentLines.length * 14 +
        14 + // Hyperlink line
        14; // Bottom spacing

      if (cursorY - estimatedHeight < bottomLimitY && estimatedHeight < topY - bottomLimitY) {
        startNewPage();
      }

      const itemHeader = `${index + 1}. ${item.name}`;
      const headerLines = wrapText(itemHeader, 72);
      for (const hLine of headerLines) {
        ensureSpace(16);
        addTextLine(hLine, marginX, cursorY, 'F2', 11, 0.05);
        cursorY -= 15;
      }

      if (item.category) {
        ensureSpace(14);
        addTextLine(item.category, marginX + 14, cursorY, 'F1', 9.5, 0.35);
        cursorY -= 14;
      }

      if (commentLines.length > 0) {
        for (const cLine of commentLines) {
          ensureSpace(15);
          addTextLine(cLine, marginX + 14, cursorY, 'F3', 10, 0.18);
          cursorY -= 14;
        }
      }

      ensureSpace(14);
      addHyperlinkLine(linkLabel, fullUrl, marginX + 14, cursorY, 9.5);
      cursorY -= 13;

      cursorY -= 10;
    });

    cursorY -= 10;
  };

  if (payload.themeItems.length === 0 && payload.animationItems.length === 0) {
    ensureSpace(30);
    addTextLine(
      'No themes or animations have been added to this list yet.',
      marginX,
      cursorY,
      'F3',
      11,
      0.35
    );
    cursorY -= 20;
  } else {
    renderSection('~ Themes ~', payload.themeItems);
    renderSection('~ Animations / Effects ~', payload.animationItems);
  }

  // Add page numbers to every page footer
  const totalPages = pages.length;
  pages.forEach((p, idx) => {
    const footerY = 36;
    p.ops.push(
      `0.50 w 0.65 G ${marginX.toFixed(2)} ${(footerY + 12).toFixed(2)} m ${(
        pageWidth - marginX
      ).toFixed(2)} ${(footerY + 12).toFixed(2)} l S`
    );
    const label = `ThemeLab Reference List  |  Page ${idx + 1} of ${totalPages}`;
    p.ops.push(
      `BT /F1 8.5 Tf 0.40 g ${marginX.toFixed(2)} ${footerY.toFixed(2)} Td (${escapePdfText(
        label
      )}) Tj ET`
    );
  });

  // Assemble PDF 1.4 objects
  // Object 1: Catalog
  // Object 2: Pages
  // Object 3: Font F1 (Helvetica)
  // Object 4: Font F2 (Helvetica-Bold)
  // Object 5: Font F3 (Helvetica-Oblique)
  // Objects 6..: Page, Content stream, and Link Annotation objects
  const objects: string[] = [];

  const pageObjIds: number[] = [];
  let nextObjId = 6;

  const pageEntries: {
    pageId: number;
    contentId: number;
    annotIds: number[];
    links: PdfLinkAnnotation[];
    stream: string;
  }[] = pages.map((p) => {
    const pageId = nextObjId++;
    const contentId = nextObjId++;
    const annotIds = p.links.map(() => nextObjId++);
    pageObjIds.push(pageId);
    return {
      pageId,
      contentId,
      annotIds,
      links: p.links,
      stream: p.ops.join('\n'),
    };
  });

  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  objects.push(
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjIds
      .map((id) => `${id} 0 R`)
      .join(' ')}] /Count ${pageObjIds.length} >>\nendobj`
  );
  objects.push(
    '3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj'
  );
  objects.push(
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj'
  );
  objects.push(
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj'
  );

  for (const entry of pageEntries) {
    const annotsPart =
      entry.annotIds.length > 0
        ? ` /Annots [${entry.annotIds.map((id) => `${id} 0 R`).join(' ')}]`
        : '';

    objects.push(
      `${entry.pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(
        2
      )} ${pageHeight.toFixed(
        2
      )}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${
        entry.contentId
      } 0 R${annotsPart} >>\nendobj`
    );
    objects.push(
      `${entry.contentId} 0 obj\n<< /Length ${entry.stream.length} >>\nstream\n${entry.stream}\nendstream\nendobj`
    );
    entry.links.forEach((lnk, idx) => {
      const annotId = entry.annotIds[idx];
      objects.push(
        `${annotId} 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${lnk.x1.toFixed(
          2
        )} ${lnk.y1.toFixed(2)} ${lnk.x2.toFixed(2)} ${lnk.y2.toFixed(
          2
        )}] /Border [0 0 0] /A << /Type /Action /S /URI /URI (${escapePdfText(
          lnk.uri
        )}) >> >>\nendobj`
      );
    });
  }

  let pdfText = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdfText.length);
    pdfText += `${obj}\n`;
  }

  const xrefOffset = pdfText.length;
  pdfText += `xref\n0 ${objects.length + 1}\n`;
  pdfText += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    const off = String(offsets[i]).padStart(10, '0');
    pdfText += `${off} 00000 n \n`;
  }

  pdfText += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const encoder = new TextEncoder();
  return encoder.encode(pdfText);
}

/**
 * Triggers a browser file download of the generated PDF document.
 */
export function downloadMyListAsPdf(payload: PdfExportPayload): string {
  const bytes = buildMyListPdfBytes(payload);
  const filename = sanitizePdfFilename(payload.title);
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1500);

  return filename;
}
