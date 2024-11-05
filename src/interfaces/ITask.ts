import IProject from "./IProject";

export default interface ITask {
	id: number,
	durationInSecs: number,
	description: string,
	project: IProject
}