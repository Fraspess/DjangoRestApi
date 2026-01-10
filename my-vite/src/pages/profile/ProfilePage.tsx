import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useState, useEffect} from "react";
import type {IUserProfile} from "../../types/IUserProfile.ts";


const ProfilePage = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState<IUserProfile | null>(null)


    useEffect(() => {
    const token = localStorage.getItem("refreshToken")

    if (!token) {
        navigate("/login")
        return
    }
        axios.post(APP_ENV.SERVER_URL + "api/refresh/", {refresh: token})
            .then(response => {
                if (response.status == 200) {
                    const data = response.data

                    const access = data.access

                    const decodedToken = jwtDecode(access)

                    console.log(decodedToken)

                    const user_id = decodedToken.user_id

                    axios.get(APP_ENV.SERVER_URL + "api/users/" + user_id)
                        .then(response => {
                            if (response.status == 200) {
                                const data = response.data
                                console.log(data)
                                setUser(data)
                            } else {
                                navigate("/login")
                            }

                        })

                } else {
                    navigate("/login")
                }


            })
            .catch(error => console.log(error));

    }, []);


    return (
        <>
            {user ? (
                <div className={"min-h-screen xl:flex"}>
                    <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                        <h1 className="mb-6 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                            Профіль користувача
                        </h1>

                        <div
                            className="overflow-hidden rounded-2xl
            border border-gray-200 bg-white px-6 py-6
            dark:border-gray-800 dark:bg-white/3"
                        >
                            <div className="flex flex-col gap-6">

                                <div className="flex flex-col items-center gap-4">
                                    <img
                                        src={`${user.image_large}`}
                                        alt="Avatar"
                                        className="h-32 w-32 rounded-full object-cover border"
                                    />

                        {/*            <input*/}
                        {/*                type="file"*/}
                        {/*                accept="image/*"*/}
                        {/*                className="block w-full text-sm*/}
                        {/*file:mr-4 file:rounded-md file:border-0*/}
                        {/*file:bg-slate-100 file:px-4 file:py-2*/}
                        {/*file:text-sm file:font-semibold*/}
                        {/*hover:file:bg-slate-200"*/}
                        {/*            />*/}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            value={user.username}
                                            name="username"
                                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Ім’я
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={user.first_name}
                                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Прізвище
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={user.last_name}
                                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">
                                            Телефон
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={user.phone}
                                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
                                        />
                                    </div>

                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className="rounded-md bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                                    >
                                        Зберегти
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                    <h1>Профіль загружається....</h1>
                )}

                </>)
            }

            export default ProfilePage