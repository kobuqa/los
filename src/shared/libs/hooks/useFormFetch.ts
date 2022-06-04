import { useState } from "react";
import { FormSubmitStatus } from "../types/form-submit-status.enum";

type useFormFetchArgs = {
	formFetchFn: Function,
	formClearFn: Function
}
export const useFormFetch = ({formFetchFn, formClearFn}: useFormFetchArgs) => {
	const [formSubmitStatus, setFormSubmitStatus] = useState<FormSubmitStatus>(FormSubmitStatus.Idle);

	const formSubmitFn = (params: any) => {
		setFormSubmitStatus(FormSubmitStatus.Pending)
		formFetchFn(params)
			.then(() =>  setFormSubmitStatus(FormSubmitStatus.Success))
			.catch(() => setFormSubmitStatus(FormSubmitStatus.Error))
			.finally(() => {
				let timer: NodeJS.Timeout
				timer = setTimeout(() => {
					setFormSubmitStatus(FormSubmitStatus.Idle)
					clearTimeout(timer);
				}, 2000)
				formClearFn()
			})
	}
	return {formFetchStatus: formSubmitStatus, formSubmitFn}
}
