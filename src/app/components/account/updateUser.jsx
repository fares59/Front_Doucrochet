import { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { getPayloadToken } from "../../services/tokenServices";
import * as Yup from 'yup';
import Input from "../lib/form-and-error-components/Input";
import { updateUser } from "../../api/backend/users";

const FormUpdate = ({submit}) => {
    const token = getPayloadToken(localStorage.token)
    console.log("token" , token)

    const defaulValuesUpdate = {
        firstname: token.firstname,
        lastname: token.lastname,
        // birthdate: token.birthdate,
        // telephone: token.telephone,
        // password: '',
        // Confirmpassword: '',
        // email: token.email,
        country: token.adresse.country,
        cityCode: token.adresse.cityCode,
        number: token.adresse.number,
        street: token.adresse.street,
        city: token.adresse.city,
        rememberMe: false,
    };

    const schemaFormUpdate = Yup.object().shape({
        firstname: Yup.string().min(2, "Prénom trop court").max(30, "Prénom trop long").required('Prénom obligatoire'),
        lastname: Yup.string().min(2, "Nom trop court").max(30, "Nom trop long").required('Nom obligatoire'),
        // birthdate: Yup.date().min('01-01-1900', 'Date de naissance invalide').max(new Date, 'Date de naissance invalide').required('Date obligatoire'),
        // telephone: Yup.number().required('Telephone obligatoire'),
        // password: Yup.string().min(8, 'minimum 8 caractères').required('Mot de passe obligatoire'),
        // confirmPassword: Yup.string().min(8, 'minimum 8 caractères').required('Mot de passe obligatoire'),
        // email: Yup.string().email('email invalide').required('e-mail obligatoire'),
        country: Yup.string().required('Pays obligatoire'),
        cityCode: Yup.number().max(999999, "Maximum 6 chiffres").typeError("Le code postal doit être un nombre").required('Code postal obligatoire'),
        number: Yup.string().required('Numéro de rue obligatoire'),
        street: Yup.string().required('Rue obligatoire'),
        city: Yup.string().required('Ville obligatoire'),
    });

    return (
        <Formik
        initialValues={defaulValuesUpdate}
        onSubmit={submit}
        validationSchema={schemaFormUpdate}
            >
            <Form className="mt-8 space-y-6 rounded-md flex justify-center pb-8 ">
            <div>
                <div className="flex justify-center">

                        <div className="">
                            <div className="flex flex-col lg:flex-row">
                                <div className="p-5 w-96">

                                    <div className="text-slate-700 text-center text-lg font-bold pb-2">Informations Personnelles</div>
                                    <div className="text-slate-500 mt-8">Votre Prénom :</div>
                                    <Field
                                        type="text"
                                        name="firstname"
                                        autoComplete="firstname"
                                        component={Input}
                                        className="rounded-none mt-1"
                                        noError
                                    />
                                    <ErrorMessage
                                        name="firstname"
                                        component="small"
                                        className="text-red-500"
                                    />
                                    <div className="text-slate-500 mt-4">Votre nom :</div>
                                    <Field
                                        type="text"
                                        name="lastname"
                                        placeholder="Nom"
                                        autoComplete="lastname"
                                        component={Input}
                                        className="rounded-none mt-1"
                                        noError
                                    />
                                    <ErrorMessage
                                        name="lastname"
                                        component="small"
                                        className="text-red-500"
                                    />
                                </div>
                                <div className="p-5 lg:border-l lg:border-slate-300 w-96">
                                    <div className="text-slate-700 text-center text-lg pb-2 font-bold">Adresse</div>
                                    <div className="text-slate-500 mt-8">Pays :</div>
                                    <Field
                                        type="text"
                                        name="country"
                                        placeholder="Pays"
                                        autoComplete="country"
                                        component={Input}
                                        className="rounded-none mt-1"
                                        noError
                                    />
                                    <ErrorMessage
                                        name="country"
                                        component="small"
                                        className="text-red-500"
                                        message="Utiliser que des chiffres"
                                    />
                                    <div className="text-slate-500 mt-4">Code postal :</div>
                                    <Field
                                        type="text"
                                        name="cityCode"
                                        placeholder="Code Postal"
                                        autoComplete="cityCode"
                                        component={Input}
                                        className="rounded-none mt-1"
                                    />
                                    <ErrorMessage
                                        name="cityCode"
                                        component="small"
                                        className="text-red-500"
                                        message="Utiliser que des chiffres"
                                    />
                                    <div className="text-slate-500 mt-4">N° :</div>
                                    <Field
                                        type="text"
                                        name="number"
                                        placeholder="Numéro de rue"
                                        autoComplete="number"
                                        component={Input}
                                        className="rounded-none mt-1"
                                        noError
                                    />
                                    <ErrorMessage
                                        name="number"
                                        component="small"
                                        className="text-red-500"
                                        message="Utiliser que des chiffres"
                                    />
                                    <div className="text-slate-500 mt-4">Rue :</div>
                                    <Field
                                        type="text"
                                        name="street"
                                        placeholder="Rue"
                                        autoComplete="street"
                                        component={Input}
                                        className="rounded-none mt-1"
                                        noError
                                    />
                                    <ErrorMessage
                                        name="street"
                                        component="small"
                                        className="text-red-500"
                                        message="Utiliser que des chiffres"
                                    />
                                    <div className="text-slate-500 mt-4">Ville :</div>
                                    <Field
                                        type="text"
                                        name="city"
                                        placeholder="Ville"
                                        autoComplete="city"
                                        component={Input}
                                        className="rounded-none mt-1"
                                        noError
                                    />
                                    <ErrorMessage
                                        name="city"
                                        component="small"
                                        className="text-red-500"
                                        message="Utiliser que des chiffres"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="btn bg-light-yellow text-dark-pink w-40 mt-4">
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            </Form>
        </Formik>
    )
}

const updateOneUser = () => {
    const token = getPayloadToken(localStorage.token)
    const handleUpdate =(values)=>{
        const id = token._id
       updateUser(id, {values})
        console.log("modifyUser", values)
    }

    return (
        <FormUpdate submit={handleUpdate}/>
    );
};

export default updateOneUser;