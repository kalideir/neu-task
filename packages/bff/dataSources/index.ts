import UsersAPI from "./UsersApi.datasource";

const ds = {
    usersApi: new UsersAPI,
} as const;

export default ds