import useProfile from '../../hooks/useProfile'
import './Profile.css'
import avatarDefault from '../../assets/img/avatar.png'

const Profile = () => {
  const {user, isEditing, toggleEdit, saveProfile, handleChange} = useProfile()

  return (
    <div className="profile-container">
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
          <label>Name: </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </p>
        <p>
          <label>Avatar: </label>
          <img
            src={user.avatar || avatarDefault}
            alt="avatar"
            className="avatar"
          />
          {isEditing && (
            <input type="file" name="avatar" onChange={handleChange} />
          )}
        </p>
        <p>
          <label>Age: </label>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={parseInt(user.age)}
              onChange={handleChange}
            />
          ) : (
            <span>{user.age}</span>
          )}
        </p>
        <p>
          <label>Email :</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </p>
        <p>
          <label>Joined: </label>
          <span>{}</span>
        </p>
      </div>
    </div>
  )
}

export default Profile
