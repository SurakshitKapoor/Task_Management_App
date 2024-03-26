import { NavLink } from "react-router-dom";


function Navbar() {
    return (
        <div>
            {/* Navbar Component */}

            <nav>
                <ul class="inline-flex gap-10 pb-3">
                    <li>
                        <NavLink to='/'>
                            <button class="bg-lime-400 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded"> Home </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/tasksList'>
                            <button class="bg-lime-400 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded"> Tasks </button>
                        </NavLink>
                    </li>
                   
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;