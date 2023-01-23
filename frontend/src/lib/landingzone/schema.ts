import * as yup from "yup"

const landingZooneSchema = yup.object().shape({
    bookmarks: yup.array().of(
        yup.object().shape({
            id: yup.string().required(),
            name: yup.string().required(),
            url: yup.string().required(),
        })
    ),
})