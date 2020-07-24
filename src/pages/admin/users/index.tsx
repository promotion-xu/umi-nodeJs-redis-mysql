import React from 'react'

function Users() {
  return <div>User management</div>
}

Users.title = 'USERS_TITLE'
Users.layout = 'PRO_LAYOUT'
Users.requireSignin = false
Users.access = 'canReadAdminUserManagement'

export default Users
