export interface Patient {
  id: number;
  title: string;
  address: string;
  gender: string;
  phoneNumber: string;
  email: string;
  reasonForVisit: string;
  age: string;
  injuryId: number;
  insurance: string;
  start?: Date | undefined;
  end?: Date | undefined;
}

export interface ExerciseData {
  id: number;
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
  tips: String;
  description: String;
  musclesWorked: String;
}

export interface Credential {
  id: number;
  ex_id: number;
  clinicName: string;
  editorName: string;
  editedFields: { [fieldName: string]: string }[];
  comments: string[];
  createdAt: string;
}

export interface Clinic {
  id: number;
  email: string;
  clinicName: string;
  address: string;
}
