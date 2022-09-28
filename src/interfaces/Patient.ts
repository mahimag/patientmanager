export interface Patient {
  id: string;
  firstname: string;
  lastname: string;
  number: string;
  email: string;
  address: string;
  photo: string | string[];
  isFav: boolean | boolean[];
  userId: string;
}

export type PatientToUpdate = Omit<Patient, "id" | "userId">;
