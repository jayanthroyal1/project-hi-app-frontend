| Feature                        | interface| type |
| ------------------------------ | -------- | ---- |
| Object shapes                  | ✅       | ✅    |
| Extendable                     | ✅       | ✅    |
| Declaration merging            | ✅       | ❌    |
| Union types                    | ❌       | ✅    |
| Tuple types                    | ❌       | ✅    |
| Primitive aliases              | ❌       | ✅    |
| Preferred for OOP/models       | ✅       | ⚠️   |
| Preferred for unions/utilities | ❌       | ✅    |


| Concept    | Purpose                         |
| ---------- | ------------------------------- |
| `dispatch` | Send/update data to Redux store |
| `selector` | Read data from Redux store      |

# Redux Flow

Component
   ↓
dispatch(action)
   ↓
Reducer updates state
   ↓
Redux Store updated
   ↓
useSelector reads updated state
   ↓
UI re-renders

# Secure Authentication
Login
   ↓
JWT Token Issued
   ↓
Frontend Stores Token
   ↓
Axios Sends Token
   ↓
Backend Middleware Verifies Token
   ↓
Protected APIs Unlock
