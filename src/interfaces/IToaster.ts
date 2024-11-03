export enum TypeToaster {
	SUCCESS,
	ERROR,
	ATTENTION
}

export default interface IToaster {
	index: number;
	message: string;
	type: TypeToaster;
}
