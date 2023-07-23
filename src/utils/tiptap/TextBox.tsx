import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function TextBox(){
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World!</p>',
    onUpdate: ({editor}) => {
      console.log(editor.getHTML());
    }
  })

  return (
    <EditorContent editor={editor} />
  )
}