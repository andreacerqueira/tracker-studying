import IProject from "./IProject";

export default interface ITask {
	durationInSecs: number,
	description: string,
	project: IProject
}