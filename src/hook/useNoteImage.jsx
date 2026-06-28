import { useCallback } from "react";

export default function useNoteImage({ editor }) {
  const insertImage = useCallback(
    (file) => {
      if (!file || !editor) return;
      if (!file.type.startsWith("image/")) return;
      editor
        .chain()
        .focus()
        .setImage({ src: URL.createObjectURL(file) })
        .run();
    },
    [editor],
  );

  // input[type=file] upload
  const handleImageUpload = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      insertImage(file);
      e.target.value = "";
    },
    [insertImage],
  );

  // drag over — just allow the drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  // drop
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      insertImage(file);
    },
    [insertImage],
  );

  return { handleImageUpload, handleDragOver, handleDrop };
}
