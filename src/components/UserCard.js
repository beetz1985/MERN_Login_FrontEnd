import React from 'react'


const UserCard = (props) => {

    const { email, id, deleteUser } = props

    return (
        <div className="flex flex-col justify-center items-center w-full p-4 shadow border-[1px] text-[0.75rem] m-4">
            <p>{email}</p>
            <p>{id}</p>
            <button onClick={()=>deleteUser(id)} className="text-[0.6rem] mt-4 hover:underline text-blue-400 cursor-pointer">Delete</button>
        </div>
    )
}

export default UserCard