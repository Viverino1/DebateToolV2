import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ArrowClockwise, ArrowCounterclockwise, Hr, ListOl, ListUl, Pen, Quote, TypeBold, TypeH1, TypeH2, TypeH3, TypeItalic, TypeStrikethrough, TypeUnderline } from 'react-bootstrap-icons';

import colors from "tailwindcss/colors";

const highlightColor = colors.neutral[700];

export default function TextBox(props: {onChange?: (content: string) => void}){
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({multicolor: true}),
      TextStyle,
      Color,
    ],
    content: '<p>Hello, World!</p>',
    onUpdate: ({editor}) => {
      if(props.onChange){
        props.onChange(editor.getHTML());
      }
    }
  });

  return (
    <div className='h-full space-y-4'>
        <div className='overflow-x-auto overflow-y-clip h-16 background p-2 flex items-center space-x-2'>
        <button 
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className={`h-10 aspect-square transition center background-light disabled:background`}>
            <ArrowCounterclockwise size={25}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className={`h-10 aspect-square transition center background-light disabled:background`}>
            <ArrowClockwise size={25}/>
          </button>

          <Divider/>

          <button 
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('bold')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <TypeBold size={30}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('italic')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <TypeItalic size={30}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('strike')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <TypeStrikethrough size={30}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('underline')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <TypeUnderline size={30}/>
          </button>

          <Divider/>

          <button 
          onClick={() => editor?.chain().focus().toggleHeading({level: 1}).run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleHeading({level: 1})
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('heading', { level: 1 })? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <TypeH1 size={25}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().toggleHeading({level: 2}).run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleHeading({level: 2})
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('heading', { level: 2 })? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <TypeH2 size={25}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().toggleHeading({level: 3}).run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleHeading({level: 3})
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('heading', { level: 3 })? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <TypeH3 size={25}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('blockquote')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <Quote size={25}/>
          </button>

          <Divider/>

          <button 
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('bulletList')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <ListUl size={25} className='translate-y-0.5'/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('orderedList')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <ListOl size={25} className='translate-y-0.5'/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          className={`h-10 aspect-square transition center background`}>
            <Hr size={25}/>
          </button>

          <Divider/>  

          <button 
          onClick={() => editor?.chain().focus().toggleHighlight({color: highlightColor}).run()}
          disabled={
            !editor?.can()
              .chain()
              .focus()
              .toggleHighlight({color: highlightColor})
              .run()
          }
          className={`h-10 aspect-square transition center ${editor?.isActive('highlight')? "!bg-primary !border-transparent !text-text-extraLight background" : "background"}`}>
            <Pen size={23}/>
          </button>

          <button 
          onClick={() => editor?.chain().focus().setColor(colors.red[500]).run()}
          className={`h-10 aspect-square transition center text-2xl text-primary background`}>
            A
          </button>

          <button 
          onClick={() => editor?.chain().focus().unsetColor().run()}
          className={`h-10 aspect-square transition center text-2xl text-text background`}>
            A
          </button>
        </div>
      
      <EditorContent className='h-full' editor={editor} />
    </div>  
  )
}

function Divider(){
  return(
    <div className='w-2 h-full center flex-col'>
      <span className='bg-gradient-to-t from-primary/50 rounded-full h-1/2 w-0.5'></span>
      <span className='bg-gradient-to-b from-primary/50 rounded-full h-1/2 w-0.5'></span>
    </div>
  )
}