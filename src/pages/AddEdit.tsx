import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useAddUserMutation,
  useGetContactsDetailQuery,
  //useUpdateContactMutation,
} from "../services/usersApi"
import "./AddEdit.css"

const initialState = {
  name: "",
  email: "",
  phone: "",
}


const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState)
  const [editMode, setEditMode] = useState(false)
  const [addContact] = useAddUserMutation()

  const { name, email, phone } = formValue
  const navigate = useNavigate()

  const { id } = useParams()
  const { data, error, isFetching } = useGetContactsDetailQuery(id!)

  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong")
    }
  }, [error])

  useEffect(() => {
    if (id) {
      setEditMode(true)
      if (data) {
        setFormValue({ ...data })
      }
    } else {
      setEditMode(false)
      setFormValue({ ...initialState })
    }
  }, [id, data])

  const handleInputChange = (e: any) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!name && !email && !phone) {
      toast.error("Please provide value into each input field")
    } else {
      if (!editMode) {
        await addContact(formValue)
        navigate("/")
        toast.success("Contact Added Successfully")
      }
    }
  }

  if (isFetching) {
    return <h3>Loading...</h3>
  }


  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name ..."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email ..."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter phone number. ..."
          value={phone}
          onChange={handleInputChange}
        />
        <input type="submit" value={editMode ? "Update" : "Add"} />
      </form>
    </div>
  )
}

export default AddEdit
