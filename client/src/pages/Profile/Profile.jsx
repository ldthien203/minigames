import {useState} from 'react'
import useFetchData from '../../hooks/useFetchData'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading/Loading'
import './Profile.css'

const Profile = () => {
  const {user} = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const {data, setData, loading, error} = useFetchData(
    user ? `http://localhost:4000/users/${user.id}` : null,
  )

  const handleChange = e => {
    const {name, value} = e.target
    setData(prevData => ({...prevData, [name]: value}))
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:4000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      const updatedData = await response.json()
      setData(updatedData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile: ', error.message)
    }
  }

  if (loading) return <Loading />
  if (error) return <p>Error: {error}</p>

  return (
    <section className="profile-section">
      <div className="profile-container">
        {data && (
          <>
            <div className="profile-avatar">
              <img
                src={data.avatar || '/assets/img/avatar.png'}
                alt="avatar"
                className="avatar"
              />
              {isEditing && (
                <input type="file" name="avatar" onChange={handleChange} />
              )}
            </div>
            <div className="profile-header">
              <h2>Profile</h2>
              {!isEditing ? (
                <button className="edit-button" onClick={toggleEdit}>
                  Edit
                </button>
              ) : (
                <button className="save-button" onClick={saveProfile}>
                  Save
                </button>
              )}
            </div>
            <div className="profile-info">
              <p>
                <label htmlFor={data.username}>Username: </label>
                {isEditing ? (
                  <input
                    type="text"
                    id={data.username}
                    name="name"
                    value={data.username}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{data.username}</span>
                )}
              </p>
              <p>
                <label htmlFor="fullname">Fullname: </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={data.fullname}
                    onChange={handleChange}
                    placeholder="Enter your fullname"
                  />
                ) : (
                  <span>{data.fullname || 'Enter your fullname'}</span>
                )}
              </p>
              <p>
                <label>Age: </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={parseInt(data.age)}
                    onChange={handleChange}
                    placeholder="Enter your age"
                  />
                ) : (
                  <span>{data.age || 'Enter your age'}</span>
                )}
              </p>
              <p>
                <label>Email :</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <span>{data.email}</span>
                )}
              </p>
              <p>
                <label>Joined: </label>
                <span>{data.created_at}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Profile
