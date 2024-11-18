import IProject from './IProject';

export default interface ITask {
  id: string;
  durationInSecs: number;
  description: string;
  project: IProject;
}
