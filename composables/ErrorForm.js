import {reactive} from "vue";

export const useErrorForm = (formInput) => {
    const errors = reactive(formInput)
    const resetErrors = () => {
        for (const key in errors) {
            errors[key] = false
        }
    }
    const setErrors = (resError) => {
        resetErrors()
        for (const key in resError) {
            errors[key] = true
        }
    }

    return {
        errors,
        setErrors,
        resetErrors
    }
}
