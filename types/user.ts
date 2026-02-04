export interface User {
  id: string;
  name: string;
  text: string;
  color: string;
  date?: string;

  setName: (value: string) => void;
  setText: (value: string) => void;
  setColor: (value: string) => void;
}
