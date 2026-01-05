import './App.css';
function App() {

    return (
        <div className="container mx-auto px4 py-4">
            <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                Реєстрація користувача
            </h1>

            <div className="grid gap-6 justify-items-center ">

                <div className="w-full max-w-md ">
                    <label className="block mb-2 text-sm text-slate-600">
                        Електронна пошта
                    </label>
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400
                        text-slate-700 text-sm border
                        border-slate-200 rounded-md px-3 py-2 transition
                        duration-300 ease focus:outline-none focus:border-slate-400
                        hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Вкажіть пошту"/>
                </div>

                <div className="w-full max-w-md ">
                    <label className="block mb-2 text-sm text-slate-600">
                        Номер телефону
                    </label>
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400
                        text-slate-700 text-sm border
                        border-slate-200 rounded-md px-3 py-2 transition
                        duration-300 ease focus:outline-none focus:border-slate-400
                        hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Вкажіть прізвище"/>
                </div>
                <div className="w-full max-w-md ">
                    <label className="block mb-2 text-sm text-slate-600">
                        Пароль
                    </label>
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400
                        text-slate-700 text-sm border
                        border-slate-200 rounded-md px-3 py-2 transition
                        duration-300 ease focus:outline-none focus:border-slate-400
                        hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Введіть пароль"/>
                </div>
                <div className="w-full max-w-md ">
                    <label className="block mb-2 text-sm text-slate-600">
                        Повторіть пароль
                    </label>
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400
                        text-slate-700 text-sm border
                        border-slate-200 rounded-md px-3 py-2 transition
                        duration-300 ease focus:outline-none focus:border-slate-400
                        hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Повторіть пароль"/>
                </div>
                <div className="w-full max-w-md ">
                    <label className="block mb-2 text-sm text-slate-600">
                        Аватарка
                    </label>
                    <input
                        className="w-full placeholder:text-slate-400
                        text-slate-700 text-sm border
                        border-slate-200 rounded-md px-3 py-2 transition
                        duration-300 ease focus:outline-none focus:border-slate-400
                        hover:border-slate-300 shadow-sm focus:shadow"
                        type="file" accept="image/*"/>
                    <div>
                        <img id="viewCropperImage" />
                    </div>
                </div>
                <div className="w-full max-w-md ">
                    <button type="submit"
                            className="flex w-full justify-center rounded-md
                             bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white
                              hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2
                               focus-visible:outline-indigo-500">
                        Зареєстретуватись
                    </button>
                </div>
            </div>
        </div>
    )
}
export default App
