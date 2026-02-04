export interface NoteProps {
  name: string;
  text: string;
  color: string;
  date: string;
  className?: string;
  onClick?: () => void;
}
