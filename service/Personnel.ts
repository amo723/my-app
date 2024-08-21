import Personnel from "../models/Personnel";
import { getPersonnelRepository } from "../repositories/Encounter";
import EncounterRepository from "../repositories/Encounter/repository";

class PersonnelService {
  static instance: PersonnelService | null = null;

  encounter_rep: EncounterRepository;

  constructor() {
    this.encounter_rep = getPersonnelRepository("good");
  }

  /**
   *
   * @returns personnel service
   */
  static getInstance(): PersonnelService {
    if (PersonnelService.instance) {
      return PersonnelService.instance;
    } else {
      PersonnelService.instance = new PersonnelService();
      return PersonnelService.instance;
    }
  }

  /**
   * get a list of doctors related to theirs rooms
   * @param patient_id O3 identifier of a patient
   * @returns array of related Doctors
   */
  async getAllPersonnel(): Promise<Array<Personnel> | null> {
    try {
      return await this.encounter_rep.getListOfDoctors();
    } catch (error) {
      return null;
    }
  }

  /**
   * get patient details
   * @param personnel_id patient app identifier of a patient
   * @returns details of a patient
   */
  async getPersonnel(personnel_id: string): Promise<Personnel | null> {
    try {
      return await this.encounter_rep.getPersonnelDetail(personnel_id);
    } catch (error) {
      return null;
    }
  }

  /**
   * cree une nouvelle visite
   * @param personnel_id uuid du patient
   * @returns true or false
   */
  async newVisit(patient_uuid: string): Promise<boolean> {
    try {
      return await this.encounter_rep.createVisit(patient_uuid);
    } catch (error) {
      return false;
    }
  }

  /**
   * creer un nouveau rendez-vous ou consultation
   * @param patient_uuid uuid du patient qui sollicite le rendez-vous
   * @param doctor_uuid uuid du médécin avec lequel on souhaite prendre rendez-vous
   * @param visit_uuid uuid de la visite
   * @returns true or false
   */
  async newEncounter(
    patient_uuid: string,
    doctor_uuid: string,
    visit_uuid: string
  ): Promise<boolean> {
    try {
      return await this.encounter_rep.createEncounter(
        patient_uuid,
        doctor_uuid,
        (visit_uuid = "")
      );
    } catch (error) {
      return false;
    }
  }
}

export default PersonnelService;
