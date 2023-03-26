import React, { useRef, useState } from "react";
import { Formik } from "formik";
import { InputText } from "primereact/inputtext";

import { Toast } from 'primereact/toast';
        
import "../Styles/AddProductCategory.css";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import axios from "axios"
const AddProductCateogoryForm = () =>{
    const toast = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formik = useFormik({
        initialValues: { category_name: "", description: "" },
        validationSchema: Yup.object({
            category_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
            description: Yup.string()
            .min(20, 'Must be 20 characters or more')
            .required('Required'),
        }),
        onSubmit: values => {
            setIsSubmitting(true)
            axios.post("http://localhost:8302/addProductCategory",values).then((res)=>{
                toast.current.show({severity:'success', summary: 'success', detail:`${res.data}`, life: 3000});
                // alert(JSON.stringify(values, null, 2));
                setIsSubmitting(false)
            })
        },
      });
    return (
        <div >
        <Toast ref={toast} />
       <form className="AddProductCategoryForm" onSubmit={formik.handleSubmit}>
       <div className="card flex justify-content-center">
                  <span className="p-float-label">
                    <InputText
                      id="category_name"
                      name="category_name"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category_name}
                    />
                    <label htmlFor="category_name">Category Name</label>
                  </span>
                {formik.touched.category_name && formik.errors.category_name ? (
               <div>{formik.errors.category_name}</div>
             ) : null}
                </div>
         
       
            
         {/* <div className="card flex justify-content-center">
                  <span className="p-float-label">
                    <InputText
                      id="description"
                      name="description"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    />
                    <label htmlFor="description">Category Description</label>
                  </span>
                {formik.touched.description && formik.errors.description ? (
               <div>{formik.errors.description}</div>
             ) : null}
                </div> */}
                <div className="card flex justify-content-center">
            <span
            className='p-float-label' >
                <InputTextarea id="description" className={formik.touched.description && formik.errors.description?'p-invalid ':''}

                      name="description"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description} rows={5} cols={30} />
                <label htmlFor="description">Description</label>
                {formik.touched.description && formik.errors.description ? (
               <div>{formik.errors.description}</div>
             ) : null}
            </span>
            
        </div>
         <Button type="submit" disabled={isSubmitting} label="Submit" />
           </form>
      
          
      
        </div>
      );
}

export default AddProductCateogoryForm;
