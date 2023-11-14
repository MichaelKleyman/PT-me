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
  clinicId: number;
  insurance: string;
  appointments: {
    id: number;
    clinicId: number;
    patientId: number;
    start?: Date | undefined;
    end?: Date | undefined;
  }[];
  createdAt?: Date | undefined;
}

export interface Appointment {
  id: number;
  clinicId: number;
  patientId: number;
  start?: Date | undefined;
  end?: Date | undefined;
}

export interface Appointments {
  id: number;
  clinicId: number;
  patientId: number;
  start?: Date | undefined;
  end?: Date | undefined;
  patient: {
    id: number;
    title: string;
  };
}

export interface ExerciseData {
  id: number;
  map: any;
  name: string;
  injuryId: number;
  videoLink: string;
  tips: string;
  description: string;
  musclesWorked: string;
}

export interface Credential {
  id: number;
  ex_id: number;
  clinicName: string;
  editorName: string;
  editedFields: { [fieldName: string]: string }[];
  comments: { comment: string; clinicName: string }[];
  createdAt: string;
}

export interface Clinic {
  id: number;
  email: string;
  clinicName: string;
  address: string;
}
