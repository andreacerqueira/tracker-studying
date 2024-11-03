import { store } from "@/store";
import { ADD_TOAST } from '@/store/type-mutations';
import { TypeToaster } from "@/interfaces/IToaster";

type Toastification = {
	addToast : (type: TypeToaster, message: string) => void;
}

export default() : Toastification => {
	const addToast = (type: TypeToaster, message: string) : void => {
		store.commit(ADD_TOAST, {
			message,
			type
		});
	}

	return {
		addToast
	}
}