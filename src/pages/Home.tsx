import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../services/contactsApi"
import "./Home.css"

const Home = () => {
  const { data, isLoading, error } = useGetUsersQuery()
  const [deleteContact] = useDeleteUserMutation()

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong")
    }
  }, [error])

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  const handleDelete = async (id: any) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      await deleteContact(id)
      toast.success("Contact Deleted Successfully")
    }
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <Link to="/addContact">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>user</th>
            <th style={{ textAlign: "center" }}>username</th>
            <th style={{ textAlign: "center" }}>email</th>
            <th style={{ textAlign: "center" }}>actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: any) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>               
                <Link to={`/editContact/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/info/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                  </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
