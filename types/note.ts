export interface NoteProps {
  name: string;
  text: string;
  color: string;
  className?: string;
  onClick?: () => void;
}
