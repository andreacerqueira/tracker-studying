import { store } from "@/store";
import { ADD_TOAST } from '@/store/type-mutations';
import { TypeToaster } from "@/interfaces/IToaster";

export const toasterMixin = {
	methods: {
		addToast(type: TypeToaster, message: string) : void {
			store.commit(ADD_TOAST, {
				message,
				type
			});
		}
	}
}