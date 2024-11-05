export enum TypeToaster {
	SUCCESS,
	ERROR,
	ATTENTION
}

export default interface IToaster {
	id: number;
	message: string;
	type: TypeToaster;
}
