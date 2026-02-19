"use client";

import { RichUtils, EditorState, Modifier, AtomicBlockUtils } from "draft-js";

export default function DraftToolbar({ editorState, setEditorState }) {
  // Toggle Inline styles
  const toggleInline = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Toggle Block types
  const toggleBlock = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Add Hyperlink
  const addLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;

    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newState, selection, entityKey));
  };

  // Add Image
const addImage = () => {
  const url = prompt("Enter image URL");
  if (!url) return;

  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", { src: url });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, "");
  setEditorState(newState);
};

  return (
    <div className="flex flex-wrap gap-2 mb-2 bg-gray-100 p-2 rounded">
      {/* Inline styles */}
      <button type="button" onClick={() => toggleInline("BOLD")} className="px-2 py-1 border rounded font-bold">B</button>
      <button type="button" onClick={() => toggleInline("ITALIC")} className="px-2 py-1 border rounded italic">I</button>
      <button type="button" onClick={() => toggleInline("UNDERLINE")} className="px-2 py-1 border rounded underline">U</button>
      <button type="button" onClick={() => toggleInline("STRIKETHROUGH")} className="px-2 py-1 border rounded line-through">S</button>

      {/* Block styles */}
      <button type="button" onClick={() => toggleBlock("unordered-list-item")} className="px-2 py-1 border rounded">UL</button>
      <button type="button" onClick={() => toggleBlock("ordered-list-item")} className="px-2 py-1 border rounded">OL</button>
      <button type="button" onClick={() => toggleBlock("blockquote")} className="px-2 py-1 border rounded">❝</button>
      <button type="button" onClick={() => toggleBlock("code-block")} className="px-2 py-1 border rounded">{"</>"}</button>

      {/* Link & Image */}
      <button type="button" onClick={addLink} className="px-2 py-1 border rounded">Link</button>
      <button type="button" onClick={addImage} className="px-2 py-1 border rounded">Image</button>
    </div>
  );
}
