
import fanalyticsLogo from './fanalytics.png'


export const Navbar = () => {
    return (
        <>
            <nav className="bg-white  sticky top-0 border shadow-md object-cover">
                <div className='flex w-4/5 m-auto'>
                    <div className="flex justify-between m-auto px-4">
                        <div className="flex items-center">
                            <img src={fanalyticsLogo} alt="logo" className="h-24 w-24" />
                        </div>
                    </div>

                    <ul className="flex gap-10 m-auto justify-end text-blue-500 text-xl">
                        <li className="hover:underline hover:underline-offset-4">
                            <a href="/">Home</a>
                        </li>
                        <li className="hover:underline hover:underline-offset-4">
                            <a href="/receiving-stats">Receiving</a>
                        </li>
                        <li className="hover:underline hover:underline-offset-4">
                            <a href="/rushing-stats">Rushing</a>
                        </li>
                        <li className="hover:underline hover:underline-offset-4">
                            <a href="/passing-stats">Passing</a>
                        </li>
                        <li className="hover:underline hover:underline-offset-4">
                            <a href="/win-stats">Wins</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}